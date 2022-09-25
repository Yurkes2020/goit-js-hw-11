import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './fetch';
import '../sass/index.scss';

const apiService = new ApiService();

const searchForm = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

let perPage = 40;

function onSearch(e) {
  e.preventDefault();

  clearPhotos();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  if (apiService.query === '') {
    return;
  } else {
    apiService.resetPage();
    apiService.fetchImages().then(data => {
      if (data.total === 0) {
        Notiflix.Notify.failure('За Вашим запитом нічого не знайдено');
      } else {
        createGalleryMarkup(data.hits);
        Notiflix.Notify.success(`Для вас знайдено ${data.totalHits} картинок`);
        loadMore.classList.remove('none');
      }
    });
  }
}

function onLoadMore() {
  apiService.fetchImages().then(data => {
    perPage += 40;
    if (perPage >= data.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMore.classList.add('none');
    }
    createGalleryMarkup(data.hits);
  });
}

function clearPhotos() {
  galleryRef.innerHTML = '';
}

const createGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br />
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br />
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br />
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br />
      ${downloads}
    </p>
  </div>
</div>`;
};

const createGalleryMarkup = data => {
  const galleryMarkup = data.map(createGalleryItem).join('');
  galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox();
};

function lightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 150,
  });
  lightbox.refresh();
}