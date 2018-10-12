routerApp.controller('videoviewCntrl', function($scope, secService, $state, videoService, $cookieStore, $http, $sce) {
        if ($cookieStore.get('loginAccess') == undefined) {
            $state.go('login');
        }   
        $scope.goback=function(){
        $state.go('videoques',{"id":$state.params.catid}); 
        }
        // $state.go('videoques',{'id':id});

        $scope.entryData={} ;
        $scope.loader=true;
        // $scope.loader1=true;
        $scope.getData=function(){
             videoService.videoSubList($state.params.catid,$state.params.subcatid).then(function(res){
                console.log(res.data) ;
                $scope.entryData = res.data ;
                $scope.entryData.video_link =$sce.trustAsResourceUrl(res.data.video_link);
                $scope.loader=false;
                // $scope.loader1=false;
            });
        }
            $scope.getData();  
            $scope.getans=function(queid){
               $state.go('videoviewans',{'catid':$state.params.catid,'subcatid':$state.params.subcatid,'queid':queid});
            } 

            $scope.post={};
            $scope.post.subcatid=$state.params.subcatid;
            $scope.post.userid=$cookieStore.get("loginAccess").id;
            $scope.createque=function(){
            // $scope.post={};
              videoService.createquetions($scope.post).then(function(res) {
                    //   console.log(res);
                    // $scope.post=res.data;
                    console.log($scope.post);
                    $scope.getData();
                    // location.reload();
               });
             }
             $scope.unlike=function(id){
               
               var obj={
                        "que" : id ,
                        "userid" : $cookieStore.get("loginAccess").id,
                        "likes" : 0,
                        "unlikes" :1
                    }
                 //   console.log(obj);
                    videoService.likeUnlike(obj).then(function(res){
                        $scope.getData();
                    });
             }
             
             $scope.like=function(id){
               
                var obj={
                    "que" : id ,
                    "userid" : $cookieStore.get("loginAccess").id,
                    "likes" : 1,
                    "unlikes" :0
                }
                videoService.likeUnlike(obj).then(function(res){
                    $scope.getData();
                });
              }
        
});