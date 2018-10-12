var routerApp = angular.module('routerApp', ['ui.router', 'ngCookies', 'ngSanitize', 'toaster']);
var mode = "live" ;
var baseUrl ="" ;
if(mode == 'test'){
    //Local test
    baseUrl ="http://localhost/services/softprep/" ;
    
} else{
    //Live    
    baseUrl ="http://18.218.122.78:8080/softprep/" ;
}

routerApp.filter('numberpad', function () {
    return function (input, places) {
        var out = "";
        if (places) {
            var placesLength = parseInt(places, 10);
            var inputLength = input.toString().length;
            for (var i = 0; i < (placesLength - inputLength); i++) {
                out = '0' + out;
            }
            out = out + input;
        }
        return out;
    };
});


routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardCntrl'
    })
    $stateProvider.state('header', {
        url: '/header',
        templateUrl: 'header.html',
        controller: 'headerCtrl'
    })
    $stateProvider.state('sider', {
            url: '/sider',
            templateUrl: 'sidebar.html',
            controller: 'sidebarCntrl'
        })
        .state('lessons', {
            url: '/lessons',
            templateUrl: 'lessons/lessons.html'

        })
    .state('reasoning', {
            url: '/reasoning',
            templateUrl: 'videos/reasoning/reasoning.html'
                // controller: 'reasngCntrl'
        })
        .state('fulllength', {
            url: '/fulllength',
            templateUrl: 'full length test/fulllength.html',
            controller: 'fullengCtrl'
        })
        .state('cover', {
            url: '/cover',
            templateUrl: 'cover/cover.html',
            controller: 'coverCtrl'
        })
        .state('section1', {
            url: '/section1',
            templateUrl: 'section1/section1.html',
            controller: 'customersCtrl'

        })
        .state('review', {
            url: '/review',
            templateUrl: 'section1/review.html',
            controller: 'reviewCtrl'

        })
        .state('resumetest', {
            url: '/resumetest',
            templateUrl: 'section1/resumetest.html',
            controller: 'resumetestCtrl'

        })
        .state('videos', {
            url: '/videos',
            templateUrl: 'videos/video.html',
            controller: 'videoCntrl'
        })
        .state('videoques', {
            url: '/videoques/:id',
            templateUrl: 'videos/videoques.html',
            controller: 'videoqueCntrl'
        })
         .state('videoview', {
            url: '/videoview/:catid?:subcatid',
            templateUrl: 'videos/videoview.html',
            controller: 'videoviewCntrl'
         })
         .state('videoviewans', {
            url: '/videoviewans/:catid?:subcatid?:queid',
            templateUrl: 'videos/videoviewans.html',
            controller: 'videoviewansCntrl' 
          
         })
         .state('videoexam', {
            url: '/videoexam/:id?:testid?:videoid',
            templateUrl: 'videos/videoexam.html',
            controller: 'videoexamsCntrl'
         })
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
         .state('logout', {
            url: '/logout',
            templateUrl: 'logout/logout.html',
            controller: 'logoutCtrl'
        })
        
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup/signup.html',
            controller: 'signupCtrl'
        })
    .state('practisetest', {
        url: '/practisetest',
        templateUrl: 'practisetest/practise.html',
        controller: 'practCntrl'
    })
    .state('practisereview', {
            url: '/practisereview',
            templateUrl: 'practisetest/practisereview.html',
            controller: 'practisereviewCntrl'
        })
        .state('practiceteststart', {
            url: '/practiceteststart',
            templateUrl: 'practisetest/start.html',
            controller: 'practiseStartCntrl'

        })
        .state('result', {
            url: '/result',
            templateUrl: 'practisetest/result.html',
            controller: 'resultCntrl'

        })
        .state('sectionreview', {
            url: '/sectionreview',
            templateUrl: 'section1/sectionreview.html',
            controller: 'sectionreviewCntrl'
        })
        .state('unsscore', {
            url: '/unsscore/:id',
            templateUrl: 'unsscore/unsscore.html',
            controller: 'unsscoreCntrl'
        })
        .state('feedback', {
            url: '/feedback',
            templateUrl: 'feedback/feedback.html',
            controller: 'feedbackCntrl'

        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'profile/profile.html',
            controller: 'profileCntrl'
        })
         .state('response', {
            url: '/response',
            templateUrl: 'feedback/respose.html'
           
        })


});
routerApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
 });

routerApp.filter('secondsToDateTime', [function() {
    /**
     * This code returns a date string formatted manually.
     * Code "new Date(1970, 0, 1).setSeconds(seconds)" returns malformed output on days.
     * Eg. 4 days, magically becomes 5, 15 becomes 16 and so on...;
     * */
    return function(seconds) {
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var mins = Math.floor(((seconds % 86400) % 3600) / 60);
        var secs = ((seconds % 86400) % 3600) % 60;
        return ('00' + mins).slice(-2) + ':' + ('00' + secs).slice(-2);
    };
}]);
routerApp.filter('secondsToTime', function() {

    function padTime(t) {
        return t < 10 ? "0"+t : t;
    }

    return function(_seconds) {
        if (typeof _seconds !== "number" || _seconds < 0)
            return "00:00:00";
        var hours = Math.floor(_seconds / 3600),
            minutes = Math.floor((_seconds % 3600) / 60),
            seconds = Math.floor(_seconds % 60);
        return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
    };
});


routerApp.controller('logoutCtrl', function($scope, loginService, $state, $rootScope, $cookieStore,$cookies) {
  
   $cookieStore.remove('loginAccess');
    //$cookieStore.put('loginAccess',undefined);
    console.log($cookieStore.get('loginAccess'));
   $state.go('login');
});
routerApp.controller('headerCtrl', function($scope, loginService, $state, $rootScope, $cookieStore) {
    // alert("enter in");
    // console.log("enter in");
    
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
    $scope.email = $cookieStore.get("loginAccess").email;
    $scope.fullname = $cookieStore.get("loginAccess").fullname;
    $scope.id = $cookieStore.get("loginAccess").id;
    $scope.branch = $cookieStore.get("loginAccess").branch;
    $scope.phonenumber = $cookieStore.get("loginAccess").phonenumber;

});
routerApp.controller('sidebarCntrl', function($scope, loginService, $state, $rootScope, $cookieStore) {
    // alert("enter in");
    // console.log("enter in");
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
      }
    $scope.fullname = $cookieStore.get("loginAccess").fullname;
});