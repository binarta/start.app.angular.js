angular.module('basic.app', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularx',
    'ui.bootstrap.ex',
    'angularticsx.ga',
    'autoupdater',
    'schedulers',
    'cookies',
    'config.gateways',
    'viewport',
    'clerk.menu',
    'seo',
    'intercom',
    'inspectlet',
    'i18n',
    'i18n.gateways',
    'ui.tinymce',
    'checkpoint',
    'checkpoint.accounts',
    'checkpoint.keepalive',
    'checkpoint.templates',
    'image-management',
    'imagex.tinymce',
    'contact.us',
    'bin.media',
    'catalog',
    'catalog.templates',
    'binarta.search',
    'search.templates',
    'blog',
    'blog.templates',
    'truncate',
    'application',
    'application.trial'
]).config(['$locationProvider', '$provide', function ($locationProvider, $provide) {
    $provide.decorator('$sniffer', ['$delegate', function ($delegate) {
        $delegate.history = false;
        return $delegate;
    }]);
    $locationProvider.html5Mode(false).hashPrefix('!');
}]).run(['schedule', 'autoupdater', '$cacheFactory', function (schedule, autoupdater, $cacheFactory) {
    schedule.forPeriod(autoupdater, 60000);
    schedule.forPeriod(function () {
        $cacheFactory.get('i18n').removeAll();
    }, 600000);
}]).run(['$rootScope', 'config', 'topicMessageDispatcher', function ($rootScope, config, topicMessageDispatcher) {
    $rootScope.binartaBaseUri = config.binartaBaseUri || 'https://binarta.com/';
    $rootScope.binartaUpgradeUri = $rootScope.binartaBaseUri + '#!/upgrade/' + config.namespace;
    topicMessageDispatcher.firePersistently('config.initialized', config);
    topicMessageDispatcher.firePersistently('app.start', 'ok');
}]).run(['signInWithTokenService', function SignInWithTokenRunner(signInWithTokenService) {
    signInWithTokenService();
}]);