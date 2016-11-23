var app = angular.module('myTweets', ['ngRoute']) //this is where you create your angular module

app.controller('myTweetsWelcomeCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the welcome html
    function($scope, $rootScope, $location){

        // ajax rest tweets 

        $rootScope.nextPage = function(){
            if($scope.userName != undefined){ 
                $rootScope.username = $scope.userName;
                $scope.userName = "";
                $location.path('/tweets')
            }
            else{
                alert('Wait! You cannot go forward! You did not enter a username!!!');
            }
        }

    }
]);

app.controller('myTweetsPageCtrl', ['$scope', '$rootScope', '$location', '$interval',//this is the controller for the tweets html
    function($scope, $rootScope, $location, $interval){

        var i = 0;

        $scope.tweets = {
            username: $rootScope.username,
            message: $scope.tweet
        }

        // $scope.countText = function(){
        //     var textVal = $scope.tweet;
        //     console.log(textVal);
        //     // var textVal = " " + textVal.length + " ";
        //     // console.log(textVal);
        //     if (isNaN(textVal)){
        //         $('#wordCount').css("color", "black");
        //         textVal = 0;
        //         $('#wordCount').empty(textVal);
        //         $('#wordCount').append(textVal);
        //     }
        //     else if(textVal > 140){
        //         $('#wordCount').css("color", "red");
        //         $('#wordCount').empty(textVal);
        //         $('#wordCount').append(140 - textVal);
        //     }
        //     else{
        //         $('#wordCount').css("color", "black");
        //         $('#wordCount').empty(textVal);
        //         $('#wordCount').append(textVal);
        //     }
        // };

        $scope.postData = function() {
		/*This function should create a post request using jquery. When posted it should:
			1) Add tweets to the 'database'
			2) After posted prepend message to list of messages and clear input box */
		    var tweet = $scope.tweet;
		    var userID = $rootScope.username;
		    var textVal = $scope.tweet.length;
            var timeCreated

		    if (tweet == "") {
			    alert("Don't forget to add a tweet!");
		    }
            else if(userID == undefined){
                alera("Please go back to the welcome page to log in!")
            }
		    else if(textVal > 140){
		    	alert("Your tweet is greater than 140 characters! Please shorten it prior to sending.");
		    }
		    else {
			    $.ajax({
				    url: 'http://localhost:3000/api/tweets',
				    type: 'POST',
				    contentType: 'application/json',
				    data: JSON.stringify({
					    user: userID,
					    text: tweet
				    })
			    }).then($('#tweetDisplay').prepend("<p class = 'col-sm-12'>" + '<b>' + "@" + userID + "</b><br>" + tweet + "<br></p>"));
			    i++;
			    $scope.tweet = "";
		    };
	    };

        $scope.getData = function() {
            /*This function should make a get request from 'database', parse the data and prepend each to the page*/
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/api/tweets',
                contentType: 'application/json'
            }).then(function (success) {
                $scope.tweetsArray = success;
            })
        }

        $scope.welcomePage = function(){
            $location.path('/welcome');
        }

        $scope.getData();

    }
]);



//this is your address book
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/welcome', {//when we nav to localhost:3000/#/welcome...
            templateUrl: 'views/welcome.html', //this is the file you are getting
            controller: 'myTweetsWelcomeCtrl' //this is the controller that is called
        })
        .when('/tweets', {
            templateUrl: 'views/tweets.html',
            controller: 'myTweetsPageCtrl'
        })
        .otherwise({
            redirectTo: '/welcome'
        })
}]);
