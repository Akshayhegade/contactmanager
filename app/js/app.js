'use strict';

/* App Module */

var contactManagerApp = angular.module('contactManagerApp', [
  'ngRoute',
  'ui.bootstrap',
  'contactManagerControllers',
  'contactManagerServices'
]);

contactManagerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'html/contact-list.html',
        controller: 'ContactListCtrl'
      });
  }]);

contactManagerApp.run(function($rootScope) {
  $rootScope.name = {value: ""};
});