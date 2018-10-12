routerApp.controller('practCntrl', function ($scope, $state,
  $cookieStore, $http,toaster, practiseService,$rootScope) {
    $scope.acttype= $cookieStore.get("loginAccess").acttype;
    console.log($scope.acttype);
    $scope.userId=$cookieStore.get("loginAccess").id;
    if ($cookieStore.get('loginAccess') == undefined) {
       $state.go('login');
    }
  $rootScope.totalObj=[] ;
  //console.log($scope.names);
  $scope.totalObj = {};
  $scope.totalObj.groupType = "Maths";
  $scope.totalObj.totalJsonObj = [];
  $scope.totalObj.totalNumber = 0;
  //Math Attributes start
  //Question Types
  $scope.quantitative_comparision = false;
  $scope.data_interpretation = false;
  $scope.problem_solving_single = false;
  $scope.problem_solving_multiple = false;
  $scope.problem_solving_numeric = false;
  //Lessons Attributes
  $scope.numberSystem = false;
  $scope.integerProperties = false;
  $scope.Percentages = false;
  $scope.ratiosAndFractions = false;
  $scope.algebra = false;
  $scope.wordProblems = false;
  $scope.anglesAndTriangles = false;
  $scope.quadrilateralsAndCircles = false;
  $scope.dGeometry = false;
  $scope.coordinateGeometry = false;
  $scope.statistics = false;
  $scope.dataInterpretation = false;
  $scope.permutationsAndCombinations = false;
  $scope.probability = false;
  //Maths Attributes end
  //Verbal Attributes start
  $scope.textCompletion = false;
  $scope.textCompletionSingleBlank = false;
  $scope.textCompletionDoubleBlank = false;
  $scope.textCompletionTripleBlank = false;
  $scope.sentenceEquivalence = false;
  $scope.criticalReasoning = false;
  $scope.readingComprehension = false;
  $scope.readingComprehensionShort = false;
  $scope.readingComprehensionLong = false;
  //Verbal Attrributes end
  $scope.loader=true;
  practiseService.getpractise().then(function (response) {
    $scope.loader=false;
    $scope.totalObj.totalJsonObj = response.data;
     console.log( $scope.totalObj.totalJsonObj.data );
    $scope.totalObj.totalJsonObj = _.mapValues(_.groupBy($scope.totalObj.totalJsonObj.data, 'categoryid'));
    $scope.totalObj.totalJsonObj['Maths'].map((element) => {
      return element.isTest = true;
    });
    $scope.totalObj.totalJsonObj['Maths'].totalQua = $scope.totalCountOnLoadFunction($scope.totalObj.totalJsonObj, 'Maths');
    $scope.totalObj.totalJsonObj['Maths'].map((element) => {
      return element['subcategories'].map((element1) => {
        return element1.isTest = true;
      });
    });
    $scope.totalObj.totalJsonObj['Verbal'].map((element) => {
      return element.isTest = true;
    });
    $scope.totalObj.totalJsonObj['Verbal'].totalQua = $scope.totalCountOnLoadFunction($scope.totalObj.totalJsonObj, 'Verbal');
    //  console.log($scope.totalObj.totalJsonObj);
    $scope.totalObj.totalJsonObj['Verbal'].map((element) => {
      return element['subcategories'].map((element1) => {
        return element1.isTest = true;
      });
    });
  });
  $scope.totalCountOnLoadFunction = function (data, type) {
    return _.sumBy(['totalQuationsInSec'], function (prop) {
      return _.sumBy(data[type], prop);
    });
  }
  $scope.checkGiveLesTrue = function (modelVal, lesson) {
    //  console.log(modelVal,lesson);
    _.map($scope.totalObj.totalJsonObj[$scope.totalObj.groupType], function (sub) {
      return _.map(sub.subcategories, function (a) {
        //Return a.lessonid === lesson  ? { isTest: modelVal} : a; 
        return a.lessonid == lesson.trim() ? a.isTest = modelVal : a;
      });
    });
     console.log($scope.totalObj.totalJsonObj[$scope.totalObj.groupType]);
  }
  $scope.setLessonVariables = function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        $scope.checkGiveLesTrue(a1,  'Number Systems');
        $scope.checkGiveLesTrue(a2,  'Integer Properties');
        $scope.checkGiveLesTrue(a3,  'Percentages');
        $scope.checkGiveLesTrue(a4,  'Ratios and fractions');
        $scope.checkGiveLesTrue(a5,  'Algebra');
        $scope.checkGiveLesTrue(a6,  'Word problems');
        $scope.checkGiveLesTrue(a7,  'Angles and triangles');
        $scope.checkGiveLesTrue(a8,  'Quadrilaterals and circles');
        $scope.checkGiveLesTrue(a9,  '3D Geometry');
        $scope.checkGiveLesTrue(a10, 'Coordinate geometry');
        $scope.checkGiveLesTrue(a11, 'Statistics');
        $scope.checkGiveLesTrue(a12, 'Data Interpretation');
        $scope.checkGiveLesTrue(a13, 'Permutations and combinations');
        $scope.checkGiveLesTrue(a14, 'Probability');
  }
  //Get Count of values
  function filterSub(arr) {
    return _.filter(arr, function (ele) {
      return ele.isTest === true;
    })
  }
  function filterSubQuaCul(data) {
   // console.log(data);
    var i = 0;
    if (data.length) {
      angular.forEach(data, function (val, key) {
        if(val.questionids !=null){
          i += val.questionids.length;
        }
      })
    }
    return i;
  }
  $scope.getCountOfTrueval = function () {
    console.log('enter in Total count fun');
    $scope.dddd = $scope.totalObj.totalJsonObj[$scope.totalObj.groupType];
    var test1 = _.filter($scope.totalObj.totalJsonObj[$scope.totalObj.groupType], function (o) {
      return o.isTest === true
    });
    var test2 = angular.forEach(test1, function (val, key) {
        val.select = filterSub(val.subcategories);
        val.totalQuationsInSec = filterSubQuaCul(val.select);
      // delete val.subcategories ;
    });
    //console.log($scope.totalCountOnLoadFunction(test2, $scope.totalObj.groupType));
    $scope.totalObj.totalJsonObj[$scope.totalObj.groupType].totalQua = _.sumBy(['totalQuationsInSec'], function (prop) {
      return _.sumBy(test2, prop);
    });
    console.log(test2);
    var finallQuestionSet=[] ;
    angular.forEach(test2,function(val,key){
      var subQuestions=[];
      angular.forEach(val.select,function(val1,key1){
            angular.forEach(val1.questionids , function(val2,key2) {
              subQuestions.push({"questionId": val2, "time" : 0 , "isEdit" : false}) ;
            });
      })
      var data= { "type" : val.questiontype, questionIds: subQuestions}
      finallQuestionSet.push(data) ;
    });
    $rootScope.totalObj= finallQuestionSet ;
    console.log(finallQuestionSet);

  }
  $scope.selectedLesson = function () {
    //Lessons Attributes
    var checkAtleastOneTrue1 = $scope.checkAtleastOneLesTrueMath();
   // console.log(checkAtleastOneTrue1);
    if (checkAtleastOneTrue1) {
      $scope.setLessonVariables(
        $scope.numberSystem,
        $scope.integerProperties,
        $scope.Percentages,
        $scope.ratiosAndFractions,
        $scope.algebra,
        $scope.wordProblems,
        $scope.anglesAndTriangles,
        $scope.quadrilateralsAndCircles,
        $scope.dGeometry,
        $scope.coordinateGeometry,
        $scope.statistics,
        $scope.dataInterpretation,
        $scope.permutationsAndCombinations,
        $scope.probability
      );
      //console.log(name);
    } else {
       $scope.setLessonVariables(true, true, true, true, true, true, true, true, true, true, true, true, true, true);
      //console.log(name);
    }
       $scope.getCountOfTrueval();
  }
  $scope.checkAtleastOneTypeTrueMath = function () {
    if ($scope.quantitative_comparision) { return true; }
    if ($scope.data_interpretation) { return true; }
    if ($scope.problem_solving_single) { return true; }
    if ($scope.problem_solving_multiple) { return true; }
    if ($scope.problem_solving_numeric) { return true; }
    return false;
  }
  $scope.checkAtleastOneLesTrueMath = function () {
    if ($scope.numberSystem) return true;
    if ($scope.integerProperties) return true;
    if ($scope.Percentages) return true;
    if ($scope.ratiosAndFractions) return true;
    if ($scope.algebra) return true;
    if ($scope.wordProblems) return true;
    if ($scope.anglesAndTriangles) return true;
    if ($scope.quadrilateralsAndCircles) return true;
    if ($scope.dGeometry) return true;
    if ($scope.coordinateGeometry) return true;
    if ($scope.statistics) return true;
    if ($scope.dataInterpretation) return true;
    if ($scope.permutationsAndCombinations) return true;
    if ($scope.probability) return true;
    return false;
  }
  $scope.checkAtleastOneTypeTrueVerbal = function () {
    if ($scope.textCompletion) return true;
    if ($scope.textCompletionSingleBlank) return true;
    if ($scope.textCompletionDoubleBlank) return true;
    if ($scope.textCompletionTripleBlank) return true;
    if ($scope.sentenceEquivalence ) return true;
    if ($scope.criticalReasoning) return true;
    if ($scope.readingComprehension) return true;
    if ($scope.readingComprehensionShort) return true;
    if ($scope.readingComprehensionLong) return true;
    return false;
  }
  $scope.checkGiveQueTrue = function (modelVal, questiontype) {

    angular.forEach($scope.totalObj.totalJsonObj[$scope.totalObj.groupType], function (val, key) {
      //Check all types and istest status update
      if ($scope.totalObj.totalJsonObj[$scope.totalObj.groupType][key].questiontype.trim() == questiontype.trim()) {
        //return element.isTest = modelVal;
        $scope.totalObj.totalJsonObj[$scope.totalObj.groupType][key].isTest = modelVal;
      }
    });
  }
  //chapter type clicked or changed trigger event fired
  $scope.checkedSelectedOnce = function () {
    $scope.checkGiveQueTrue($scope.quantitative_comparision, "Quantitative Comparision");
    $scope.checkGiveQueTrue($scope.data_interpretation, "Data Interpretation");
    $scope.checkGiveQueTrue($scope.problem_solving_single, "Problem Solving-Single Answer");
    $scope.checkGiveQueTrue($scope.problem_solving_multiple, "Problem Solving-multiple Answer");
    $scope.checkGiveQueTrue($scope.problem_solving_numeric, "Problem Solving-Numeric Entry");
  }
  $scope.checkedSelectedOnce1 = function () {
    $scope.checkGiveQueTrue($scope.textCompletionSingleBlank ,"Text Completion-single Answer" ) ;
    $scope.checkGiveQueTrue($scope.textCompletionDoubleBlank ,"Text Completion-Double Answer" ) ;
    $scope.checkGiveQueTrue($scope.textCompletionTripleBlank ,"Text Completion-Triple Answer" ) ;
    $scope.checkGiveQueTrue($scope.sentenceEquivalence ,"Sentence Equivalence" ) ;
    $scope.checkGiveQueTrue($scope.criticalReasoning ,"Critical Reasoning" ) ;
    $scope.checkGiveQueTrue($scope.readingComprehensionShort ,"Reading Comprehension-Short" ) ;
    $scope.checkGiveQueTrue($scope.readingComprehensionLong ,"Reading Comprehension-Long" ) ;
  }
  $scope.changeActiveType = function () {
    if ($scope.totalObj.groupType == 'Maths') {
      var checkAtleastOneTrue = $scope.checkAtleastOneTypeTrueMath();
      console.log(checkAtleastOneTrue);
      if (checkAtleastOneTrue) {
        //Checked as true which are selected
        $scope.checkedSelectedOnce();
       // console.log($scope.totalObj.totalJsonObj[$scope.totalObj.groupType]);
      } else {
        //Selected all 
        $scope.checkGiveQueTrue(true, "Quantitative Comparision");
        $scope.checkGiveQueTrue(true, "Data Interpretation");
        $scope.checkGiveQueTrue(true, "Problem Solving-Single Answer");
        $scope.checkGiveQueTrue(true, "Problem Solving-multiple Answer");
        $scope.checkGiveQueTrue(true, "Problem Solving-Numeric Entry");
        console.log($scope.totalObj.totalJsonObj[$scope.totalObj.groupType]);
      }
    } else {
      //Verbal
      var checkAtleastOneTrue1 = $scope.checkAtleastOneTypeTrueVerbal();
      console.log(checkAtleastOneTrue1);
      if (checkAtleastOneTrue1) {
        //Checked as true which are selected
        $scope.checkedSelectedOnce1();
        console.log($scope.totalObj.totalJsonObj[$scope.totalObj.groupType]);
      } else {
        //Selected all 
        $scope.checkGiveQueTrue(true ,"Text Completion-single Answer" ) ;
        $scope.checkGiveQueTrue(true ,"Text Completion-Double Answer" ) ;
        $scope.checkGiveQueTrue(true ,"Text Completion-Triple Answer" ) ;
        $scope.checkGiveQueTrue(true ,"Sentence Equivalence" ) ;
        $scope.checkGiveQueTrue(true ,"Critical Reasoning" ) ;
        $scope.checkGiveQueTrue(true ,"Reading Comprehension-Short" ) ;
        $scope.checkGiveQueTrue(true ,"Reading Comprehension-Long" ) ;
      }
    }
    $scope.getCountOfTrueval();
  }
  //Type
  $scope.changeService = function (modelName, name) {
    // console.log(modelName, name);
    // console.log($scope.totalObj.totalJsonObj);
    if (name == "Problem Solving") {
      $scope.problem_solving_single = modelName;
      $scope.problem_solving_multiple = modelName;
      $scope.problem_solving_numeric = modelName;
    }
    if (name == 'textCompletion') {
      $scope.textCompletion = modelName;
      $scope.textCompletionSingleBlank = modelName;
      $scope.textCompletionDoubleBlank = modelName;
      $scope.textCompletionTripleBlank = modelName;
    }
    if(name == 'readingComprehension') {
      $scope.readingComprehension = modelName;
      $scope.readingComprehensionShort = modelName;
      $scope.readingComprehensionLong = modelName;
    }
      $scope.changeActiveType()
  }
  $scope.getChangeGroup = function (name) {
      $scope.totalObj.groupType = name;
  }
  //Click Practice start

  $scope.startPractice=function(){
    console.log( $scope.practiceName);
    if($scope.practiceName){
     console.log( $rootScope.totalObj, $scope.totalObj);
     $rootScope.topBar= true ;    
     if($rootScope.totalObj.length){
       var startTest={
         "type" : $scope.totalObj.groupType ,
         "testName" : $scope.practiceName ,
         "sections" : $rootScope.totalObj ,
         "totalTime" : 0 ,
         "sessionid" : Math.floor(100000 + Math.random() * 900000),
         "userid" :$cookieStore.get("loginAccess").id
      }
      console.log(startTest) ;
      $rootScope.totalObj=startTest ;
      $state.go("practiceteststart") ;
     }else{
         $scope.getCountOfTrueval() ;
         var startTest={
           "type" : $scope.totalObj.groupType ,
           "testName" : $scope.practiceName ,
           "sections" : $rootScope.totalObj ,
           "totalTime" : 0 ,
           "sessionid" : Math.floor(100000 + Math.random() * 900000),
           "userid" :$cookieStore.get("loginAccess").id
       }
       console.log(startTest) ;
       $rootScope.totalObj=startTest ;
       $state.go("practiceteststart") ;
     }
    }else{
      alert("Please enter test name");
      toaster.error("Please enter test name");
    }
   }
 
  $('ul.main li').click(function() {
    $(this).children('ul').toggle();
    $('#mySpan').toggle();
  });

  function do_this(){

    var checkboxes = document.getElementsByName('approve[]');
    var button = document.getElementById('toggle');

    if(button.value == 'select'){
        for (var i in checkboxes){
            checkboxes[i].checked = 'FALSE';
        }
        button.value = 'deselect'
    }else{
        for (var i in checkboxes){
            checkboxes[i].checked = '';
        }
        button.value = 'select';
    }
}

});
 

