'use strict';


angular.module('routerApp')
    .controller('signupCtrl', function($scope, $cookieStore, $state, $rootScope, $http, signupService) {


        $scope.signup = {};
        $scope.errorSignup = "";
        $scope.watingMsg = "";
        console.log($cookieStore.get('signupAccess'));
        $scope.catList = [{ "id": 1, "name": "Begumpet" }, { "id": 2, "name": "Hitechcity" }, { "id": 3, "name": "other" }];
        

        if ($cookieStore.get('signupAccess') == undefined) {
            $state.go('signup');
        } 
        // else {
        //     $state.go('home');
        // }
        $scope.signup = {};
        $scope.onSubmit = function() {
            $scope.errorSignup = "";
            $scope.watingMsg = "Please wait proccessing.......";
            console.log($scope.signup);

         

            signupService.getSignup($scope.signup).then(function(data) {
                $scope.watingMsg = "";
                if (data.error == undefined) {
                    console.log(data);
                   
                    $cookieStore.put("signupAccess", data.data);
                    $state.go('login');
                    // toaster.success('Welcome To Dashboard');


                } else {
                    $scope.errorSignup = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        }
     });