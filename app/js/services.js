'use strict';

/* Services */

var contactManagerServices = angular.module('contactManagerServices', ['ngResource']);

contactManagerServices.factory('Contact', function($http) {
  var Contact = new Object('contacts');


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

