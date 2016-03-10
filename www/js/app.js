angular.module('ionicApp', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
  .state('intro', {
      url: '/',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
  })
  .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
  });

    $urlRouterProvider.otherwise("/");

})

.controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function () {
        $state.go('main');
    };
    $scope.next = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };

    $scope.ff = function () {
        alert(1);
        
            window.plugins.flashlight.switchOn(alert(3),alert(4));
            $scope.flashLightOn = true;
    };

    $scope.flashLight = function () {
        if ($scope.flashLightOn) {
            window.plugins.flashlight.switchOff(alert(1),alert(2));
            $scope.flashLightOn = false;
        }
        /*
        else {
            window.plugins.flashlight.switchOn(alert(3),alert(4));
            $scope.flashLightOn = true;
        }*/
    };

    $scope.flashLightOn = false;
})

.controller('MainCtrl', function ($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function () {
        $state.go('intro');
    }
});


