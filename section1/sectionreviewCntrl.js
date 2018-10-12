routerApp.controller('sectionreviewCntrl', function($scope, $http, $interval,$window, $cookieStore,  $state) {
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
$scope.return=function(){
$window.close();

}



});