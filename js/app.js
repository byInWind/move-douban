angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        url: '/in_theaters/:page',
        templateUrl: './view/in_theaters/in_theaters.html',
        name: 'in_theaters',
        controller: 'in_theatersCtrl'
      })
      .state({
        url: '/search/:page/:searchInfo',
        templateUrl: './view/search/search.html',
        name: 'search',
        controller:'searchCtrl'
      })
      .state({
        url: '/comming_soon/:page',
        templateUrl: './view/comming_soon/comming_soon.html',
        name: 'comming_soon',
        controller: 'comming_soonCtrl'
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
  .controller('in_theatersCtrl', ['$scope', 'myService', '$stateParams', '$location', function ($scope, myService, $stateParams, $location) {
    //$http({
    //  url: './js/in_theaters.json',
    //  method: 'get'
    //}).then(function (res) {
    //  console.log(res.data);
    //  $scope.result = res.data;
    //})
    //
    //start	起始元素
    //count	返回结果的数量
    var page = $stateParams['page'];
    var count = 9;
    var start = (page - 1) * count;
    var totalPage = 0;
    myService.myJsonp('https://api.douban.com/v2/movie/in_theaters', {
      count:count,
      start:start
    }, function (res) {
      $scope.result = res;
      totalPage = Math.ceil(res.total/count);
      //由于是原生jsonp方法
      $scope.$apply();
    })
    $scope.changePage = function(type){

      if(type == 'next'){

        // 下一页
        page++;

        if(page > totalPage){

          page = totalPage

        }

      }else if(type == 'prev'){

        // 上一页
        page--;

        if(page < 1){
          page = 1;
        }

      }

      // 跳转页面
      $location.path('/in_theaters/'+page);

    }

  }])

  .controller('comming_soonCtrl', ['$scope', 'myService', '$stateParams', '$location', function ($scope, myService, $stateParams, $location) {
    var page = $stateParams['page'];
    var count = 9;
    var start = (page - 1) * count;
    var totalPage = 0;
    myService.myJsonp('https://api.douban.com/v2/movie/coming_soon', {
      count:count,
      start:start
    }, function (res) {
      $scope.result = res;
      totalPage = Math.ceil(res.total/count);
      //由于是原生jsonp方法
      $scope.$apply();
    })
    $scope.changePage = function(type){

      if(type == 'next'){

        // 下一页
        page++;

        if(page > totalPage){

          page = totalPage

        }

      }else if(type == 'prev'){

        // 上一页
        page--;

        if(page < 1){
          page = 1;
        }

      }

      // 跳转页面
      $location.path('/comming_soon/'+page);

    }

  }])

  .controller('searchCtrl', ['$scope','myService', '$stateParams', '$location',function ($scope, myService, $stateParams,$location) {
    var searchInfo = $stateParams.searchInfo;
    var page = $stateParams['page'];
    var count = 9;
    var start = (page - 1) * count;
    var totalPage = 0;
    myService.myJsonp('https://api.douban.com/v2/movie/search', {
      q:searchInfo,
      count:count,
      start:start
    }, function (res) {
      console.log(res)
      $scope.result = res;
      totalPage = Math.ceil(res.total/count);
      //由于是原生jsonp方法
      $scope.$apply();
    })
    $scope.changePage = function(type){
      if(type == 'next'){
        // 下一页
        page++;
        if(page > totalPage){
          page = totalPage
        }
      }else if(type == 'prev'){
        // 上一页
        page--;
        if(page < 1){
          page = 1;
        }

      }
      // 跳转页面
      $location.path('/search/'+page+'/searchInfo');
    }
  }])
  .controller('navCtrl',['$scope','$location',function ($scope,$location) {
    $scope.search=function () {
      $location.path('/search/1/'+$scope.searchInfo);
      $scope.searchInfo = "";
    }
  }])
