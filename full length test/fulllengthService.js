'use strict';

angular.module('routerApp').service('fullengService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {



    this.sec = function() {
        var D = $q.defer()
        $http.get(baseUrl+"api/Test/test_all_user_by_id/" + $cookieStore.get("loginAccess").id).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });

        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }



}]);