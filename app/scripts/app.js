'use strict';

/**
 * @ngdoc overview
 * @name invProduct
 * @description
 * # invProduct
 *
 * Main module of the application.
 */
angular
  .module('invProduct', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ]) 
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs:'main',
        caseInsensitiveMatch:true
      })
      .when('/about', {
       
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        caseInsensitiveMatch:true
       
      })
      .when('/contacts', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        caseInsensitiveMatch:true
      })
      .when('/products', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product',
        caseInsensitiveMatch:true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        caseInsensitiveMatch:true
      })
      .when('/dashboard', {
         resolve:
        {
          pathValidation:function($location)
            {
              if (localStorageService.get('validUser')==true) 
                {
                  window.location.assign('/');
                }
              else
                {
                  window.location.assign('/login');
                }
            }
        },
        templateUrl: 'main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        caseInsensitiveMatch:true
      })
      .otherwise({
        redirectTo:'/',
        controller: 'MainCtrl',
        controllerAs:'main',
        caseInsensitiveMatch:true
      })

    });
/*
      .config(function(localStorageServiceProvider)
      {
      localStorageServiceProvider
      .setPrefix('invProduct')
      .setStorageType('localStorage')
      .setNotify(true,true)
      
      });
*/