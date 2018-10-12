routerApp.controller('practisereviewCntrl', function($scope, secService, $state, practiseService, $window, videoService, $cookieStore, $http, $sce) {
    // console.log($scope.names);
    // alert('enter in');
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    $scope.getUrlVideoSrc = "";
    $scope.currentPage = 1;
 
    $scope.blanksAlp = ["A", "B", "C", "D", "E", "F"];
    // $scope.post = {};
    // $scope.countQua = 0;
    $scope.getIndexQua11 = 0;
    // var timer;
    $scope.reasultPer = [];
    practiseService.reviewTest().then(function(response) {
        $scope.post = response.data;
        // $scope.post = response.data;
        // $scope.totalQua = response.data.questions.length;
        console.log($scope.post);
    });
    $scope.finshFun = function() {
        // alert(5);
        $scope.testCompleted = true;
        $scope.proccessResult();
    }
    $scope.proccessResult = function() {
        $scope.getTestResult();
    }
    var resultData = [];
    $scope.getTestResult = function() {
        //remove after work completed
        $scope.testCompleted = true;
        // console.log(result);
        angular.forEach($scope.post.questions, function(val, key) {
            //  console.log(val);
            if (val.question_type_id == 1) {
                if (quationType1Result(val)) {
                    //resultData.push({ quaId: val.trackid });
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
        });
        console.log(resultData);
        // console.log(_.groupBy(resultData, function (b) { return b.section }));
         var sectionWiseResult = _.groupBy(resultData, function (b) { return b.section });
         angular.forEach($scope.post.sections, function (val, key) {
             //console.log(key);
             if (sectionWiseResult[key] != undefined) {
                 $scope.post.sections[key].result = sectionWiseResult[key].length;
               //  console.log($scope.post.sections[key].result);
                 $scope.post.sections[key].percentage = calculate($scope.post.sections[key].questionids.length, sectionWiseResult[key].length)
             } else {
                 $scope.post.sections[key].result = 0;
                 $scope.post.sections[key].percentage = 0;
             }
         });
        $scope.reasultPer = $scope.post;
        console.log($scope.reasultPer);
        $scope.showResultText = true;
        // //Graph start
        var grapSections = [];
        var myChartData = [];
        angular.forEach($scope.reasultPer.sections, function(val, key) {
            console.log(val.questionids.length);
            grapSections.push('Section ' + (key + 1));
            myChartData.push(Number(val.questionids.length));
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },

        });
        //Graph end
        //Save result
        var sendObj = {
                "useId": $cookieStore.get("loginAccess").id,

                "testId": $scope.post.testid,
                "toalObj": $scope.post,
                // "sectionWiseResult": $scope.reasultPer,
                "resultData": resultData
            }
            //  console.log($cookieStore.get("loginAccess").id);
        videoService.saveData(sendObj).then(function(res) {
            //   console.log(res);
        })

    }

    // function findIndexOfSection(idVal) {
    //     var temp = 0;
    //     _.forEach($scope.post, function (val, key) {
    //         _.forEach(val.questionids, function (val1, key1) {
    //             if (val1 === idVal) {
    //                 temp = key;
    //             }
    //         });
    //     });
    //     return temp;
    // }

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

    function findIndexOfSection(idVal) {
        var temp = 0;
        _.forEach($scope.post.sections, function(val, key) {
            _.forEach(val.questionids, function(val1, key1) {
                if (val1 === idVal) {
                    temp = key;
                }
            });
        });
        return temp;
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
    $scope.myfunction = function() {
 var x = document.getElementById("video");
            // console.log("x");
            if (x.style.display === "none") {
                x.style.display = "block";
                $scope.Visible = false;

            } else {
                x.style.display = "none";
                $scope.Visible = true;
            }
        }
        /*pagination*/
    $scope.prevPage1 = function() {
        if ($scope.currentPage - 1) {
            $scope.currentPage = $scope.currentPage - 1;
        }
    }
 $scope.nextPage1 = function() {
            if ($scope.currentPage != $scope.post.questions.length + 1) {
                $scope.currentPage = $scope.currentPage + 1;
            }
        }
        //Click event for video url
  $scope.getSrcVideoUrl = function(url) {
        console.log(url);
        $scope.isVisible = false;
        $scope.getUrlVideoSrc = $sce.trustAsResourceUrl(url);

    }
  $scope.goback = function() {
       
        $state.go("practisetest");
    }
 $scope.printToCart = function (printSectionId) {
        $window.print();
    }

// for choosing correct and wrong ans    
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

});