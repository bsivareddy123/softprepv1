routerApp.controller('practiseStartCntrl', function ($scope, $state,
    $cookieStore, $http, practiseService,$rootScope,$interval,$timeout) {
    $scope.totalObj=  $rootScope.totalObj ;
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    console.log($scope.totalObj);
 
    if($scope.totalObj == undefined){
        $state.go("practisetest") ;
     }
     $scope.mode=mode;
    $scope.totalObj.totalTime = 0 ;
    
    console.log( $scope.totalObj);
    $interval(function(){
      $scope.totalObj.totalTime++ ;
      $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].time++ ; 
    },1000);
    $scope.blanksAlp = ["A", "B", "C", "D", "E", "F"];
    $scope.currentSection=0;
    $scope.currentQue=0 ;
    $scope.secLength =$scope.totalObj.sections[$scope.currentSection].questionIds.length ;
    console.log( $scope.secLength);
    $scope.totalSecQuationLength = _.reduce($scope.totalObj.sections, (len, arr) => { 
        len += arr.questionIds.length;
        return len;
      }, 0);
      $scope.typeRadio = function(parentQuaInd, opt, OptInd) {
         
        
    }
     
    $scope.runingQua=0 ;
    //console.log( $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId    );
    //Onload  Quation
   console.log($scope.totalObj.sections[$scope.currentSection].type);
   $scope.showAns = function(obj) {
    // console.log(obj);
    // console.log(obj.question_type_id);
    if (obj.question_type_id != undefined) {
        if (obj.question_type_id == 1) {
            var result = quationType1Result(obj);
        }
        if (obj.question_type_id == 2) {
            var result = quationType2Result(obj);
        }
        if (obj.question_type_id == 3) {
            var result = quationType3Result(obj);
        }
        if (obj.question_type_id == 4) {
            var result = quationType1Result(obj);
        }
        if (obj.question_type_id == 5) {
            var result = quationType5Result(obj);
        }
        return result;
    }
}               
    $scope.loader=true;
    $scope.getQueData=function(id){
        
        console.log(id);
        console.log($scope.totalObj.sections[$scope.currentSection]);
        console.log($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue]) ;
        if($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].isEdit == false){
            practiseService.getQueData(id).then(function(response) {
                 $scope.loader=false;
               if(response.data.data.is_attend){
                $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData=response.data.data.qua ;
                // $scope.loader=false;
                $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].result=response.data.data.qua.result ;
                console.log($scope.totalObj.sections);
                $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData['is_attend'] = response.data.data.is_attend ;
               }else{
                $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData= response.data.data[0] ;
                console.log($scope.totalObj.sections);
               }
               $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].isEdit = true ;
            });
        }else{
            $scope.loader=false;
              $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].isEdit = true ;
              $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].result = $scope.showAns($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData) ;
        }
      
    }
    console.log($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId);
    
    $scope.getQueData($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId);
    //$scope.getQueData(524686);
     

    $scope.submitQuestion=function(){
      console.log(
                $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData.trackid
        ) ;
        var getResult876= $scope.showAns($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData) ;
      $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData.is_attend = true ;
      $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].isEdit = true ;
      $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].result = getResult876 ;

      console.log($scope.showAns($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData));
      var obj={
        "userid" :$scope.totalObj.userid,
        "result" : getResult876 ,
        "trackid" : $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData
        .trackid ,
        "totalobj"  :  $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData ,
        "cattype" : $scope.totalObj.type,
        "sessionid" : $scope.totalObj.sessionid+'@1'+$scope.totalObj.testName,
        "create_date" : "",
        "timetaken" :$scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].time == 0 ? 1 : $scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].time   ,
        "subtype" : $scope.totalObj.sections[$scope.currentSection].type
      }	
      console.log(obj);
      obj.totalobj.result= obj.result ;
      practiseService.postUserQueData(obj).then(function(response) {
        console.log(response.data );
     });
    }

 function quationType5Result(obj) {
      console.log(obj.options);
      var getIndeVal = _.find(obj.options, function(x) {
          // console.log(obj.options);
          return x.is_answer == obj.user_aws;
      })
      console.log(getIndeVal);
      if (getIndeVal != undefined) {
          return true;
      } else {
          return false;
      }
      /////console.log(getIndeVal, obj.trackid);
  }
  function quationType2Result(obj) {
      var getFindAnsLength = 0;
      var getFindUserLength = 0;
      var userAnsIsAnsLength = 0;
      _.forEach(obj.options, function(val, key) {
          if (val.is_answer == "1") {
              getFindAnsLength++;
          }
          if (val.user_aws == 1) {
              getFindUserLength++;
          }
          if (val.user_aws == "1" && val.is_answer == '1') {
              userAnsIsAnsLength++;
          }
      });
      console.log(getFindAnsLength, obj.id, getFindUserLength, userAnsIsAnsLength);
      if (getFindUserLength == getFindAnsLength) {
          if (userAnsIsAnsLength == getFindAnsLength) {
              return true;
          } else {
              return false;
          }
      } else {
          return false;
      }
  }

  function quationType1Result(obj) {
      var getIndeVal = _.find(obj.options, function(x) {
          return x.is_answer == "1" && x.user_aws == "1";
      })
      if (getIndeVal != undefined) {
          return true;
      } else {
          return false;
      }
      console.log(getIndeVal, obj.trackid);
  }

  function quationType3Result(obj) {
      var requiredAns = obj.noofblanks;
      var count = 0;
      _.forEach(obj.options, function(val, key) {
          _.forEach(val, function(val1, key1) {
              //  console.log(val1);
              if (val1.is_answer == "1" && val1.user_aws == "1") {
                  count++;
              }
          });
      });
      if (String(count) === requiredAns) {
          return true;
      } else {
          return false;
      }
  }
  

    // Next fun
    $scope.nextPage1=function(){
        $scope.loader=true;
        if($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData['is_attend'] == false){
            $scope.submitQuestion();
        }
        if (testCompleteCheck()) {
            $scope.secLength =$scope.totalObj.sections[$scope.currentSection].questionIds.length ;
            $scope.currentQue++ ;
            $scope.runingQua++ ;
        if($scope.secLength == $scope.currentQue){
            console.log('change Section');
            console.log($scope.totalObj.sections[$scope.currentSection+1]);
            if($scope.totalObj.sections[$scope.currentSection+1] !=undefined){

              //   console.log($scope.totalObj.sections[$scope.currentSection+1].questionIds.length) ;

                
                console.log($scope.currentSection,$scope.totalObj.sections.length);
                for(var i=$scope.currentSection ; i<$scope.totalObj.sections.length ; i++ ){
                   //  console.log($scope.totalObj.sections[$scope.currentSection+i].questionIds.length);
                     if($scope.totalObj.sections[$scope.currentSection+1].questionIds.length == 0){
                            console.log(i,$scope.totalObj.sections[$scope.currentSection+1].questionIds.length);
                            $scope.currentSection++ ;
                        }else{
                            $scope.currentSection++ ;
                            break ;
                        }
                }
                 console.log( $scope.currentSection,$scope.totalObj.sections[$scope.currentSection].questionIds);
                
                 $scope.currentQue =0 ;
                 
                 $scope.secLength =$scope.totalObj.sections[$scope.currentSection].questionIds.length ;
                console.log($scope.totalObj.sections[$scope.currentSection],$scope.currentSection);

                 $scope.getQueData($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId) ;
                 console.log($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId);
            }else{
                console.log($scope.currentSection,$scope.currentQue);
                 $scope.getQueData($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId) ;
            }
        }else{
            console.log('change Quation');
            console.log($scope.secLength,$scope.currentQue,$scope.currentSection);
            // if( $scope.currentQue < $scope.secLength){
            //     $scope.currentSection =  $scope.currentSection+1 ; 
            //     console.log( $scope.currentSection);
            // }
            console.log($scope.currentSection ,$scope.currentQue);
            console.log($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId);
            $scope.getQueData($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].questionId) ;

           
            }
        }
    }
    $scope.prevPage1=function(){
        $scope.loader=true;
        if (testCompleteCheck()) {
            $scope.currentQue-- ;
            $scope.runingQua-- ;
            console.log($scope.currentQue  ) ; 
            if($scope.currentQue == -1){
                console.log("enter in") ;
                $scope.currentSection = $scope.currentSection-1  ;
                $scope.currentQue = $scope.totalObj.sections[$scope.currentSection].questionIds.length -1 ;
                console.log($scope.currentSection, $scope.currentQue);
            } 
            $timeout(function(){
                $scope.loader=false;
            },200);
           
        }
    }

    
    function testCompleteCheck() {
        //  console.log($scope.totalQua + "==" + $scope.countQua)
        if ($scope.totalSecQuationLength == $scope.runingQua) {
          
            return false;
        } else {
            return true;
        }
    }

    $scope.finished=function(){

        if($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData['is_attend']!=undefined){
            if($scope.totalObj.sections[$scope.currentSection].questionIds[$scope.currentQue].quaData['is_attend'] == false){
                $scope.submitQuestion();
            }
        }
        
         console.log($scope.totalObj)
         $rootScope.totalObj = $scope.totalObj  ;
         $rootScope.totalObj.totalSecQua= $scope.totalSecQuationLength ;
         
         console.log( $scope.totalObj) ;  
       $state.go('result');
    }
      
    
  });
  
  
  