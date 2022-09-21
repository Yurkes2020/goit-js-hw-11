import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './fetch';

const searchQuery = document.querySelector('.search-form');
console.log(searchQuery);

searchQuery.addEventListener('submit', onSearch);

const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  apiService.fetchPhotos();
}
