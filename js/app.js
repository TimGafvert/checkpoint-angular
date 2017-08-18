(function () {

  angular
    .module('musingsApp', [
      'ui.router',
      'ngResource'
    ])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      Router
    ])

  function Router ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('musingsIndex', {
        url: '/musings',
        controller: 'MusingsIndex',
        controllerAs: 'vm',
        templateUrl: 'js/views/musings/index.html'
      })
      .state('musingsShow', {
        url: '/musings/:id',
        controller: 'MusingsShow',
        controllerAs: 'vm',
        templateUrl: 'js/views/musings/show.html'
      })
      .state('musingsNew', {
        url: '/musings/new',
        controller: 'MusingsNew',
        controllerAs: 'vm',
        templateUrl: 'js/views/musings/new.html'
      })
      .state('musingsEdit', {
        url: '/musings/:id/edit',
        controller: 'MusingsEdit',
        controllerAs: 'vm',
        templateUrl: 'js/views/musings/edit.html'
      })
    $urlRouterProvider.otherwise('/musings')
  }

})()
