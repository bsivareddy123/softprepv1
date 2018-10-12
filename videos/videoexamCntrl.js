routerApp.controller('videoexamsCntrl', function($scope, secService, $state ,toaster, videoService, $cookieStore, $http, $sce) {
//  alert("enter in");
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    $scope.mode=mode;
    $scope.mode=mode;
   $scope.currentque=0;
   $scope.blanksAlp = ["A", "B", "C", "D", "E", "F"];
   $scope.loader=true;
    videoService.videoTest($state.params.testid).then(function(response){
        console.log(response.data);
        $scope.totalObj=response.data;
        $scope.loader=false;
        });
       $scope.trueValuesStore=[] ;
        $scope.submit=function(){
         //$scope.currentque++;  
        console.log($scope.currentque  ,$scope.totalObj.questions[$scope.currentque].question_type_id);
        var i=0 ;
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 1) {
            if (quationType1Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 2) {
            if (quationType2Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 3) {
            if (quationType3Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 4) {
            if (quationType1Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 5) {
            if (quationType5Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 6) {
            if (quationType5Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        if ( $scope.totalObj.questions[$scope.currentque].question_type_id == 7) {
            if (quationType5Result($scope.totalObj.questions[$scope.currentque])) {
                $scope.trueValuesStore.push($scope.currentque) ;
                i++ ;
            }
        }
        var getInc=$scope.currentque ;
         console.log($scope.totalObj.questions.length ,  getInc+1)
        var SendObj={
            "userid" : $cookieStore.get("loginAccess").id,
            "videoid":$state.params.videoid
        }
        console.log($state.params.videoid);

        if($scope.totalObj.questions.length == getInc+1){
            //  alert("Test completed Check answer .----- - test unlock") ;
            // console.log( $scope.trueValuesStore);
            videoService.VideoUnLock(SendObj).then(function(){

            })
            $state.go('videoques',{id:$state.params.id});
        }else{
            if(i !=0){
                $scope.currentque++; 
                // alert("Correct Aswer") ;
                toaster.success("Correct Answer", "You Unlocked Next Question");
               
            }else{
                // alert("wrong Aswer") ;
                toaster.error("wrong Answer", "Please Try again");
            }
            
        }
         
        }

    function calculate(tatalPoints, earnedPoints) {
        var pPos = parseInt(tatalPoints);
        var pEarned = parseInt(earnedPoints);
        var perc = "";
        if (isNaN(pPos) || isNaN(pEarned)) {
            perc = " ";
        } else {
            perc = ((pEarned / pPos) * 100).toFixed(3);
        }
        return perc;
        }
    function findIndexOfSection(idVal) {
        var temp = 0;
        _.forEach($scope.totalObj.sections, function(val, key) {
            _.forEach(val.questionids, function(val1, key1) {
                if (val1 === idVal) {
                    temp = key;
                }
            });
        });
        return temp;
    }
    function quationType5Result(obj) {
        console.log(obj);
        var getIndeVal = _.find(obj.options, function(x) {
            // console.log(obj.options);
            return x.is_answer == x.user_aws;
        })
        if (getIndeVal != undefined) {
            return true;
        } else {
            return false;
        }
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
    //  console.log(getFindAnsLength, obj.id, getFindUserLength, userAnsIsAnsLength);
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
    // console.log(getIndeVal, obj.trackid);
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

});