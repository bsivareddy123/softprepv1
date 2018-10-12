'use strict';

angular.module('routerApp').service('signupService', ['$q', '$http', function($q, $http) {



    this.getSignup = function(data) {
        var D = $q.defer()
        $http.post("http://localhost/services/softprep/api/User/new_user", data).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        // http://18.218.122.78:8080/softprep/api/User/new_user
        
        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }
    // this.getSignup = function(data) {
    //     var D = $q.defer()
    //     $http.post("http://localhost/services/softprep/api/User1/new_user", data).then(function(data) {
    //         D.resolve(data);
    //     }, function(data) {
    //         D.resolve(data);
    //     });


    //     // )
    //     //     .error(function(data) {
    //     //         D.resolve(data);
    //     //     });
    //     return D.promise;
    // }


}]);