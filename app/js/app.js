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
  // Used for searching contacts by name and email
  $rootScope.name = {value: ""};
});