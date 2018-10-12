routerApp.controller('resultCntrl', function ($scope, $state, $cookieStore, $http, practiseService,$rootScope,$interval,$timeout) {

  if ($cookieStore.get('loginAccess') == undefined) {
    $state.go('login');
  }
  var storeTemp=$rootScope.totalObj;
  $scope.totalObj1=  $rootScope.totalObj;
  if( $rootScope.totalObj == undefined){
    
    $state.go("practisetest") ;
  }
  
  console.log($scope.totalObj1);
  $scope.totalTimeGet= $scope.totalObj1.totalTime;
  $scope.getRandamTime=  Math.floor(Math.random()*(201-100+1)+100);
  console.log($scope.totalObj1); 

  console.log($scope.totalObj1);

$scope.label=[] ;
$scope.getRightAswQua= 0 ;
$scope.getRightWrongQua=0 ;
$scope.corretAswPer=[] ;
$scope.wrongAswPer=[] ;
console.log($scope.totalObj1) ;
function colculateTrue(key, type){
   $scope.totalObj1.sections[key].trueRes = 0 ;
    angular.forEach($scope.totalObj1.sections[key].questionIds,function(val, key1){
      console.log(val['result'],type) ;
      if(val.result == type){
         $scope.totalObj1.sections[key].trueRes++ ;
      }
     
    });
    return  $scope.totalObj1.sections[key].trueRes ;
}
function colculateFalse(key, type){
  $scope.totalObj1.sections[key].falseRes = 0 ;
   angular.forEach($scope.totalObj1.sections[key].questionIds,function(val, key1){
     console.log(val['result'],type) ;
     if(val.result == type){
        $scope.totalObj1.sections[key].falseRes++ ;
     }
   });
   return  $scope.totalObj1.sections[key].falseRes ;
}
angular.forEach($scope.totalObj1.sections,function(val,key){
//  console.log(val.type);
console.log(key,colculateTrue(key, true));
  $scope.totalObj1.sections[key].trueRes= colculateTrue(key, true) ;
  console.log($scope.totalObj1.sections[key]);
  $scope.totalObj1.sections[key].falseRes= colculateFalse(key, false) ;
  $scope.totalObj1.sections[key].secTime= getResultCount ($scope.totalObj1.sections[key].questionIds,'time');;
  console.log($scope.totalObj1.sections[key].trueRes,$scope.totalObj1.sections[key].falseRes)
  // $scope.corretAswPer.push( (($scope.totalObj1.sections[key].trueRes/$scope.totalObj1.sections[key].trueRes + $scope.totalObj1.sections[key].falseRes) * 100) );
  // $scope.wrongAswPer.push( (($scope.totalObj1.sections[key].falseRes/$scope.totalObj1.sections[key].trueRes + $scope.totalObj1.sections[key].falseRes) * 100)  );
  $scope.label.push(val.type) ;
});

angular.forEach($scope.totalObj1.sections,function(val,key){
  console.log((val.trueRes+"/",Number(val.trueRes) + val.falseRes));
    $scope.corretAswPer.push( (((parseInt(val.trueRes)/(parseInt(val.trueRes)  + parseInt(val.falseRes)) )* 100).toFixed(2))  );
    $scope.wrongAswPer.push( (((parseInt(val.falseRes)/(parseInt(val.trueRes)  + parseInt(val.falseRes)) )* 100).toFixed(2))  );
  });

$scope.goToReview=function(){
  $rootScope.totalObj=  storeTemp ;
  $rootScope.topBar = false ;
  $state.go('practiceteststart');
}

console.log($scope.corretAswPer ,$scope.wrongAswPer,$scope.getRightAswQua);
function getResultCount(data,key){
  return _.sumBy([key], function (prop) {
    return _.sumBy(data, prop);
  });
} 
console.log($scope.totalObj1.sections);
$scope.getRightAswQua=  getResultCount ($scope.totalObj1.sections,'trueRes');
$scope.getPercentage=(($scope.getRightAswQua/$scope.totalObj1.totalSecQua) * 100).toFixed(2) ;
console.log($scope.getRightAswQua) ;
var ctx = document.getElementById("myChart").getContext("2d");
//console.log($scope.label);
var chart = new Chart(ctx, {
  type: 'bar',
  data: {
     labels:$scope.label , // responsible for how many bars are gonna show on the chart
     // create 12 datasets, since we have 12 items
     // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
     // put 0, if there is no data for the particular bar
     datasets: [{
      label: "Correct % ",
      backgroundColor: "#F29220",
      borderColor: "#F29220",
      data:    $scope.corretAswPer,
      type1:"dsd"
    } , {
      label: "Wrong %",
      backgroundColor: "#D00",
      borderColor: "#D00",
      data: $scope.wrongAswPer,
      type1:"dsd1"
    }]
  },
  
  options: {  
    scales: {
      xAxes: [{
          stacked: true,
          beginAtZero: true,
          scaleLabel: {
              labelString: 'Month'
          },
          ticks: {
              stepSize: 1,
              min: 0,
              autoSkip: false
          }
      }],
      yAxes: [{
        stacked: true,
        beginAtZero: true,
        scaleLabel: {
            labelString: 'Year'
        },
        ticks: {
           
            autoSkip: false
        }
    }],


  }
   
  }
});

});
  
  
  