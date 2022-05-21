import Notiflix from 'notiflix';
import renderMarkup from './fetchData';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('#search-form button'),
  btnLoadMore: document.querySelector('.load-more'),
  btnSearchAnchor: document.querySelector('.searchAnchor'),
  gallery: document.querySelector('.gallery'),
};
export let page = 1;
export let query = '';
let gallery = {};
const onQuerySubmit = async event => {
  event.preventDefault();

  if (query !== event.target[0].value) {
    // console.log(refs.gallery.textContent);
    refs.btnLoadMore.classList.add('hidden');
    refs.btnSearchAnchor.classList.add('hidden');
    refs.gallery.textContent = '';
    page = 1;
  }
  query = event.target[0].value.trim();
  // query = query.trim();
  if (query === '') {
    // console.log('have no text on input');
    Notiflix.Notify.failure('Please enter some query :)');
    return;
  }
  await renderMarkup();

  gallery = new SimpleLightbox('.gallery .photo-card a');
  gallery.on('show.simplelightbox');

  refs.searchBtn.setAttribute('disabled', 'disabled');
  refs.btnLoadMore.removeAttribute('disabled');

  page += 1;
};

refs.input.addEventListener('input', () => {
  if (refs.input.value !== query) {
    // console.log(refs.input.value);
    // console.log(query);
    refs.searchBtn.removeAttribute('disabled');
  }
});

refs.btnLoadMore.addEventListener('click', async event => {
  // console.log('click');
  await renderMarkup();
  await gallery.refresh();

  // console.log(event);
  setTimeout(() => {
    page += 1;
    event.view.scrollBy({
      top: 1000,
      behavior: 'smooth',
    });
  }, 300);
});

refs.btnSearchAnchor.addEventListener('click', event => {
  event.view.scroll({
    top: 0,
    behavior: 'smooth',
  });
});
refs.form.addEventListener('submit', onQuerySubmit);
