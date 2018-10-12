
routerApp.controller('videoqueCntrl', function($scope, secService, $state, videoService, $cookieStore, $http, $sce) {
//  alert(5);
 //$scope.post = response.data;
 if ($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
    }
 $scope.totalObj=[];
    $scope.videoquedata=[];
    $scope.loader=true;
    videoService.videoSubCatList($state.params.id).then(function(response){
        $scope.videoquedata=response.data;
        $scope.loader=false;
    });
// console.log($state.params.id);
    videoService.videodata().then(function(response) {
        //$scope.post = response.data;
        $scope.totalObj = response.data;
        $scope.loader=false;
    });
    $scope.goback=function(){
        // alert(5);
        $state.go("videos");
    }
    $scope.entervideo=function(subcatid){
        console.log($state.params.id,subcatid);
        $state.go('videoview',{'catid':$state.params.id,'subcatid':subcatid}); 
    }
    $scope.entertest=function(test,id){
    //   alert(test,id);
         $state.go("videoexam",{id:$state.params.id , testid:test , videoid:id});
    }
    $scope.testText=function(partIndex){
        console.log(partIndex+"=="+$scope.videoquedata.length)
        
             var chk=partIndex ;
             if($scope.videoquedata[chk+1]!=undefined){
                if($scope.videoquedata[chk+1]['is_open']){
                    return $scope.videoquedata[partIndex]['testname'] ;
                }else{
                    return "Start Test" ;
                }
             }else{
                 console.log("---sdsk----");
                
                         var chk=partIndex ;
                         console.log($scope.videoquedata[chk] ) ;
                         if($scope.videoquedata[chk]['is_open']){
                             return $scope.videoquedata[partIndex]['testname'] ;
                         }else{
                             return "Start Test" ;
                         }
                
            }
            console.log($scope.videoquedata) ;
         
      //  else{
        //     console('enter in');
        //     var chk=partIndex ;
        //      if($scope.videoquedata[chk]['is_open']){
        //          return $scope.videoquedata[partIndex]['testname'] ;
        //      }else{
        //          return "Start Test" ;
        //      }
        // }

    }
   
});

