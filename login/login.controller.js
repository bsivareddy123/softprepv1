'use strict';
angular.module('routerApp')
    .controller('loginCtrl', function ($scope, $cookieStore, $state, $rootScope, $http, loginService) {
        $scope.login = {};
        $scope.errorLogin = "";
        $scope.watingMsg = "";
        console.log($cookieStore.get('loginAccess'));
        $rootScope.hideView = true;
        // if ($cookieStore.get('loginAccess') == undefined) {
        //     console.log($cookieStore.get('loginAccess'));
        //     $state.go('login');
        // }
        // else {
        //     $state.go('home');
        // }
        $scope.login = {};
        $scope.onSubmit = function () {
            $scope.errorLogin = "";
            $scope.watingMsg = "Please Wait Loading......";
            // $scope.watingMsg = "please wait loading.......";
            // $scope.watingMsg = [{
            //     src: "login/load.gif"
            //   }];
            // //console.log($scope.login);
            loginService.getLogin($scope.login).then(function (data) {
                $scope.watingMsg = "";
                console.log(data);
                if (data.data.error == undefined) {
                        loginService.getLogindetails(data.data.userId).then(function (data1) {
                            $scope.watingMsg = "";
                            if (data1.data.error == undefined) {
                                console.log(data1.data,data1.data.status);
                                if(data1.data.status == 1001 ){
                                    $rootScope.hideView = false;
                                    $cookieStore.put("loginAccess", data1.data);
                                    console.log($cookieStore.get("loginAccess").id);
                                    console.log($cookieStore.get("loginAccess").fullname);
                                    console.log($cookieStore.get("loginAccess").acttype);
                                    // console.log($cookieStore.get("loginAccess").branch);
                                    $state.go('dashboard');
                                    // toaster.success('Welcome To Dashboard');
                                    //console.log($scope.login);
                                }else{
                                    $scope.errorLogin = "Your account is inactive. contact your administrator to activate";
                                }
                            }
                            else {
                                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                            }
                        });
                }
                else {
                        $scope.errorLogin = "Login failed! Please Check Username And Password";
                        console.log('Please Check Username And Password');
                }
            });
        };
    });