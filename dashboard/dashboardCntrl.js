routerApp.controller('dashboardCntrl', function($scope, $rootScope, $cookieStore,dashboardService , $state) {
    $scope.awaScoreData=[];
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
    $scope.acttype= $cookieStore.get("loginAccess").acttype;
    $scope.userId=$cookieStore.get("loginAccess").id;
    $scope.datasetVal=[] ;
    var colorPick=[   
                    "#ff4000",
                    "#ffbf00",
                    "#ffff00",
                    "#bfff00",
                    "#80ff00",
                    "#40ff00",
                    "#00ff00",
                    "#00ff40",	
                    "#00ff80",
                    "#00ffbf",
                    "#00ffff",
                    "#00bfff",	
                    "#0080ff",	
                    "#0040ff",	
                    "#0000ff",	
                    "#4000ff",	
                    "#8000ff",	
                    "#bf00ff",	
                    "#ff00ff",	
                    "#ff00bf",	
                    "#ff0080",	
                    "#ff0040",	 
                    "#ff0000",	
                    "#f90606",		
                    "#ec1313",	
                    "#e61919",	
                    "#df2020",	
                    "#d92626",	
                    "#d22d2d",	
                    "#cc3333",	
                    "#c63939",	
                    "#bf4040",	
                    "#b94646",	
                    "#b34d4d",	
                    "#ac5353",	
                    "#a65959",	
                    "#9f6060",	
                    "#996666",	
                    "#936c6c",	
                    "#8c7373",	
                    "#867979",	
                    "#808080"
                ]

    dashboardService.dashboardData().then(function(response){
        console.log(response.data.data);
       $scope.dashboardData=response.data.data;
       $scope.dashboardData.maths.avgTime = parseFloat($scope.dashboardData.maths.avgTime);
       $scope.dashboardData.Verbal.avgTime = parseFloat($scope.dashboardData.Verbal.avgTime);
       $scope.awaScoreData= response.data.data.fullLength ;
       console.log( response.data.data.fullLength)


       console.log(response.data.data.fullLength);


       var myChartData = [];
       var greLable=[];

       // var myChartData = [];
       console.log($scope.awaScoreData);
        var totalDataGreScore=$scope.awaScoreData ;
       // delete totalDataGreScore.row_data ; 
       angular.forEach( totalDataGreScore, function(val, key) {
        // angular.forEach( val.graphdata, function(val1, key1) {
            console.log(key,val);
            if(key !='row_data'){
                    greLable.push(val.name);
                    myChartData.push(val.graphdata.grescore);
            }
       
    
       });
       console.log(greLable,myChartData);
       var ctx = document.getElementById("myChart1").getContext('2d');
       var myChart1 = new Chart(ctx, {
           type: 'bar',
           data: {
               labels: greLable,
               datasets: [{
                   label: '',
                   data:myChartData ,
                   backgroundColor: [
                       '#EB2541',
                       '#0F7BC4',
                       '#0E7877',
                       '#02A7A7',
                       '#6C36D8',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderColor: [
                       '#EB2541',
                       '#0F7BC4',
                       '#0E7877',
                       '#02A7A7',
                       '#6C36D8',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                
                   yAxes: [
                       
                    

                    {
                       ticks: {
                          beginAtZero: true,
                          max: 340

                       }
                   }]
               }
           }
       
       });

       angular.forEach(response.data.data.fullLength.row_data,function(val,key) {
        console.log(val,key) ;
        var test=greLable[key];
        $scope.datasetVal.push( {
            label: test ,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(225,0,0,0.4)",
            borderColor: colorPick[key], 
            borderCapStyle: 'square',
            borderDash: [],  
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: val,
            spanGaps: true,
            }) ;
    
       });

       
       myBarChart.update();

    });
var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');

// Global Options:
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

var data = {
  labels: ["Section-1", "Section-2", "Section-3", "Section-4", "Section-5", "Section-6","Section-7"],
  datasets: $scope.datasetVal
};
// Notice the scaleLabel at the same level as Ticks
var options = {
  scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                     display: true,
                     labelString: '',
                     fontSize: 20 
                  }
            }]            
        }  
};
// Chart declaration:
var myBarChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});
dashboardService.dashboardtableData($scope.userId).then(function(response){
    $scope.tabledata=response.data;
    console.log( $scope.tabledata);
});
$scope.review = function(obj) {
    // alert(obj);
    // console.log(obj);
    $cookieStore.put("testId", obj);
    // alert(5);
    var url = $state.href('review', { parameter: "parameter" });
    window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
    // console.log("testId", obj.testid);
    // $state.go('review');
}





});
