routerApp.controller('reviewCtrl', function($scope, $http, $state, $interval,$window, secService, $timeout, $cookieStore) {
    // $http.get("section1/data.json")
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
    $scope.activeNav = 0;
    $scope.defaultLength = 0;
    $scope.post = {};
    $scope.openQua = true;
    $scope.defPrev = false;
    $scope.defNex = true;
    $scope.defFinish = true;
    $scope.currentQua = 0;
    $scope.blanksAlp = ["A", "B", "C", "D", "E", "F"];
    $scope.totalObj = {};
    $scope.countQua = 0;
    $scope.getIndexQua11 = 0;
    var timer;
    $scope.reasultPer = [];

    secService.reviewTest().then(function(response) {
        //$scope.post = response.data;
        $scope.totalObj = response.data;
        $scope.totalQua = response.data.questions.length;

        var getQuaId = response.data.sections[$scope.activeNav].questionids[0];
        $scope.post = getQuaData(response.data.questions, getQuaId)
        $scope.defaultLength = response.data.sections[$scope.activeNav].questionids.length;
    });

    function testCompleteCheck() {
        console.log($scope.totalQua + "==" + $scope.countQua)
        if ($scope.totalQua == $scope.countQua) {
            $scope.stop();
            console.log("Test completed1 ");
            $scope.testCompleted = true;
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
        console.log($scope.getIndexQua11);
        var getQuaInd = _.find(objArr, function(obj) {
            return obj.trackid == id;
        });
        return getQuaInd;
    }

    $scope.disablePrev = true;
    $scope.tesss = " ";
    //Timer  
    $scope.countDown = 30;
    var countInt = 30;
    $scope.triggerTimer = function() {
            $scope.openQua = false;
            $scope.countDown = 30;
            countInt = 30;
            timer = setInterval(function() {
                $scope.countDown--;
                countInt--;
                // console.log(countInt + ' >' + 0);
                if (countInt <= 0) {
                    countInt = 0;
                    //$state.go('section2');
                    $scope.continueTosec();
                    console.log("trigger Stop")
                    clearInterval(timer);
                }
                $scope.$apply();
            }, 1);



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
                // alert($scope.defaultLength + "!=" + $scope.currentQua);
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId)
                console.log($scope.post);
            } else {
                $scope.currentQua = 0;
                $scope.triggerTimer();
                // alert("----else -----");
            }
        }
    }
    $scope.prevQua = function() {
        $scope.currentQua = $scope.currentQua - 1;
        $scope.countQua = $scope.countQua - 1;
        if (testCompleteCheck()) {
            if ($scope.defaultLength > $scope.currentQua) {
                // alert($scope.defaultLength + "!=" + $scope.currentQua);
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId)
                    // console.log($scope.post);
                if ($scope.post == undefined) {
                    console.log("Test completed");
                }
            } else {
                $scope.currentQua = 0;
                $scope.triggerTimer();
                // alert("----else -----");
            }
        }
    }
    $scope.continueTosec = function() {
        if (testCompleteCheck()) {
            $scope.openQua = true;
        } else {
            console.log("enter in--Completed test");
            console.log($scope.totalObj);

        }

    }
    $scope.finshFun = function() {
        //$scope.currentQua = $scope.countQua + 1;
        if (testCompleteCheck()) {
            $scope.triggerTimer();
            $scope.activeNav = $scope.activeNav + 1;
            $scope.currentQua = 0;
            $scope.countQua = $scope.countQua + 1;
            if ($scope.totalObj.sections[$scope.activeNav] != undefined) {
                var getQuaId = $scope.totalObj.sections[$scope.activeNav].questionids[$scope.currentQua];
                $scope.post = getQuaData($scope.totalObj.questions, getQuaId)
                $scope.defaultLength = $scope.totalObj.sections[$scope.activeNav].questionids.length;
            } else {
                $scope.testCompleted = true;
                $scope.proccessResult();
                console.log("completed Test");
            }
        }
    }
    $scope.proccessResult = function() {
        console.log("---Proccess Start---");
        console.log($scope.totalObj);
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
        $scope.testCompleted = true;
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
                    console.log(findIndexOfSection(val.trackid));
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
        });
        console.log(resultData);
        console.log(_.groupBy(resultData, function(b) { return b.section }));
        var sectionWiseResult = _.groupBy(resultData, function(b) { return b.section });
        angular.forEach($scope.totalObj.sections, function(val, key) {
            //console.log(key);
            if (sectionWiseResult[key] != undefined) {
                $scope.totalObj.sections[key].result = sectionWiseResult[key].length;
                $scope.totalObj.sections[key].percentage = calculate($scope.totalObj.sections[key].questionids.length, sectionWiseResult[key].length)
            } else {
                $scope.totalObj.sections[key].result = 0;
                $scope.totalObj.sections[key].percentage = 0;
            }
        });
        console.log($scope.totalObj);
        $scope.reasultPer = $scope.totalObj;
        $scope.showResultText = true;
        //Graph start
        var grapSections = [];
        var myChartData = [];
        angular.forEach($scope.reasultPer.sections, function(val, key) {
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
            }
        });
        //Graph end
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
                labels:grapSections,
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
                        'rgba(255, 206, 86, 1)',
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
                            beginAtZero:true
                        }
                    }]
                }
            }
        
        });


    }


    $scope.showAns = function(obj) {
        console.log(obj);
        console.log(obj.question_type_id);
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


    $scope.goback = function() {
     

       $state.go('home');
    }

  $scope.printToCart = function(printSectionId) {
       $window.print();
        
      }


});