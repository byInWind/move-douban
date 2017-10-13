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
    //配置angular白名单
    /*$sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self',
     'https://'
     ]);*/
  }])
  .service('myService', function () {

    this.myJsonp = function (url, data, callback) {

      var fnName = 'myJsonp_' + Math.random().toString().replace('.', '');

      window[fnName] = callback;

      var querystring = '';

      for (var attr in data) {

        querystring += attr + '=' + data[attr] + '&';

      }

      var script = document.createElement('script');

      script.src = url + '?' + querystring + 'callback=' + fnName;

      script.onload = function () {

        document.body.removeChild(script);

      }

      document.body.appendChild(script);

    }

  })
  .controller('in_theatersCtrl', ['$scope', 'myService', function ($scope, myService) {
    //$http({
    //  url: './js/in_theaters.json',
    //  method: 'get'
    //}).then(function (res) {
    //  console.log(res.data);
    //  $scope.result = res.data;
    //})
    myService.myJsonp('https://api.douban.com/v2/movie/in_theaters', {}, function (res) {
      // console.log(res)
      $scope.result = res;
      //由于是原生jsonp方法
      $scope.$apply();
    })

  }])
  .controller('appCtrl', ['$scope', function ($scope) {

  }])

