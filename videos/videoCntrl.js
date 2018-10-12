routerApp.controller('videoCntrl', function($scope, secService, $state, videoService, $cookieStore, $http, $sce) {
  if ($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
  }
  $scope.videoView=function(id){
     $state.go('videoques',{'id':id});
  }
  $scope.loader=true;
  videoService.videodata().then(function(response) {
    $scope.loader=false;
    //$scope.post = response.data;
    $scope.totalObj = response.data;
    
  });
  
});