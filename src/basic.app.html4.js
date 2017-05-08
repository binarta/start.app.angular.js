angular.module('basic.app').config(['$locationProvider', '$provide', function ($locationProvider, $provide) {
    $provide.decorator('$sniffer', ['$delegate', function ($delegate) {
        $delegate.history = false;
        return $delegate;
    }]);
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);