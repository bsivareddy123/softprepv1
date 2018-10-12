'use strict';

angular.module('routerApp').service('feedbackService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {


    this.feedback = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+'api/Feedback/create_feedback',data).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
}]);