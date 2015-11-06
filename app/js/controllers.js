'use strict';

/* Controllers */

var contactManagerControllers = angular.module('contactManagerControllers', []);


//Controller to list all the contacts
contactManagerControllers.controller('ContactListCtrl', function($scope, $rootScope, $modal, Contact) {
  function init() {
    Contact.query().success(function(result) {
      $scope.contacts = result.contacts;
      angular.forEach($scope.contacts, function(contact) {
        contact.imageUrl = "img/" + imgNo++ % 6 + ".jpg";
      });
    });
  }

  // Method to search contacts by name and email
  $scope.searchContact = function (contact) {
    if ($scope.searchText == undefined || contact.name == undefined) {
      return true;
    }

    return (contact.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1) ||
      contact.email.toLowerCase().indexOf($scope.searchText.toLowerCase()) > -1;
  }

  $rootScope.$watch('name.value', function(newVal, oldVal) {
    if (newVal == oldVal) {
      return;
    }
    $scope.searchText = newVal;
  });

  // Instantiating detail view modal
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

  // Instantiating add-edit view modal
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

  // Instantiating delete view modal
  $scope.deleteContact = function(contact) {
    var modalInstance = $modal.open({
      templateUrl: 'html/contact-delete.html',
      controller: 'ContactDeleteCtrl',
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

  var imgNo = 1;
  init();
});


//Controller to show details of individual contact
contactManagerControllers.controller('ContactDetailCtrl', function($scope, contact, $modalInstance) {
  $scope.contact = contact;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


//Controller to add and edit contact
contactManagerControllers.controller('ContactAddEditCtrl', function($scope, contacts, contact, $modalInstance) {
  // Contact for making changes, do not alter the original contact
  // Else, cancel also works as update !! 
  $scope.contact = angular.copy(contact) || {};

  $scope.addUpdateContact = function(isValid) {
    if (!isValid) {
      return;
    }

    if ($scope.contact.id != undefined) {
      $scope.updateContact();
      return;
    }

    contacts.push($scope.contact);
    $scope.contact.id = contacts.length;
    $scope.contact.imageUrl =  "img/" + $scope.contact.id  % 6 + ".jpg";
    $scope.cancel();
  }

  $scope.updateContact = function() {
  // This method is added, so that in the real time application http patch can be called.
    var idx = contacts.indexOf(contact);
    if (idx != -1) {
      contacts.splice(idx, 1);
      contacts.push($scope.contact)
    }

    $scope.cancel();
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


//Controller to delete individual contact
contactManagerControllers.controller('ContactDeleteCtrl', function($scope, contacts, contact, $modalInstance) {
  $scope.contact = contact;

  $scope.deleteContact = function() {
    var idx = contacts.indexOf(contact);
    if (idx != -1) {
      contacts.splice(idx, 1);
    }

    $scope.cancel();
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



