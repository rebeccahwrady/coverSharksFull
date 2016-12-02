var app = angular.module('myCover', ['ngRoute']) //this is where you create your angular module

app.controller('myHomePageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the welcome page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myAboutPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the about page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myHowToPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the how to page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myHowToVideosPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the how to page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myPromotionsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the promotions page html
    function($scope, $rootScope, $location) {

    }
]);



//this is your address book
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { //when we nav to localhost:3000/#/welcome...
            templateUrl: 'views/home.html', //this is the file you are getting
            controller: 'myHomePageCtrl' //this is the controller that is called
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'myAboutPageCtrl'
        })
        .when('/howTo', {
            templateUrl: 'views/howTo.html',
            controller: 'myHowToPageCtrl'
        })
        .when('/howToVideos', {
            templateUrl: 'views/howToVideos.html',
            controller: 'myHowToVideosPageCtrl'
        })
        .when('/promotions', {
            templateUrl: 'views/promotions.html',
            controller: 'myPromotionsPageCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);