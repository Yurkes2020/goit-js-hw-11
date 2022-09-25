import axios from 'axios';

const API_KEY = '29907105-27da4e6e42fdff29794422632';
const BASE_URL = 'https://pixabay.com/api/';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages() {
    try {
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${this.perPage}&orientation=horizontal&safesearch=true`;

      const responce = await axios.get(url);

      this.incrementPage();

      return responce.data;
    } catch (error) {
      console.log('Error on try...catch', error);
    }
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
