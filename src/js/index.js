import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './fetch';

const apiService = new ApiService();

const searchForm = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  apiService.fetchImages();
}

function onLoadMore() {
  apiService.fetchImages();
}

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <div class="photo-card">
  <a class="gallery__item" href=""><img src="" alt="" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
};

const createGalleryMarkup = item => {
  const galleryMarkup = item.map(createGalleryItem).join('');
  galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
