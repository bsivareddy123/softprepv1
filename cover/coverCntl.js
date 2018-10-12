'use strict';


angular.module('routerApp')
    .controller('coverCtrl', function($scope, $cookieStore, $state,fullengService, $window, $http) {

        // if ($cookieStore.get('loginAccess') == undefined) {
        //     $state.go('login');
        // }
        // fullengService.sec().then(function(response) {
        //     //$scope.post = response.data;
        //     $scope.post = response.data;
        //     console.log($scope.post);
    
        // });


        $scope.gosection = function() {
          
            // $state.go('section1');   
         
             var url = $state.href('section1', {parameter: "parameter"});
  
             
            //  window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
             window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
            //  newwindow.document.body.style.background = "#ECF0F5";
           
         }
   
    });