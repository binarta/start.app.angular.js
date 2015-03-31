angular.module('basic.app', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ngTouch',
    'angularx',
    'config.gateways',
    'i18n',
    'ui.tinymce',
    'image-management',
    'imagex.tinymce',
    'checkpoint',
    'checkpoint.accounts',
    'contact.us',
    'toggle.edit.mode',
    'cookies',
    'ui.bootstrap.ex',
    'schedulers',
    'autoupdater',
    'clerk.menu',
    'seo',
    'viewport',
    'angularticsx.ga',
    'catalog',
    'binarta.search',
    'blog',
    'blog.templates',
    'journal'
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
}]).run(['config', 'topicMessageDispatcher', function (config, topicMessageDispatcher) {
    topicMessageDispatcher.firePersistently('config.initialized', config);
    topicMessageDispatcher.firePersistently('app.start', 'ok');
}]);