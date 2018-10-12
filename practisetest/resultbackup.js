routerApp.controller('resultCntrl', function ($scope, $state, $cookieStore, $http, practiseService,$rootScope,$interval) {



  $scope.totalObj1=  $rootScope.totalObj;
  console.log($scope.totalObj1); 
   //console.log($scope.totalObj1);
  //   if($scope.totalObj1 == undefined){
 //   $state.go("practisetest") ;
// }
$scope.label=[] ;
$scope.getRightAswQua= 0 ;
$scope.getRightWrongQua=0 ;
$scope.corretAswPer=[] ;
$scope.wrongAswPer=[] ;
console.log($scope.totalObj1) ;
angular.forEach($scope.totalObj1.sections,function(val,key){
//  console.log(val.type);
  $scope.totalObj1.sections[key].trueRes= 0;
  $scope.totalObj1.sections[key].falseRes= 0;
  $scope.totalObj1.sections[key].secTime= 0;
  
  $scope.corretAswPer.push( (($scope.totalObj1.sections[key].trueRes/$scope.totalObj1.sections[key].trueRes + $scope.totalObj1.sections[key].falseRes) * 100).toFixed(2) );
  $scope.wrongAswPer.push( (($scope.totalObj1.sections[key].falseRes/$scope.totalObj1.sections[key].trueRes + $scope.totalObj1.sections[key].falseRes) * 100).toFixed(2) );
  $scope.label.push(val.type) ;


});
console.log($scope.corretAswPer ,$scope.wrongAswPer,$scope.getRightAswQua)
function getResultCount(data,key){
  return _.sumBy([key], function (prop) {
    return _.sumBy(data, prop);
  });
}
$scope.getRightAswQua=  getResultCount ($scope.totalObj1.sections,'trueRes');
$scope.getPercentage=(($scope.getRightAswQua/$scope.totalObj1.totalSecQua) * 100).toFixed(2) ;
console.log($scope.getRightAswQua) ;

var ctx = document.getElementById("myChart").getContext("2d");
var data = {
  labels: $scope.label,
  datasets: [{
      label: "Correct ",
      backgroundColor: "#F29220",
      borderColor: "#F29220",
      data:   $scope.corretAswPer,
      type1:"dsd"
    } , {
      label: "Wrong",
      backgroundColor: "#D00",
      borderColor: "#D00",
      data: $scope.wrongAswPer,
      type1:"dsd1"
    }]
};
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: $scope.wrongAswPer,
  options: {
    scales: {
  		xAxes: [{stacked: true}],
    	yAxes: [{
      	stacked: true,
      	ticks: {
        	beginAtZero: true 
         }
      }]
    }
  }
});

});
  
  
  