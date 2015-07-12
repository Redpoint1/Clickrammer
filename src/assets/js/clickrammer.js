/*
 * Clickrammer v0.0.1 (https://github.com/Redpoint1/Clickrammer)
 * Copyright 2015 Richard Rožár
 * Licensed under the MIT license
 */

"use strict";

(function() {
  var clickrammer = angular.module("game", []);

  clickrammer.controller("MainCtrl", ['$scope', function($scope) {
    $scope.page = 'templates/projects.html'; //default

    $scope.setPage = function(page) {
      $scope.page = 'templates/'+page+'.html';
    }

  }]);

})();
