angular.module('app.controllers', [])

.run(function($rootScope, LocalStorage){
  $rootScope.checkins = LocalStorage.get('checkins', []);
})
.controller('listingCtrl', function($scope, LocalStorage) {
  $scope.deleteCheckin = function(checkin) {
    if(confirm('Are you sure you want to delete this?')) {
      var index = $scope.checkins.indexOf(checkin);
      $scope.checkins.splice(index, 1);
      LocalStorage.set('checkins', $scope.checkins);
    }
  }
})
.controller('getLocationCtrl', function(
  $scope, 
  $state,
  $cordovaGeolocation,
  LocalStorage,
  ReverseGeocoder
) {
  $scope.saveLocation = function() {
    $scope.checkins.push({
      id: $scope.checkins.length + 1,
      latitude: $scope.latitude,
      longitude: $scope.longitude,
      address: $scope.address,
      map: $scope.map,
      descriptions: $scope.descriptions,
    });
    LocalStorage.set('checkins', $scope.checkins);
    $state.go('listing');
  }

  $scope.latitude = 0;
  $scope.longitude = 0;
  $scope.address = '';
  $scope.map = '';
  $scope.descriptions = '';

  $cordovaGeolocation.getCurrentPosition({
    timeout: 20000,
    maximumAge: 30000,
    enableHighAccuracy: false,
  }).then(function(results){
    $scope.latitude = results.coords.latitude;
    $scope.longitude = results.coords.longitude;
    ReverseGeocoder
      .get(results.coords.latitude, results.coords.longitude)
      .then(function(results){
        $scope.address = results.address;
        $scope.map = results.map;
      }, function(error){
        console.log(error)
      });
  }, function(error){
    console.log(error);
  });

})
   
.controller('locationDetailsCtrl', function($scope, $stateParams) {

  $scope.checkin = $scope.checkins.filter(function(checkin){
    return checkin.id == $stateParams.id;
  }).pop();

  console.log($scope.checkin);

  console.log($stateParams);

})