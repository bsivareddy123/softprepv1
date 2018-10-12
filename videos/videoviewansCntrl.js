routerApp.controller('videoviewansCntrl', function($scope, secService, $state, videoService, $cookieStore, $http, $sce) {
// alert("enter in");
// $scope.videoansdata=[];
    if ($cookieStore.get('loginAccess') == undefined) {
       $state.go('login');
    }
    $scope.loader=true;
    $scope.getQua=function(){
        videoService.videoAnsList($state.params.queid).then(function(response){
            console.log(response.data);
          $scope.videoansdata=response.data;
          $scope.loader=false;
        });

    }
    $scope.getQua();
   

    $scope.goback=function(){
      $state.go('videoview',{'catid':$state.params.catid,'subcatid':$state.params.subcatid})
    }
    $scope.post={};
    $scope.post.queid=$state.params.queid;
    $scope.post.userid=$cookieStore.get("loginAccess").id;

    $scope.createans=function(){
        videoService.createanswer($scope.post).then(function(response) {
            //   console.log(res);
             console.log($scope.post);
            $scope.getQua();
            // location.reload();
           // $scope.videoansdata.push({});
        });
       
    }
    $scope.unlike=function(id){
        // alert("unlikes");
               
        var obj={
                 "ans" : id ,
                 "userid" : $cookieStore.get("loginAccess").id,
                 "likes" : 0,
                 "unlikes" :1
             }
          //   console.log(obj);
             videoService.likeUnlikeAns(obj).then(function(res){
                $scope.getQua();
             });
      }
      
      $scope.like=function(id){
        // alert("likes");
         var obj={
             "ans" : id ,
             "userid" : $cookieStore.get("loginAccess").id,
             "likes" : 1,
             "unlikes" :0
         }
         videoService.likeUnlikeAns(obj).then(function(res){
            $scope.getQua();
         });
       }
       $scope.unlike1=function(id){
            var obj={
                 "que" : id ,
                 "userid" : $cookieStore.get("loginAccess").id,
                 "likes" : 0,
                 "unlikes" :1
             }
          //   console.log(obj);
             videoService.likeUnlike(obj).then(function(res){
                $scope.getQua();
             });
      }
      
      $scope.like1=function(id){
           var obj={
             "que" : id ,
             "userid" : $cookieStore.get("loginAccess").id,
             "likes" : 1,
             "unlikes" :0
         }
         videoService.likeUnlike(obj).then(function(res){
            $scope.getQua();
         });
       }
      
    //    $scope.getRandomInt=function(min, max) {
    //     min =1 ;
    //     max = 20 ;
    //     var img = Math.floor(Math.random() * (max - min + 1)) + min ;
    //     return img+'.png' ;
    //  }
    
});