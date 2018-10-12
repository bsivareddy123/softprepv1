routerApp.controller('fullengCtrl', function($scope, $http, $interval, $cookieStore, fullengService, $state) {
    // $http.get("section1/data.json")
    $scope.limit=3;
    $scope.acttype= $cookieStore.get("loginAccess").acttype;
    $scope.userId=$cookieStore.get("loginAccess").id;
    console.log( $scope.userId);
    console.log($cookieStore.get('loginAccess'));
    if ($cookieStore.get('loginAccess') == undefined) {
         $state.go('login');
    }
    $interval(function() {
        // console.log('enter Intervel' + $cookieStore.get('checkIsMiddle'));
        if ($cookieStore.get('checkIsMiddle') == 'pause') {
            console.log('enter in');
            $cookieStore.put("checkIsMiddle", "");
            location.reload();
        }
        if ($cookieStore.get('checkIsMiddle') == 'save') {
            console.log('enter in');
            $cookieStore.put("checkIsMiddle", "");
            location.reload();
        }
    }, 1000);
    console.log($cookieStore.get('checkIsMiddle'));
    $scope.checkIsOpenButton = function(type, obj) {
        if (type == 'new') {
            if (obj.is_attend_test == '') {
                return true;
            } else {
                return false;
            }        
            } else if (type == 'pause') {
            if (obj.is_attend_test.testtype == 'pause') {
                return true;
            } else {
                return false;
            }
        } else if (type == 'save') {
            if (obj.is_attend_test.testtype == 'save') {
                return true;
            } else {
                return false;
            }
        }
    }
    $scope.loader=true;
    fullengService.sec().then(function(response) {
        //$scope.post = response.data;
        $scope.post = response.data;
        $scope.loader=false;
        console.log($scope.post);
    });
    $scope.getTestId = function(obj) {
        // $scope.starttime();
        // console.log(obj);
        $cookieStore.put("testId", obj.testid);
        var url = $state.href('cover', { parameter: "parameter" });
        // window.open(url,"popup", "width=1350,height=800");
        // window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        //   newwindow.document.body.style.background = "#ECF0F5";
        //   $state.go('cover');
    }
    $scope.review = function(obj) {
        $cookieStore.put("testId", obj.testid);
        // alert(5);
        var url = $state.href('review', { parameter: "parameter" });
        window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        console.log("testId", obj.testid);
        // $state.go('review');
    }
    $scope.resume = function(obj) {
        // alert(5);
        $cookieStore.put("testId", obj.testid);
        var url = $state.href('resumetest', { parameter: "parameter" });
        window.open(url, "popup", "width=" + $(window).width() + ",height=" + $(window).height());
        // console.log("testId", obj.testid);
        // $state.go('resumetest');
    }
});