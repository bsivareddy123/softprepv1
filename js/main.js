var app = angular.module('myApp', []);
app.controller('customersCtrl5', function($scope, $http) {




    $http.get("data.json")
        .then(function(response) {
            $scope.names = response.data;
        });

    $scope.itemsPerPage = 1;
    $scope.items = [];
    $scope.currentPage = 1;


    $scope.selectRadio = function(parentIndex, rowIndex) {

        // console.log('-----' + rowIndex + '-----');
        angular.forEach($scope.names.questions[parentIndex].Options, function(val, key) {
            console.log(parentIndex, key)
            if (rowIndex == key) {
                console.log($scope.names.questions[parentIndex].Options[key]);
                $scope.names.questions[parentIndex].Options[key].IsAnswer = true;
            } else {
                $scope.names.questions[parentIndex].Options[key].IsAnswer = false;
            }

        });

    }

    // for (var i = 0; i < $scope.names.length; i++) {
    //     $scope.items.push({
    //         id: i,
    //         name: "name " + i,
    //         description: "description " + i
    //     });
    // }
    // $scope.prevPage = function() {
    //     if ($scope.currentPage > 0) {
    //         $scope.currentPage--;
    //     }
    // };
    // $scope.prevPageDisabled = function() {
    //     return $scope.currentPage === 0 ? "disabled" : "disabled";
    // };
    // $scope.pageCount = function() {
    //     return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    // };
    // $scope.nextPage = function() {
    //     if ($scope.currentPage < $scope.pageCount()) {
    //         $scope.currentPage++;
    //     }
    // };
    // $scope.nextPageDisabled = function() {
    //     return $scope.currentPage === $scope.pageCount() ? "disabled" : "disabled";
    // };

    $scope.prevPage1 = function() {
        if ($scope.currentPage - 1) {
            $scope.currentPage = $scope.currentPage - 1;
        }
    }

    $scope.nextPage1 = function() {
        if ($scope.currentPage != $scope.names.questions.length + 1) {
            $scope.currentPage = $scope.currentPage + 1;
        }
    }
$scope.time=function(){
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second parm
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }
    
    var count = '3600'; // it's 00:01:02
    
    
    var counter = setInterval(timer, 1000);
    
    function timer() {
    
    
        console.log(count);
    
        if (parseInt(count) <= 0) {
            clearInterval(counter);
            return;
        }
        var temp = count.toHHMMSS();
        count = (parseInt(count) - 1).toString();
    
        $('#timer').html(temp);
    }

}

$scope.$on('$locationChangeStart', function(evnt, next, current){            
    alert("Your, browsers back button is disabled!");

    //Prevent browser's back button default action.
    evnt.preventDefault();            
});





 window.history.forward();
        function noBack()
        {
            window.history.forward();
        }


});