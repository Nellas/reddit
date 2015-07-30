var app = angular.module('reddit').controller('PostsController', function($scope, FirebaseService){

    $scope.getPosts = function() {
        FirebaseService.getData().then(function(results) {
            $scope.posts = results;
        })

    };

    $scope.getPosts();


    $scope.addPost = function() {
        FirebaseService.addData($scope.newPost).then(function() {
            $scope.getPosts();
        })
    };

    $scope.vote = function(id, direction, karmaValue) {
        FirebaseService.vote(id, direction, karmaValue).then(function() {
            $scope.getPosts();
        })
    };

    $scope.submitComment = function(id, text, commentArr) {
        FirebaseService.submitComment(id, text, commentArr).then(function() {
            $scope.getPosts();
        })
    };

    $scope.deletePost = function(id) {
        FirebaseService.deletePost(id).then(function() {
            $scope.getPosts();
        })
    }



});