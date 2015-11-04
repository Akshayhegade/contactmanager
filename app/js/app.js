'use strict';

/* App Module */

var contactManagerApp = angular.module('contactManagerApp', [
  'ngRoute',
  'ui.bootstrap',
  'contactManagerControllers',
  'contactManagerServices',
  'cm-form'
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
    $rootScope.searchContact = function() {
      console.warn($rootScope.name.value);
    }
});