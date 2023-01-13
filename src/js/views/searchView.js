class SearchView {
  _parentElment = document.querySelector('.search');
  getquery() {
    const query = this._parentElment.querySelector('.search__field').value;
    this._parentElment.querySelector('.search__field').value = '';
    return query;
  }
  addEvent(handler) {
    this._parentElment.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
