routerApp.controller('unsscoreCntrl', function ($scope, $state,
  $cookieStore, $http,toaster, unsscoreService,$rootScope,$stateParams) {
  //  alert("enter unsscore");
//    if ($cookieStore.get('loginAccess') == undefined) {
//     $state.go('login');
//  }

console.log($stateParams.id);

   unsscoreService.unsscoreList($stateParams.id ).then(function(data){
      console.log(data.data);
      $scope.unsscoredata=data.data;
   });

});
 

