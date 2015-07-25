/*
 * Clickrammer v0.0.1 (https://github.com/Redpoint1/Clickrammer)
 * Copyright 2015 Richard Rožár
 * Licensed under the MIT license
 */

"use strict";

(function() {

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
    }
  }

  //AngularJS part

  var clickrammer = angular.module("game", ['ngStorage']);

  clickrammer.factory("User", ['$localStorage', function($localStorage){
    function User(){
      this.load();
    }

    User.prototype = {
      data: $localStorage,

      load: function(){
        this.data.$default({
          lines : 0,
          languages: []
        });
      },
      
      click: function(){
        this.data.lines++;
      }
    }

    return User;

  }]);

  clickrammer.controller("MainCtrl", ['$scope', 'User', function($scope, User) {

    $scope.user = new User();

    $scope.page = 'templates/projects.html'; //default
    $scope.setPage = function(page) {
      $scope.page = 'templates/'+page+'.html';
    }

  }]);

  clickrammer.controller("LanguageCtrl", ['$scope', function($scope) {
    $scope.languages = [
      new Language(languages[0]),
      new Language(languages[1])
    ]

  }]);

})();
