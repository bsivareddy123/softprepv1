routerApp.controller('feedbackCntrl', function ($scope, feedbackService, $state, $cookieStore) {
    if ($cookieStore.get('loginAccess') == undefined) {
        $state.go('login');
    }

    $scope.post = {};
    $scope.post.action = 1001;
    $scope.sendingData=false ;
    
    $scope.post.useridVal = $cookieStore.get("loginAccess").id;
    $scope.post.emailVal = $cookieStore.get("loginAccess").email;
    $scope.post.nameVal = $cookieStore.get("loginAccess").fullname;
    console.log($scope.post.useridVal);

    $scope.onSubmit = function () {
       $scope.sendingData=true ;
        feedbackService.feedback($scope.post).then(function(res) {
               console.log(res.data[0].response=="success");
               if(res.data[0].response=="success"){
                $state.go("response");
               }else{
                 // $scope.sendingData=false ;
                alert("check all fileds");
               }

               
            });
    }
    $scope.category=[
        {"id":"Suggestions","name":"Suggestions","color":"primary","colorSelected1":"default"},
        {"id":"Compliments","name":"Compliments","color":"primary","colorSelected1":"default"},
        {"id":"Something is not quite right","name":"Something is not quite right","color":"primary","colorSelected1":"default"}
      
    ]
    $scope.icons=[
        {"id":30,"icon":"fa-frown","color":"red","colorSelected":"", "review":"Unsatisfied"},
        {"id":50,"icon":"fa-meh","color":"orange","colorSelected":"","review":"Average"},
        {"id":80,"icon":"fa-smile","color":"lime","colorSelected":"", "review":"Satisfied"}
    ]
     $scope.expression=function(data,ind,id){
        //  alert(data.id);
         $scope.post.expressionper=data.id;
         _.map($scope.icons,function(x){
             return x.colorSelected = "" ;
         });
         $scope.icons[ind].colorSelected=data.color ;
        //  console.log($scope.icons) ;
         
     }
     $scope.selectcat=function(cat,ind,id){
        _.map($scope.category,function(x){
            // console.log(x);
            return x.colorSelected1 = "default" ;
        });
        // console.log(ind);
        $scope.category[ind].colorSelected1=cat.color ;
        // console.log( $scope.category[ind]);
          $scope.post.subjectVal=cat.id;
        
     }

});