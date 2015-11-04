'use strict';

/* Controllers */

var contactManagerControllers = angular.module('contactManagerControllers', []);

contactManagerControllers.controller('ContactListCtrl', function($scope, $rootScope, $modal, Contact) {
  function init() {
    Contact.query().success(function(result) {
      $scope.contacts = result.contacts;
      angular.forEach($scope.contacts, function(contact) {
        contact.imageUrl = getRandomUrl();
      });
    });
  }

  function getRandomUrl() {
    return "img/" + imgNo++ % 6 + ".jpg";
  }

  $scope.showContact = function(contact) {
    var modalInstance = $modal.open({
      templateUrl: 'html/contact-detail.html',
      controller: 'ContactDetailCtrl',
      resolve: {
        contact: function() {
          return contact;
        },
      }
    });
  }

  $scope.addEditContact = function(contact) {
    var modalInstance = $modal.open({
      templateUrl: 'html/contact-addedit.html',
      controller: 'ContactAddEditCtrl',
      resolve: {
        contacts: function() {
          return $scope.contacts;
        },
        contact: function() {
          return contact;
        }
      }
    });
  }

  $scope.deleteContact = function(contact) {
    var idx = $scope.contacts.indexOf(contact);

    if (idx != -1) {
      $scope.contacts.splice(idx, 1);
    }
  }

  init();
  var imgNo = 1;
});

contactManagerControllers.controller('ContactAddEditCtrl', function($scope, contacts, contact, $modalInstance) {
  $scope.contact = contact || {};

  $scope.addContact = function() {
    contacts.push($scope.contact);
    $scope.contact.id = contacts.length;
    $scope.contact.imageUrl =  "img/" + $scope.contact.id  % 6 + ".jpg";
    $scope.cancel();
  }

  $scope.updateContact = function() {
  // This method is added, so that in the real time application http patch can be called.
    $scope.cancel();
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

contactManagerControllers.controller('ContactDetailCtrl', function($scope, contact, $modalInstance) {
  $scope.contact = contact;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

