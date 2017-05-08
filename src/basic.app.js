angular.module('basic.app', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularx',
    'bootstrap.ex',
    'schedulers',
    'cookies',
    'config.gateways',
    'viewport',
    'clerk.menu',
    'i18n',
    'i18n.gateways',
    'ui.tinymce',
    'checkpoint',
    'checkpoint.accounts',
    'checkpoint.keepalive',
    'checkpoint.templates',
    'binarta-alljs-tpls-angular1',
    'binarta-applicationjs-angular1',
    'binarta-checkpointjs-recaptcha-angular1',
    'binarta-checkpointjs-tpls-angular1',
    'binarta-cache-angular1',
    'application',
    'browser.info'
]).config(['$routeProvider', '$locationProvider', '$provide', '$compileProvider', function ($routeProvider, $locationProvider, $provide, $compileProvider) {
    $routeProvider
        .when('/site-settings', {templateUrl: 'basic-app-site-settings.html'})
        .when('/:locale/site-settings', {templateUrl: 'basic-app-site-settings.html'});
    
    $compileProvider.debugInfoEnabled(window.debugInfoEnabled || false);
}]).run(['schedule', '$cacheFactory', function (schedule, $cacheFactory) {
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