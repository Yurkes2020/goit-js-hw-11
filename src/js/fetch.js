const API_KEY = '29907105-27da4e6e42fdff29794422632';
const BASE_URL = 'https://pixabay.com/api/';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchPhotos() {
    console.log(this);
    const url = `&{BASE_URL}?&{API_KEY}&q=&{this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    return fetch(url)
      .then(response => response.json())
      .then(console.log(data));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
