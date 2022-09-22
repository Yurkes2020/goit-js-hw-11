export default class ApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=29907105-27da4e6e42fdff29794422632&q=${this.searchQuery}&image_type=photo&page=1&per_page=40&orientation=horizontal&safesearch=true`;

    fetch(url)
      .then(response => response.json())
      .then(console.log);
  }

  get query() {
    return this.searchQuery;
  }

  set(newQuery) {
    this.searchQuery = newQuery;
  }
}
