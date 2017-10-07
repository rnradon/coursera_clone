(function(){

    var app = angular.module("myApp", ["ngRoute","ui.router"]);
    app.config(function($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider

            .when("/", {
                templateUrl : "Views/student/login.html",
            })

            .when("/student/signup", {
                templateUrl : "Views/student/register.html",
            })

            .when("/home/userId=:id/:access_token", {
                templateUrl : "Views/student/view_home_course.html",

                controller: 'view_home_course_controller'
            })

            .when("/edit/userId=:userId/:access_token", {
                templateUrl : "Views/student/edit_user.html",

                controller: 'edit_user_controller'
            })

            .when("/view/userId=:userId/:access_token", {
                templateUrl : "Views/student/view_user.html",

                controller: 'view_user_controller'
            })

            .when("/deactivate/userId=:userId/:access_token", {
                templateUrl : "Views/student/deactivate_user.html",

            })

            .when("/course_material/courseId=:courseId/userId=:userId/:access_token", {
                templateUrl : "Views/student/view_course_material.html",

                controller: 'view_course_material_controller'
            })






            .when("/admin", {
                templateUrl : "Views/admin/login.html",
            })
            .when("/admin/courses/userId=:id/:access_token", {
                templateUrl : "Views/admin/admin_view_course.html",

                controller: 'admin_view_course_controller'
            })
            .when("/admin/add/userId=:id/:access_token", {
                templateUrl : "Views/admin/admin_add_course.html",
            });


        $locationProvider.html5Mode(true);

        //initialize get if not there
	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};    
	    }    

	    // Answer edited to include suggestions from comments
	    // because previous version of code introduced browser-related errors

	    //disable IE ajax request caching
	    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	    // extra
	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


        
    });





    app.controller('view_home_course_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
    
        var access_token = $routeParams.access_token
        $http.get('/api/courses?access_token=' + access_token)
        .then(function(response) {
        $scope.users_json_data = response.data;

        // $scope.data=[10,90];    //REMEMBER
        
        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });

        $http.get('/api/courses/count?access_token=' + access_token)
        .then(function(response) {
        $scope.count = response.data;

        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });  


    }]);


    

    app.controller('view_course_material_controller', ['$routeParams', '$scope', '$http', '$sce', function($routeParams, $scope, $http, $sce ) {
        
        var courseId = $routeParams.courseId
        var access_token = $routeParams.access_token
        var url = '/api/courses/' + courseId + '/videos?' + access_token
        alert(url)
        alert('url')

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
          }
        $http.get(url).then(function(response) {
            alert(response.data)
            console.log(response.data)
        $scope.users_json_data = response.data;
    });

        $http.get('/api/courses/' + courseId + '/videos/count?' + access_token)
        .then(function(response) {
        $scope.count = response.data;

        }); 


    }]);


      
    
    app.controller('edit_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        // var machineId = $routeParams.id
        var access_token = $routeParams.access_token
        var userId = $routeParams.userId
        var url = '/api/students/' + userId + '?' + access_token
        alert('url')
        alert(url)
        $http.get(url).then(function(response) {
        $scope.users_json_data = response.data;
            });

    }]);




    
    app.controller('view_user_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
        // var machineId = $routeParams.id
        var access_token = $routeParams.access_token
        var userId = $routeParams.userId
        var url = '/api/students/' + userId + '?' + access_token
        alert('url')
        alert(url)
        $http.get(url).then(function(response) {
        $scope.users_json_data = response.data;
            });


    }]);





    app.controller('change_auth_password', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
    
        var access_token = $routeParams.access_token
        $http.get('/api/users?access_token=' + access_token)
        .then(function successCallback(response) {
            // alert("SUCCESS")
          }, function errorCallback(response) {
            alert("Authorization Timed Out !")
                window.location.href = '/';
          });
        

    }]);



    app.controller('admin_view_course_controller', ['$routeParams', '$scope', '$http', function($routeParams, $scope, $http ) {
        
    
        var access_token = $routeParams.access_token
        $http.get('/api/courses?access_token=' + access_token)
        .then(function(response) {
        $scope.users_json_data = response.data;

        // $scope.data=[10,90];    //REMEMBER
        
        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });

        $http.get('/api/courses/count?access_token=' + access_token)
        .then(function(response) {
        $scope.count = response.data;

        // $scope.reg_number = $routeParams.registration_number;
        // alert("CONTROLLER WORKS")
        });  


    }]);


})();