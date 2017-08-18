(function () {

  angular
    .module('musingsApp')
    .factory('Musing', [
      '$resource',
      Musing
    ])

  function Musing ($resource) {
    return $resource('http://localhost:3000/api/musings/:id', {}, {
      update: { method: 'PUT' }
    })
  }

})()
