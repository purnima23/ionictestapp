angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('listing', {
    url: '/listing',
    templateUrl: 'templates/listing.html',
    controller: 'listingCtrl'
  })

  .state('getLocation', {
    url: '/get-location',
    templateUrl: 'templates/getLocation.html',
    controller: 'getLocationCtrl'
  })

  .state('locationDetails', {
    url: '/details/:id',
    templateUrl: 'templates/locationDetails.html',
    controller: 'locationDetailsCtrl'
  })

$urlRouterProvider.otherwise('/listing')

  

});