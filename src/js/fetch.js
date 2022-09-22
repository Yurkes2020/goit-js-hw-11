const API_KEY = '29907105-27da4e6e42fdff29794422632';
const BASE_URL = 'https://pixabay.com/api/';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${this.perPage}&orientation=horizontal&safesearch=true`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
