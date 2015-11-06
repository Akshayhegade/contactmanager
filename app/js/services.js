'use strict';

/* Services */

var contactManagerServices = angular.module('contactManagerServices', ['ngResource']);

contactManagerServices.factory('Contact', function($http) {
  var Contact = new Object('contacts');

  // Method to fetch the contacts from json file
  // This mocks the $http.get of real world scenario
  // On full blown projects, we need to have proper value for urls, rest remain the same
  // EX: For RESTful App, it would be,
  //     url = '/app/contacts/
  Contact.query = function() {
    var url = "contacts/contacts.json";
    return $http.get(url).success(
      function(response) {
        var names = response.contacts;
      }
    );
  };

  return Contact;
});

