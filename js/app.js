'use strict';


var noteApp = angular.module('noteApp', ['ui.router']);

noteApp.config('$stateProvider', function ($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'view/home.html',
    controller: 'homeCtrl'
  })
  .state('view', {
    url : 'note',
    templateUrl: 'view/view.html',
    controller: 'viewCtrl',
  });
});