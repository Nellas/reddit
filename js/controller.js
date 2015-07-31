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

    $scope.submitComment = function(id, text, commentsArray) {
        if(!Array.isArray(commentsArray)){
            commentsArray = [];
        }
        commentsArray.push(text);
        FirebaseService.submitComment(id, commentsArray).then(function() {
                $scope.getPosts();
        })
    };

    $scope.deletePost = function(id) {
        FirebaseService.deletePost(id).then(function() {
            $scope.getPosts();
        })
    }

});