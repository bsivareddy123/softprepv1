routerApp.controller("timeCtrl", function($scope, $state) {

    $scope.countDown = 30;
    var countInt = 30;
    var timer = setInterval(function() {
        $scope.countDown--;
        countInt--;
       // console.log(countInt + ' >' + 0);
        if (countInt <= 0) {
            countInt = 0;
            $state.go('section2');
        }
        $scope.$apply();
    }, 1000);


    window.history.forward();

    function noBack() {
        window.history.forward();
    }

});