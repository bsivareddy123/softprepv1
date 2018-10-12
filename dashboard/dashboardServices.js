'use strict';

angular.module('routerApp').service('dashboardService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {


    // http://localhost/services/softprep/api/PractCategory/dashbord/51
    http://localhost/services/softprep/api/test/aws_uique_list/51
    this.dashboardData = function() {
        var D = $q.defer()
        $http.get(baseUrl+"api/PractCategory/dashbord/" + $cookieStore.get("loginAccess").id).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.dashboardtableData = function(id) {
        var D = $q.defer()
        $http.get(baseUrl+"api/Test/aws_uique_list/"+id).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
}]);