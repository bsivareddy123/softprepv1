routerApp.controller('profileCntrl', function ($scope, $state, $cookieStore) {
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }
     $scope.user = {
        password: "",
        confirmPassword: ""
      };

    $scope.post = {};
    $scope.post.action = 1001;
    
    $scope.post.useridVal = $cookieStore.get("loginAccess").id;
    $scope.post.emailVal = $cookieStore.get("loginAccess").email;
    $scope.post.nameVal = $cookieStore.get("loginAccess").fullname;
    console.log($scope.post.useridVal);

  


});
routerApp.directive("compareTo", function() {
      return {
        require: "ngModel",
        scope: {
          confirmPassword: "=compareTo"
        },
        link: function(scope, element, attributes, modelVal) {

          modelVal.$validators.compareTo = function(val) {
            return val == scope.confirmPassword;
          };

          scope.$watch("confirmPassword", function() {
            modelVal.$validate();
          });
        }
      };
    });