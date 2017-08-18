(function () {

  angular
    .module('musingsApp')
    .controller('MusingsIndex', [
      'Musing',
      '$sce',
      MusingsIndex
    ])
    .controller('MusingsShow', [
      '$stateParams',
      '$sce',
      'Musing',
      MusingsShow
    ])
    .controller('MusingsNew', [
      '$state',
      'Musing',
      'Content',
      'Author',
      MusingsNew
    ])
    .controller('MusingsEdit', [
      '$stateParams',
      '$state',
      'Musing',
      MusingsEdit
    ])

  function MusingsIndex (Musing, $sce) {
    this.musings = Musing.query()
    this.selectMusing = function (musing) {
      this.selectedMusing = Object.assign({}, musing)
      this.selectedMusing.preview_url = $sce.trustAsResourceUrl(this.selectedMusing.preview_url)
      this.selectedMusing.content.image_url = this.selectedMusing.content.image_url.replace('100x100', `200x200`)
    }
  }

  function MusingsShow($stateParams, $sce, Musing) {
    this.musing = Musing.get({ id: $stateParams.id }, (musing) => {
      musing.preview_url = $sce.trustAsResourceUrl(musing.preview_url)
      return musing
    })
  }

  function MusingsNew($state, Musing, Content, Author) {
    this.musing = new Musing()
    this.contents = Content.query()
    this.authors = Author.query()

    this.create = function () {
      this.musing.$save().then((res) => {
        $state.go('musingsShow', { id: res.id })
      })
    }

    this.updateContentList = function () {
      Author.get({ id: this.musing.author_id }, (res) => {
        this.contents = res.contents
      })
    }

    this.updateAuthorList = function () {
      Content.get({ id: this.musing.content_id }, (res) => {
        this.selectedAuthor = res.author
      })
    }
  }

  function MusingsEdit($stateParams, $state, Musing) {
    this.musing = Musing.get({ id: $stateParams.id })
    this.update = function () {
      this.musing.$update({ id: this.musing.id }).then((res) => {
        $state.go('musingsShow', { id: res.id })
      })
    }
    this.destroy = function () {
      this.musing.$delete({ id: this.musing.id }).then(() => {
        $state.go('musingsIndex')
      })
    }
  }

})()
