laddrControllers.controller('PostingsDetailController', ['$scope', '$location', '$http', '$routeParams', '$sessionStorage', 
  function($scope, $location, $http, $routeParams, $sessionStorage) {

  $scope.posting = {};
  $scope.$storage = $sessionStorage;

  if ($scope.$storage.ldrToken != undefined) {

    console.log($routeParams);

    $http
      .get('/api/posting/' + $routeParams.id, {
        headers: {
          'x-access-token': $scope.$storage.ldrToken
        }
      })
      .success(function(data, status, headers, config) {

        $scope.posting.OrganizationName = data.OrganizationName;
        $scope.posting.JobTitle = data.JobTitle;
        $scope.posting.Location = data.Location;
        $scope.posting.Description = data.Description;
        $scope.posting.Timestamp = data.Timestamp;
        $scope.posting.Address = data.Address;
        $scope.posting.MissionStatement = data.MissionStatement;
        $scope.posting.PictureURL = data.PictureURL;

        //show logout
        $scope.logout = true;
      })
      .error(function(data, status, headers, config) {
        //couldn't get postings
        $scope.message = "Could not retrieve posting. Please try again later.";
      });
  } else {
    $location.url('/login');
  }

}]);