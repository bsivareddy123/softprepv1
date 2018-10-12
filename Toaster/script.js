angular.module('sample', ['ngAnimate', 'toaster'])
.directive('bindUnsafeHtml', [function () {
            return {
                template: "<span style='color:orange'>Orange directive text!</span>"
            };
        }])
// The directive that will be dynamically rendered
.directive('bindName', [function () {
      return {
          template: "<span style='color:orange'>Hi {{directiveData.name}}!</span>"
      };
}])
.controller('HomeController', function($scope, toaster, $window,$sce) {
    
    $scope.pop = function(){
       //toaster.toast.body='toast-top-center'
       toaster.pop('success', "title", 'Its address is https://google.com.', 5000, 'trustedHtml', function(toaster) {
            var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
            if (match) $window.open(match[0]);
            return true;
        }); 
               

    };    
    $scope.simple = function(){
        toaster.pop('note', "title", "text");
    };
    $scope.warning = function(){
        toaster.pop('warning', "warning",'Hello codershood.info');
    };
    $scope.success = function(){
        //toaster.success({title: "title", body:"text1"});
        toaster.pop('success', "Notificaton", "Hello codershood.info", 5000, 'trustedHtml');
    };
    $scope.error = function(){
       toaster.error("Error", "You broke something");
    };
    $scope.wait = function(){
        //toaster.pop({type: 'wait', title: "title", body:"text"});
        toaster.wait("Wating","Wating");
    }; 
    $scope.Custom_temp = function(){
        toaster.pop('warning', "This is my Template", "myTemplate.html", null, 'template');
    };
    $scope.close = function(){
        toaster.pop({
            type: 'error',
            title: 'Title text',
            body: 'Body text',
            showCloseButton: true,
            closeHtml: '<button>Close</button>'
        });
    };
    $scope.timeout=function(){
        toaster.pop('note', "TimeOut", "text");
        toaster.toast.timeout=1000;
    };
    $scope.trusted_html=function(){
        toaster.pop('error', "title", '<p class="trustedHtml_text">You directly include HTMl from Script.</p>', null, 'trustedHtml');
    };
    $scope.default_temp=function(){
        toaster.pop('note', "title", null, null, 'template');
    };
    $scope.file_custom_temp=function(){
       toaster.pop('warning', "This is my Template", "templates/Template.html", null, 'template');
    };

    $scope.position=function(){
        toaster.pop('note', "title", 'toast-bottom-left', 'toast-bottom-left', 'tost_id');
        console.log(toaster);
    }
    
    $scope.goToLink = function(toaster) {
      var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
      if (match) $window.open(match[0]);
      return true;
    };
    
    $scope.clear = function(){
        toaster.clear();
    };
});