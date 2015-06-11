'use strict';


var noteApp = angular.module('noteApp', ["firebase"]);
noteApp.controller('homeCtrl', ['$scope','$http', function($scope,$http) {
  var ref = new Firebase("https://andela-note.firebaseio.com");
  var notesRef =  ref.child('notes');
  console.log('gettin here');
  $scope.activeNote = 1;

  $scope.createNote = function() {
    console.log('about to creat note');
    var newNote = {
      name:"adebayo",
      content: "",
      dateCreated: Date.now(),
      dateUpdate: "Not Updated Yet"
    };
    notesRef.push(newNote);

  };

  $scope.toggleNote = function(index) {
    $scope.activeNote = index;
    console.log('gettin gere');

  };

  
}]);

