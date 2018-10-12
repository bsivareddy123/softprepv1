'use strict';

angular.module('routerApp').service('unsscoreService', ['$q', '$http','$cookieStore', function($q, $http,$cookieStore) {

    this.unsscoreList = function(id) {
        var D = $q.defer()
       
        $http.get(baseUrl+"api/Unsscore/unsscoredetails_by_id/" + id).then(function(data) {
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