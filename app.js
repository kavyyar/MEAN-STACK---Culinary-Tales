angular.module('myFoodApp', [])
  .controller('MainController', ['$scope', '$window', function($scope, $window) {
    // Initialize the search query and user email
    $scope.searchQuery = '';
    $scope.userEmail = '';

    // Variable to keep track of selected recipe
    $scope.selectedRecipe = '';

    // Navigation function
    $scope.navigateTo = function(page) {
      switch(page) {
        case 'login':
          $window.location.href = 'login.html'; // Navigate to login page
          break;
        case 'register':
          $window.location.href = 'register.html'; // Navigate to registration page
          break;
        case 'breakfast':
          $window.location.href = 'breakfast.html'; // Navigate to breakfast recipes page
          break;
        case 'lunch':
          $window.location.href = 'lunch.html'; // Navigate to lunch recipes page
          break;
        case 'dinner':
          $window.location.href = 'dinner.html'; // Navigate to dinner recipes page
          break;
        case 'pastries':
          $window.location.href = 'pastries.html'; // Navigate to pastries page
          break;
        case 'starters':
          $window.location.href = 'starters.html'; // Navigate to starters page
          break;
        default:
          console.log('Page not found');
      }
    };

    // Function to show or hide recipe details
    $scope.showRecipe = function(recipeName) {
      $scope.selectedRecipe = $scope.selectedRecipe === recipeName ? '' : recipeName;
    };

    // Subscription function
    $scope.subscribe = function() {
      if ($scope.userEmail) {
        alert('Thank you for subscribing with: ' + $scope.userEmail);
        $scope.userEmail = ''; // Clear the input after subscription
      } else {
        alert('Please enter a valid email address to subscribe.');
      }
    };
  }])

  // Login Controller
  .controller('LoginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    // Initialize the user object for login
    $scope.user = {
      email: '',
      password: ''
    };

    // Login function
    $scope.login = function() {
      if ($scope.loginForm.$valid) {
        // Send login data to the server
        $http.post('http://localhost:7024/api/login', $scope.user)
          .then(function(response) {
            alert(response.data.message); // Show success message
            $window.location.href = 'index.html'; // Redirect to homepage on success
          })
          .catch(function(error) {
            if (error.status === 400) {
              alert('Invalid username or password'); // Show alert on invalid credentials
            } else {
              alert('An error occurred during login'); // General error handling
            }
          });
      }
    };
  }]);
