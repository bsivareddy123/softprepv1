'use strict';

angular.module('routerApp').service('videoService', ['$q', '$http', '$cookieStore', function($q, $http, $cookieStore) {
 this.videodata = function(data) {
        var D = $q.defer()
        $http.get(baseUrl+"api/Videos/videos_all_list_ui", data).then(function(data) {
            // http://localhost/services/softprep/api/Videos/videos_all_list_ui
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
    }
    // http://localhost/services/softprep/api/Videos/create_videos_que
    this.createquetions = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/Videos/create_videos_que", data).then(function(data) {
            console.log(data);
              D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
     }
     this.likeUnlike = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/Videos/new_likes", data).then(function(data) {
            console.log(data);
              D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
     }
     this.likeUnlikeAns = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/Videos/new_likes_ans", data).then(function(data) {
            console.log(data);
              D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
     }

     
    //  http://localhost/services/softprep/api/videos/create_videos_ans
    this.createanswer = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/Videos/create_videos_ans", data).then(function(data) {
            console.log(data);
              D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
     }
    

    // http://localhost/services/softprep/api/videos/subcatById_total_vedios/900425/417
    this.videoSubCatList = function(testid) {
        var D = $q.defer()
        $http.get(baseUrl+"api/Videos/subcatById_total_vedios/" + testid+'/'+$cookieStore.get("loginAccess").id).then(function(data) {
            console.log(data);
            D.resolve(data);

        }, function(data) {
            D.resolve(data);
        });
    
        return D.promise;
    }
    this.videoSubList = function(cat,sub) {
        var D = $q.defer()
       
        $http.get(baseUrl+"api/Videos/subcatById_vedio_ques/"+cat+"/"+$cookieStore.get("loginAccess").id+"/"+sub).then(function(data) {
            console.log(data);
            D.resolve(data);

        }, function(data) {
            D.resolve(data);
        });
    
        return D.promise;
    }
  
    this.videoAnsList = function(quid) {
        // console.log(sub);
        var D = $q.defer()
        $http.get(baseUrl+"api/Videos/ans_by_queid/"+quid).then(function(data) {
            console.log(data);
            D.resolve(data);

        }, function(data) {
            D.resolve(data);
        });
    
        return D.promise;
    }
    //   video unlock service
    this.VideoUnLock = function(data) {
        var D = $q.defer()
        $http.post(baseUrl+"api/Videos/vedio_unlock_insert", data).then(function(data) {
            console.log(data);
              D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        
        return D.promise;
     }
    //  videotest service
    
    this.videoTest = function(testid) {

        var D = $q.defer()
        $http.get(baseUrl+"api/Test/test_by_id/"+testid).then(function(data) {
            D.resolve(data);
        }, function(data) {
            D.resolve(data);
        });
        // )
        //     .error(function(data) {
        //         D.resolve(data);
        //     });
        return D.promise;
    }
   

}]);