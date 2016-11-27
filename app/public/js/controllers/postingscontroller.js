laddrControllers.controller('PostingsController', ['$scope', '$location', '$http', '$routeParams', 'LoginService', '$timeout',
  function($scope, $location, $http, $routeParams, LoginService, $timeout) {
      
    
  $scope.postings = [];
  $scope.page = 1;
  $scope.ppp = 6;

  if (LoginService.isLoggedIn()) {
    $http
      .get('/api/posting', {
        headers: {
          'x-access-token': LoginService.getToken()
        }
      })
      .success(function(data, status, headers, config) {

        $scope.postings = data;

      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve postings. Please try again later.";
      });
  } else {
    $location.url('/login');
  }

  $scope.nextPage = function() {
    $scope.page++;
    if ($scope.page >= Math.ceil($scope.filtered.length / $scope.ppp)) {
      $scope.page = Math.ceil($scope.filtered.length  / $scope.ppp);
    }
  }

  $scope.prevPage = function() {
    $scope.page--;
    if ($scope.page < 1) {
      $scope.page = 1;
    }
  }

  $scope.resetPages = function() {
    $scope.page = 1;
  }
  
  
  $scope.tinymceModel = 'Enter your information here';
  $scope.tinyMceOptions = {
  height: '350px',
  plugins: [
     'advlist autolink lists link image charmap print preview anchor',
     'searchreplace visualblocks code fullscreen',
     'insertdatetime media table contextmenu paste code'
   ],
   toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
   content_css: '//www.tinymce.com/css/codepen.min.css',
  setup: function (editor) {
   //onload
    console.log("I reached here");
   $timeout(function () {
    $scope.tinyMceLoaded = true;
   });
  }
 };
      

  
}]);


