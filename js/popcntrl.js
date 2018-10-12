
              routerApp.controller('popcntrl', function($scope,  $window) {
                   

                        $scope.OpenPopupWindow = function () {
                            $window.open("sec1.html", "popup", "width=300,height=200,left=10,top=150");
                        }                                
                                    
                                    
                                    
                            /*code for noback */
                                    window.history.forward();
                                            function noBack()
                                            {
                                                window.history.forward();
                                            }


                                    });