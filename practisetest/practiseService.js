'use strict';

angular.module('routerApp').service('practiseService', ['$q', '$http','$cookieStore', function($q, $http,$cookieStore) {

    this.getpractise = function(data) {
        var D = $q.defer()
        console.log($cookieStore.get("loginAccess").acttype);
        var url ;
        if($cookieStore.get("loginAccess").acttype == 'paid'){
            url = baseUrl+"api/PractCategory/all_practcategory" ;
        }else{
            url = baseUrl+"api/PractCategory/all_practcategory1" ;
        }

        $http.get(url).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });

        return D.promise;
    }
    this.sec = function(testid) {
        var D = $q.defer()
       
        $http.get(baseUrl+"api/Test/test_by_id/" + testid).then(function(data) {
            console.log(data);
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
    this.getQueData = function(testid) {
        var D = $q.defer()
        $http.get(baseUrl+"api/PractCategory/que_id_practcategory/" + testid+'/'+ $cookieStore.get("loginAccess").id).then(function(data) {
            console.log(data);
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
    this.reviewTest = function(testId) {

        var D = $q.defer()
        $http.get(baseUrl+"uploads/" + $cookieStore.get("loginAccess").id + $cookieStore.get("reviewId") + '.json').then(function(data) {
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

    this.saveData = function(data) {

        var D = $q.defer()
        $http.post(baseUrl+"api/Test/save_test", data).then(function(data) {
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
    
    this.postUserQueData = function(data) {

        var D = $q.defer()
        $http.post(baseUrl+"api/PractCategory/create_practUserQuaData", data).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    
}]);