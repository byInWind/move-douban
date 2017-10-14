angular.module('app', ['ui.router','route','service','in_theaters','search','comming_soon','top'])

  .controller('navCtrl',['$scope','$location',function ($scope,$location) {
    $scope.search=function () {
      $location.path('/search/1/'+$scope.searchInfo);
      $scope.searchInfo = "";
    }
  }])
