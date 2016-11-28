//organizationcontroller.js

laddrControllers.controller('OrganizationController', ['$scope', '$location', '$http', '$routeParams', 'LoginService',
  function($scope, $location, $http, $routeParams, LoginService) {

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 13 };

  if (!LoginService.isLoggedIn()) {
    $location.url('/login');
  }

  $http.get('/api/organization/' + $routeParams.id, {
      headers: {
        'x-access-token': LoginService.getToken()
      }
    })
    .success(function(data, status, headers, config) {
      $scope.organization = data;
      $scope.map.center.latitude = $scope.organization.LdrOrganization.Lat;
      $scope.map.center.longitude = $scope.organization.LdrOrganization.Lng;
      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.organization.LdrOrganization.Lat,
          longitude: $scope.organization.LdrOrganization.Lng
        },
        options: { draggable: false }
      };
    })
    .error(function(data, status, headers, config) {
      console.log("Could not retrieve organization.");
      $location.url('/login');
    });

}]);