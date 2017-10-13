angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        url: '/in_theaters',
        templateUrl: './view/in_theaters/in_theaters.html',
        name: 'in_theaters',
        controller: 'in_theatersCtrl'
      })
    $urlRouterProvider.otherwise('/in_theaters');
  }])

  .controller('in_theatersCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      url: './js/in_theaters.json',
      method: 'get'
    }).then(function (res) {
      console.log(res.data);
      $scope.result = res.data;
    })
  }])
  .controller('appCtrl', ['$scope', function ($scope) {

  }])

