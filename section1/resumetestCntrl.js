routerApp.controller('resumetestCtrl', function($scope, $state, $window,$filter, $http, $interval, secService, $timeout, $cookieStore) {
    // if ($cookieStore.get('loginAccess') == undefined) {
    //     $state.go('login');
    //   }
    $scope.mode=mode;
    $scope.quitTest = function() {
        window.close();
    }
    $scope.showSeconds = 0;
    $scope.showMinutes = 1;
    $scope.stopped = true;
    //Show Timer start
    $scope.toggle = false ;
    $scope.countDown=1000000000000;
    function fancyTimeFormat(seconds)
    {   
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var mins = Math.floor(((seconds % 86400) % 3600) / 60);
        var secs = ((seconds % 86400) % 3600) % 60;
        return ('00' + hours).slice(-2)+ ':' +('00' + mins).slice(-2) + ':' + ('00' + secs).slice(-2);
    }
    $interval(function(){
        var getMin=getSeconds($scope.totalObj.sections[$scope.activeNav].time) ;
        getMin--
        $scope.totalObj.sections[$scope.activeNav].time = fancyTimeFormat(getMin ) ;
        console.log(fancyTimeFormat(getMin ) );
        if( $scope.totalObj.sections[$scope.activeNav].time == "00:00:00"){
            $scope.triggerTimer() ;
        }
        $scope.countDown-- ;
        console.log($scope.countDown);
        if($scope.openQua == false){
            if($scope.countDown == 0){
                $scope.openQua = true;
                $scope.countDown=1000000000000;
                $scope.finshFun() ;
            }
        }else{
            $scope.countDown=1000000000000;
        }
    },1000);
    //Exit Section 
    $scope.sectionOverReview = false;
    $scope.overTestFullLength = true;
    //Intialize Mark
    $scope.markArray = {
        "section": $scope.activeNav + 1,
        "marks": []
    };
    $scope.totalObjectReview = [];
    $scope.testType = "save";
    $scope.exitSection = function() {
        //$scope.finshFun
        console.log($scope.totalQua, $scope.countQua + 1, $scope.activeNav, $scope.totalObj.sections.length);
        var addCount = $scope.countQua + 1;
        var remaingQuationInSection = $scope.totalObj.sections.length - addCount;
        var presentQua = $scope.countQua + 1;
        $scope.countQua = presentQua + remaingQuationInSection;
        console.log($scope.countQua);
        console.log($scope.activeNav);
        $scope.finshFunButton();
    }
    $scope.sectionReview = function() {
        $scope.sectionOverReview = true;
        $scope.overTestFullLength = false;
        console.log($scope.markArray);
        console.log($scope.totalObj.sections[$scope.activeNav].questionids);
        angular.forEach($scope.totalObj.sections[$scope.activeNav].questionids, function(val, key) {
            var getIsAnsOpt = $scope.isAnswerCheckReview(val);
            var markGet = 'No';
            //Mark Check
            console.log($scope.markArray, val)
            var checkMark = _.findIndex($scope.markArray.marks, function(x) {
                return x === val;
            });
            console.log(checkMark);
            if (checkMark != -1) {
                markGet = 'Yes'
            }
            //Answer check
            $scope.totalObjectReview.push({ no: key + 1, quationId: val, isUserAnsw: getIsAnsOpt, marked: markGet })
        });
        var getSize = $scope.totalObjectReview.length / 2;
        $scope.totalObjectReview = _.chunk($scope.totalObjectReview, getSize);

        //angular.forEach
    }
    $scope.isAnswerCheckReview = function(trackid) {
        console.log(trackid);
        var getobjVc = _.find($scope.totalObj.questions, function(x) {
            return x.trackid == trackid;
        });
        if (getobjVc != -1) {
            console.log(getobjVc);
            console.log($scope.totalObj.sections[$scope.activeNav]);
            return $scope.findAnswerIschecked(getobjVc.question_type_id, getobjVc);
            //return 1003;
        }
    }
    $scope.findAnswerIschecked = function(type, obj) {
        if (type == 1) {
            console.log(obj.options);
            var findUserAnswer = _.findIndex(obj.options, function(x) {
                return x.user_aws === 1;
            });
            console.log(findUserAnswer, 'type1 result');
            if (findUserAnswer != -1) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        } else if (type == 2) {
            var findUserAnswer = _.findIndex(obj.options, function(x) {
                return x.user_aws === 1;
            });
            console.log(findUserAnswer, 'type2 result');
            if (findUserAnswer != -1) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        } else if (type == 3) {
            var isAnswerQuaCount = 0;
            var countww = 0;
            _.forEach(obj.options, function(val, key) {
                _.forEach(val, function(val1, key1) {
                    //  console.log(val1);
                    if (val1.user_aws === 1) {
                        isAnswerQuaCount = countww++;
                    }
                });
            });

            if (countww != 0) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        } else if (type == 4) {
            var findUserAnswer = _.findIndex(obj.options, function(x) {
                return x.user_aws === 1;
            });
            if (findUserAnswer != -1) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        } else if (type == 5) {
            var isAnswerQuaCount = 0;
            var countww = 0;
            _.forEach(obj.options, function(val, key) {
                console.log(val.user_aws);
                      if (val.user_aws != "") {
                        console.log(val);
                        if(val.user_aws !=undefined) {
                            isAnswerQuaCount = countww++;
                        }
                    }
                // _.forEach(val, function(val1, key1) {
                //     if (val1.user_aws != "") {
                //         console.log(val1);
                //         if(val1.user_aws !=undefined) {
                //             isAnswerQuaCount = countww++;
                //         }
                //     }
                // });
            });
            if (countww != 0) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        } else if (type == 6) {
            var findUserAnswer = _.findIndex(obj.options, function(x) {
                return x.user_aws === 1;
            });
            if (findUserAnswer != -1) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }

        } else if (type == 7) {
            var isAnswerQuaCount = 0;
            var countww = 0;
            _.forEach(obj.options, function(val, key) {
                _.forEach(val, function(val1, key1) {
                    //  console.log(val1);
                    if (val1.user_aws != "") {
                        isAnswerQuaCount = countww++;
                    }
                });
            });

            if (countww != 0) {
                return 'Answered';
            } else {
                return 'UnAnswered';
            }
        }
    }
    $scope.return = function() {
        $scope.sectionOverReview = false;
        $scope.overTestFullLength = true;
    }
    $scope.getMark = function() {
        console.log($scope.markArray);
        console.log($scope.activeNav + "currentSection");
        console.log($scope.currentQua + "currentQuationNO");
        console.log($scope.post.trackid);
        var getInd = _.findIndex($scope.markArray.marks, function(x) {
            return x === $scope.post.trackid
        })
        console.log(getInd);
        if (getInd == -1) {
            if (getInd != undefined) {
                $scope.markArray.marks.push($scope.post.trackid);
            }

        } else {
            $scope.markArray.marks.splice(getInd, 1);
        }
        console.log($scope.markArray.marks, $scope.post);
    }
    $scope.checkIsChecked = function(trackid) {
        // console.log("enter in");
        // $scope.markArray = {
        //     "section": $scope.activeNav + 1,
        //     "marks": []
        // };
        var getChecked = _.findIndex($scope.markArray.marks, function(x) {
            return x === trackid
        })
        if (getChecked != -1) {
            return true;
        } else {
            return false;
        }
        console.log($scope.markArray.marks);
    }
    $scope.pause = function() {
        $scope.pauseData = {
            'totalQuations': $scope.totalQua,
            'presentQuation': $scope.countQua + 1,
            'section': $scope.activeNav,
            'totalSections': $scope.totalObj.sections.length,
            'markedData': $scope.markArray
        }
        $scope.testType = "pause";
        var sendObj = {
            "useId": $cookieStore.get("loginAccess").id,
            "testId": Number($cookieStore.get("testId")),
            "toalObj": $scope.totalObj,
            "sectionWiseResult": [],
            "resultData": [],
            "testType": $scope.testType

        }
        sendObj['toalObj']['extradata'] = $scope.pauseData;
        secService.saveData(sendObj).then(function(res) {
                //   console.log(res);
                $cookieStore.put("checkIsMiddle", "pause");
                window.close();
            })
            //No need test123 for test purpose onle
        $scope.test123 = sendObj;
        //
        console.log(sendObj);
    }
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
   // $scope.activeNav = 0;
    $scope.defaultLength = 0;
    $scope.post = {};
    $scope.openQua = true;
    $scope.defPrev = false;
    $scope.defNex = true;
    $scope.defFinish = true;
    //$scope.currentQua = 0;
    $scope.blanksAlp = ["A", "B", "C", "D", "E", "F"];
    $scope.totalObj = {};
    $scope.countQua = 0;
    $scope.getIndexQua11 = 0;
    var timer;
    $scope.reasultPer = [];
    $scope.loader = true;
    var getSeconds = function(str) {
        var hms = str; // your input string
        var a = hms.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return seconds;
        console.log(seconds);
    }
    secService.resumeTest().then(function(response) {
        //$scope.post = response.data;
        $scope.totalObj = response.data;
        $scope.loader = false;
        $scope.totalQua = response.data.questions.length;
        $scope.activeNav  = response.data['extradata']['section'] ;
        console.log($scope.activeNav ,response.data['extradata']['presentQuation']);
        var getQuaId = response.data.sections[$scope.activeNav].questionids[response.data['extradata']['presentQuation']];
        $scope.post = getQuaData(response.data.questions, getQuaId)
        $scope.defaultLength = response.data.sections[$scope.activeNav].questionids.length;
        $scope.currentQua = response.data['extradata']['presentQuation'] ;
    });
    function testCompleteCheck() {
        //  console.log($scope.totalQua + "==" + $scope.countQua)
        if ($scope.totalQua == $scope.countQua) {
            $scope.stop();
            if ($scope.testType == 'save') {
                $scope.testCompleted = true;
            } else {
                $scope.testCompleted = false;
            }
            return false;
        } else {
            return true;
        }
    }
    //QuaDetails
    function getQuaData(objArr, id) {
        var getQuaIndx11 = _.findIndex(objArr, function(obj) {
            return obj.trackid == id;
        });
        $scope.getIndexQua11 = getQuaIndx11;
        //  console.log($scope.getIndexQua11);
        var getQuaInd = _.find(objArr, function(obj) {
            return obj.trackid == id;
        });
        return getQuaInd;
    }
    $scope.disablePrev = true;
    $scope.tesss = " ";
    $scope.triggerTimer = function() {
        $scope.openQua = false;
            $scope.countDown = 30;
            }
        // copy text
    $scope.triggerMouseLeave = function(trackid) {
            var getIndexTrackIdVal = _.findIndex($scope.post.options, function(x) {
                return x.question_id === trackid
            });
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
                console.log('enter in-----1');
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
                console.log('enter in-----2');
            }
            var getIdKey = 'append_' + trackid;
            document.getElementById(getIdKey).value = text;
            console.log(text + 'Yahooooooo');
            //$scope.tstAppend = text;
            console.log($scope.post.options);
            if (text) {
                $scope.post.options[getIndexTrackIdVal].user_aws = text;
            }
        }
        //Timer
    $scope.stop = function() {
        $interval.cancel(timer);
    };
    $scope.nextQua = function() {
        $scope.currentQua = $scope.currentQua + 1;
        $scope.countQua = $scope.countQua + 1;
        if (testCompleteCheck()) {
            if ($scope.defaultLength >= $scope.currentQua) {
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId);
            } else {
                $scope.currentQua = 0;
            }
        }
    }
    $scope.prevQua = function() {
        $scope.currentQua = $scope.currentQua - 1;
        $scope.countQua = $scope.countQua - 1;
        if (testCompleteCheck()) {
            if ($scope.defaultLength > $scope.currentQua) {
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId)
               if ($scope.post == undefined) {}
            } else {
                $scope.currentQua = 0;
            }
        }
    }
    $scope.finshFunButton=function(){
        if ($scope.activeNav+1 == $scope.totalObj.sections.length) {
            if ($scope.testType == 'save') {
                $scope.testCompleted = true;
            } else {
                $scope.testCompleted = false;
            }
            $scope.proccessResult();
        } else {
            $scope.triggerTimer() ;
        }
    }
    $scope.continueTosec = function() {
        $scope.openQua = true;
        $scope.finshFun() ;
        $scope.countDown=1000000000000;
    }
    $scope.finshFun = function() {
        //$scope.currentQua = $scope.countQua + 1;
        $scope.markArray = {
            "section": $scope.activeNav + 1,
            "marks": []
        };
        $scope.totalObjectReview = [];
        if (testCompleteCheck()) {
          //  $scope.triggerTimer();
            $scope.activeNav = $scope.activeNav + 1;
            $scope.currentQua = 0;
            $scope.countQua = $scope.countQua + 1;
            if ($scope.totalObj.sections[$scope.activeNav] != undefined) {
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId)
                $scope.defaultLength = $scope.totalObj.sections[$scope.activeNav].questionids.length;
            } else {
                if ($scope.testType == 'save') {
                    $scope.testCompleted = true;
                } else {
                    $scope.testCompleted = false;
                }
                $scope.proccessResult();
                }
        }
    }
    $scope.proccessResult = function() {
        $scope.getTestResult();
    }
    $scope.typeRadio = function(parentQuaInd, opt, OptInd) {
        //console.log($scope.totalObj.questions[parentQuaInd].options[opt], OptInd);
        _.map($scope.totalObj.questions[parentQuaInd].options[opt], function(x) {
            return x.user_aws = 0;
        });
        $scope.totalObj.questions[parentQuaInd].options[opt][OptInd].user_aws = 1;
    }
    $scope.typeRadio1 = function(parentQuaInd, OptInd) {
        _.map($scope.totalObj.questions[parentQuaInd].options[OptInd], function(x) {
            return x.user_aws = 0;
        });
        $scope.totalObj.questions[parentQuaInd].options[OptInd].user_aws = 1;
    }
    var resultData = [];
    $scope.getTestResult = function() {
        //remove after work completed
        resultData = [] ;
        if ($scope.testType == 'save') {
            $scope.testCompleted = true;
        } else {
            $scope.testCompleted = false;
        }
        // console.log(result);
        angular.forEach($scope.totalObj.questions, function(val, key) {
            // console.log(val);
            if (val.question_type_id == 1) {
                if (quationType1Result(val)) {
                    //resultData.push({ quaId: val.trackid, section: findIndexOfSection(val.trackid) });
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 2) {
                if (quationType2Result(val)) {
                    //   console.log(findIndexOfSection(val.trackid));
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 3) {
                if (quationType3Result(val)) {
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 4) {
                if (quationType1Result(val)) {
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 5) {
                if (quationType5Result(val)) {
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 6) {
                if (quationType5Result(val)) {
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
            if (val.question_type_id == 7) {
                if (quationType5Result(val)) {
                    resultData.push({ quaId: val.trackid, question_type: val.question_type_id, catgry: val.category, section: findIndexOfSection(val.trackid) });
                }
            }
        });
        console.log(resultData);
        // console.log(_.groupBy(resultData, function (b) { return b.section }));
        var sectionWiseResult = _.groupBy(resultData, function(b) { return b.section });
        angular.forEach($scope.totalObj.sections, function(val, key) {
            //console.log(key);
            if (sectionWiseResult[key] != undefined) {
                $scope.totalObj.sections[key].result = sectionWiseResult[key].length;
                //  console.log($scope.totalObj.sections[key].result);
                $scope.totalObj.sections[key].percentage = calculate($scope.totalObj.sections[key].questionids.length, sectionWiseResult[key].length)
            } else {
                $scope.totalObj.sections[key].result = 0;
                $scope.totalObj.sections[key].percentage = 0;
            }
        });
        // console.log($scope.totalObj);
        $scope.reasultPer = $scope.totalObj;
        $scope.showResultText = true;
        //Graph start
        var grapSections = [];
        var myChartData = [];
        angular.forEach($scope.reasultPer.sections, function(val, key) {
            console.log(val);
            grapSections.push('Section ' + (key + 1));
            myChartData.push(Number(val.percentage));
        });
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: grapSections,
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e",
                        "#34495e",
                        "#34495e"
                    ],
                    data: myChartData
                }]
            },

        });
        var grapSections = [];
        var myChartData = [];
        angular.forEach($scope.reasultPer.sections, function(val, key) {
            console.log(val);
            grapSections.push('Section ' + (key + 1));
            myChartData.push(Number(val.result));
        });
        var ctx = document.getElementById("myChart1").getContext('2d');
        var myChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: grapSections,
                datasets: [{
                    label: 'correctAns',
                    data: myChartData,
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(149,165,166)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(149,165,166)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });
        //Graph end
        // $state.reload();
        //Save result
        console.log('save test ...');
        var sendObj = {
            "useId": $cookieStore.get("loginAccess").id,
            "testId": Number($cookieStore.get("testId")),
            "toalObj": $scope.totalObj,
            "sectionWiseResult": $scope.reasultPer,
            "resultData": sectionWiseResult,
            "testType": $scope.testType
        }
        sendObj['toalObj']['extradata'] = $scope.pauseData;
        secService.saveData(sendObj).then(function(res) {
            //   console.log(res);
            $cookieStore.put("checkIsMiddle", $scope.testType); 
        });
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
    $scope.review = function(obj) {
        $state.go('review');
    }
    $scope.printToCart = function(printSectionId) {
        $window.print();
    }
    if ($scope.activeNav == 0) {
        console.log($scope.activeNav);
        if ($scope.minutes === 1) {
            console.log($scope.minutes);
            $scope.finshFun();
        }
    }
    $scope.goback = function() {
        $cookieStore.put("checkIsMiddle", "save");
        alert("goback");
        window.close();
    }
});
routerApp.directive('ngConfirmClick', [
    function() {
        return {
            priority: 1,
            terminal: true,
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
])