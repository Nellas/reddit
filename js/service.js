var app = angular.module('reddit').service('FirebaseService', function($http, $q) {

    var guid = function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    this.getData = function() {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: 'https://devmtn.firebaseio.com/posts.json'
        }).then(function(result) {
            console.log(result);
            dfd.resolve(result.data)
        });
        return dfd.promise;
    };

    this.addData = function(post) {
        post.timestamp = Date.now();
        post.comments = [];
        post.karma = 0;
        post.id = guid();
        return $http({
            method: 'PUT',
            url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
            data: post
        })
    };

    this.vote = function(id, direction, karma) {
        if(direction === 'up') {
            karma++;
        } else if(direction === 'down'){
            karma--;
        }
        var dfd = $q.defer();

        $http({
            method: 'PATCH',
            url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
            data: {karma: karma}
        }).then(function(result) {
            dfd.resolve(result.data.karma)
        });
        return dfd.promise;
    };

    this.submitComment = function(id, comments) {
        var dfd = $q.defer();
        $http({
            method: 'PATCH',
            url: 'https://devmtn.firebaseio.com/posts/' + id + '.json',
            data: {comments: comments}
        }).then(function(result) {
            dfd.resolve(result.data.comments)
        });
        return dfd.promise;
    };

    this.deletePost = function(id) {
        return $http({
            method: 'DELETE',
            url: 'https://devmtn.firebaseio.com/posts/' + id + '.json'
        });
    }

});