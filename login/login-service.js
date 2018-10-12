'use strict';

angular.module('routerApp').service('loginService', ['$q', '$http', function($q, $http) {



    this.getLogin = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/User/user_login", data).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        // http://18.218.122.78:8080/soft133/api/User/user_login
        // baseUrl+"api/Test/resume_test"
        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }
    


    this.getLogindetails = function(id) {
        
        var D = $q.defer()
        $http.get(baseUrl+"api/User/loginget/"+id).then(function(data) {
            console.log(data);
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });

        return D.promise;
    }

}]);