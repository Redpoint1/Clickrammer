/*
 * Clickrammer v0.0.1 (https://github.com/Redpoint1/Clickrammer)
 * Copyright 2015 Richard Rožár
 * Licensed under the MIT license
 */

"use strict";

(function() {

  function makeArray(data){
    var array = [];

    for(var i=0; i<data.length; i++){
      array.push(data[i]);
    }
    return array;
  }

  //AngularJS part

  var clickrammer = angular.module("game", ['ngStorage']);

  clickrammer.factory("Language", function(){
    function Language(data){
      this._set_data(data);
    }

    Language.prototype = {
      id          : null ,
      name        : null ,
      logo        : null ,
      description : null ,
      requirements: []   ,
      timeToLearn : 0    ,
      learned     : false,

      _set_data: function(data){
        for(var property in data){
          if(typeof this[property] != "undefined"){
            this[property] = data[property];
          }
        }
      },
      canBeLearned: function(user){
        for (var i=0; i<this.requirements.length; i++){
          if (!user.data.languages[this.requirements[i]].learned){
            return false;
          }
        }
        return true;
      }
    }

    return Language;
  });

  clickrammer.factory("User", ['$localStorage', 'Language', function($localStorage, Language){
    function User(infos){
      this.load(infos);
    }

    User.prototype = {
      data: $localStorage,

      load: function(infos){
        //this.data.$reset();
        this.data.$default({
          lines : 0,
          languages: {}
        });

        this._load_languages_info(infos.languages);
      },
      click: function(){
        this.data.lines++;
      },
      _load_languages_info: function(languages){
        for (var i=0; i<languages.length; i++){
          var lang = languages[i];
          this.data.languages[lang.id] = new Language(lang);
          if(typeof this.data.languages[lang.id] != "undefined"){
            this.data.languages[lang.id]._set_data(lang);
          }
        }
      }
    }

    return User;

  }]);

  clickrammer.factory("Game", ['$sessionStorage', function($sessionStorage){
    function Game(){
      this.start();
    }

    Game.prototype = {
      data : $sessionStorage,

      start: function(){
        this.data.$default({
          languages: makeArray(_languages),
        });
      }
    }

    return Game;
  }]);

  clickrammer.controller("MainCtrl", ['$scope', 'Game', 'User', function($scope, Game, User) {

    $scope.game = new Game();
    $scope.user = new User($scope.game.data);

    $scope.page = 'templates/languages.html'; //default
    $scope.setPage = function(page) {
      $scope.page = 'templates/'+page+'.html';
    }

  }]);

})();
