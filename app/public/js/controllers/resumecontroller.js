laddrControllers.controller('ResumeController', ['$scope', '$location', '$http', '$routeParams', 'LoginService', '$timeout',
  function($scope, $location, $http, $routeParams, LoginService, $timeout) {
      
  if (!LoginService.isLoggedIn()) {
    $location.url('/login');
  }
      
      //Insertion into database for resumes
    $scope.getEditorContent = function(){
    var resumeText = tinyMCE.activeEditor.getContent();
    document.getElementById('updateAlert').style.display = "block";
        
        
    data = { resume: resumeText 
           };
        
    console.log(data);
        
        $http
        .put('/api/user', data, {
            headers: {
                'x-access-token': LoginService.getToken()
            }
        })
        .success(function(data, status, headers, config) {
        if (data) {
          $location.url('/profile');
        } else {
          console.log('Failed to add resume.');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('Failed to add resume, part 2.');
      });
}


  
  $scope.tinymceModel = '';
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

   $timeout(function () {
    $scope.tinyMceLoaded = true;
   });
  }
 };
      

      
  
}]);

tinyMCE.init({
   mode: "specific_textareas",
    editor_selector : "mceEditor"
});

