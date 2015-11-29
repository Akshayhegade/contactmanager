
angular.module('contact.manager.card', [])
  .directive('cardDetail', function($modal) {


    return {
      restrict: 'E',

      scope: {
        contact: '=',
        onEdit: '&',
        onDelete: '&'
      },
      templateUrl: 'html/contact-card.html',
      link: function(scope, element, attrs) {

        scope.addEditContact = function(contact) {
          scope.onEdit(contact);
        }

        scope.deleteContact = function(contact) {
          scope.onDelete(contact);
        }
      }
    }
  });
