'use strict';


var noteApp = angular.module('noteApp', ['firebase', 'ui.bootstrap']);
noteApp.controller('homeCtrl', ['$scope', '$http', '$modal', '$timeout', '$firebaseArray', function($scope, $http, $modal, $timeout, $firebaseArray) {
    var ref = new Firebase("https://andela-note.firebaseio.com");
    var notesRef = ref.child('notes');
    console.log('gettin here');
    $scope.activeNote = 0;
    notesRef.on('value', function(data) {
        $timeout(function() {
            $scope.notes = data.val();
        });

    });
    // notesRef
    $scope.toggleNote = function(note, index) {
        $scope.activeNote = index;
        $scope.selectedNote = note;

    };

    $scope.updateNotes = function(notesToUpdate) {
        notesToUpdate.dateUpdated = Date.now();
        notesRef.child(notesToUpdate.dateCreated).update(notesToUpdate, function(error) {
            if (error) console.log('There was an error updating the note');
        });
    };

    $scope.modalCreate = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/newNote.html',
            controller: function($scope, $modalInstance) {
                var newNote = {};
                $scope.ok = function() {
                    newNote.name = $scope.name;
                    newNote.description = $scope.desc;
                    newNote.dateCreated = Date.now();
                    newNote.dateUpdated = "Has not been Updated";
                    notesRef.child(newNote.dateCreated).set(newNote, function(error) {
                        if (error) {
                            alert("Data could not be saved." + error);
                        } else {
                            alert("Data saved successfully.");
                        }
                    });

                    $modalInstance.close();
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };

                $scope.createNewNote = function(newNote) {
                    console.log('to be sure');

                };
            },
            size: 'bg'
        });

        modalInstance.result.then(function(selectedItem) {}, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

}]);
