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

.controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $ionicPopup) {

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

    $scope.azimuth = 0;
    $scope.watchID = null;
    $scope.compass = function () {
        if (navigator.compass) {
            $scope.watchID = navigator.compass.watchHeading($scope.onSuccess, onError, options);
        }

        $scope.data = {};
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<img src="img/Compass.png" style="width:100%;-ms-transform: rotate({{360-azimuth}}deg);-webkit-transform: rotate({{360-azimuth}}deg);transform: rotate({{360-azimuth}}deg);"><div style="text-align:center">{{azimuth}}°</div><input ng-model="azimuth"/>',
            title: 'מצפן',
            scope: $scope,
            buttons: [{ text: 'סגור'}]
        });

        myPopup.then(function () {
            if (navigator.compass) {
                navigator.compass.clearWatch($scope.watchID);
            }
        });
    };

    $scope.onSuccess = function (heading) {
        $scope.azimuth = heading.magneticHeading;
        $scope.$apply();
    };

    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    };

    var options = {
        frequency: 1000
    }; // Update every 1 seconds

    $scope.flashLight = function () {
        if ($scope.flashLightOn) {
            window.plugins.flashlight.switchOff();
            $scope.flashLightOn = false;
            $scope.flashLightStatus = "Off";
        }

        else {
            window.plugins.flashlight.switchOn();
            $scope.flashLightOn = true;
            $scope.flashLightStatus = "On";
        }
    };

    $scope.flashLightStatus = "Off";
    $scope.flashLightOn = false;
})

.controller('MainCtrl', function ($scope, $state) {
    console.log('MainCtrl');

    $scope.toIntro = function () {
        $state.go('intro');
    }
});

