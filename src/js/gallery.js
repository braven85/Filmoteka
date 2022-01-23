import { spinner, target } from './spinner.js';
import {
  conditionalHide,
  changeCurrentPageMovies, incrementMovies, decrementMovies, skipToFirstMovies, skipToLastMovies,
  changeCurrentPage, increment, decrement, skipToFirst, skipToLast,
} from './pagination';

const axios = require('axios').default;

const gallery = document.querySelector('.gallery');
const search = document.querySelector('.header__icon--search');
const text = document.querySelector('.header__input');
const noResults = document.querySelector('.header__error');

// PAGINATION.JS
const left = document.querySelector('.pagination_left');
const first = document.querySelector('.pagination_first-page');
const pageMinusTwo = document.querySelector('.pagination_less-two');
const pageMinusOne = document.querySelector('.pagination_less-one');
const current = document.querySelector('.pagination_current-page');
const pagePlusOne = document.querySelector('.pagination_more-one');
const pagePlusTwo = document.querySelector('.pagination_more-two');
const last = document.querySelector('.pagination_last-page');
const right = document.querySelector('.pagination_right');

let IDS;

async function fetchImages(page) {
  spinner.spin(target);
  try {
    IDS = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&language=en-US',
    );
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&page=${page}`,
    );
    building(res.data.results);
    spinner.stop();

    return res.data;
  } catch (error) {
    spinner.stop();
    return console.log('fail');
  }
}

fetchImages(1);

async function fetchMovies(name, page) {
  spinner.spin(target);
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&query=${name}&page=${page}`,
    );
    if (res.data.results.length === 0) {
      return (noResults.style.display = 'flex');
    }
    gallery.innerHTML = '';
    building(res.data.results);
    spinner.stop();
    return res.data;
  } catch (error) {
    spinner.stop();
    return (noResults.style.display = 'flex');
  }
}

function building(resp) {
  const markup = resp
    .map((variable) => {
      let genreName = '';
      let movieName = '';
      let movieDate = '';

      IDS.data.genres.forEach((element) => {
        const currentID = Object.values(element)[0];
        if (variable.genre_ids.includes(currentID)) {
          genreName += `${Object.values(element)[1]}, `;
        }
      });
      genreName = genreName.slice(0, genreName.length - 2);
      if ('title' in variable) {
        movieName = variable.title;
        movieDate = variable.release_date.slice(0, 4);
      } else if ('name' in variable) {
        movieName = variable.name;
        movieDate = variable.first_air_date.slice(0, 4);
      }
      return `<div class="movie-card" data-id="${variable.id}" >
  <div class="movie-picture" data-modal-open>
    <img class="movie-img" src="https://image.tmdb.org/t/p/w500/${variable.poster_path}" alt="${movieName} poster">
  </div>
  <div class="movie-description">
    <div class="movie-title">
      ${movieName}
    </div>
    <div class="movie-genre">
      ${genreName} | ${movieDate}
    </div>
  </div>
</div> `;
    })
    .join('');
  gallery.innerHTML += markup;
}

search.addEventListener('click', () => {
  noResults.style.display = 'none';
  current.textContent = 1;
  conditionalHide();
  fetchMovies(text.value, current.textContent);
  pageMinusTwo.removeEventListener('click', changeCurrentPage);
  pageMinusOne.removeEventListener('click', changeCurrentPage);
  pagePlusOne.removeEventListener('click', changeCurrentPage);
  pagePlusTwo.removeEventListener('click', changeCurrentPage);
  right.removeEventListener('click', increment);
  left.removeEventListener('click', decrement);
  first.removeEventListener('click', skipToFirst);
  last.removeEventListener('click', skipToLast);
  pageMinusTwo.addEventListener('click', changeCurrentPageMovies);
  pageMinusOne.addEventListener('click', changeCurrentPageMovies);
  pagePlusOne.addEventListener('click', changeCurrentPageMovies);
  pagePlusTwo.addEventListener('click', changeCurrentPageMovies);
  right.addEventListener('click', incrementMovies);
  left.addEventListener('click', decrementMovies);
  first.addEventListener('click', skipToFirstMovies);
  last.addEventListener('click', skipToLastMovies);
});

text.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    current.textContent = 1;
    conditionalHide();
    noResults.style.display = 'none';
    fetchMovies(text.value, current.textContent);
    pageMinusTwo.removeEventListener('click', changeCurrentPage);
    pageMinusOne.removeEventListener('click', changeCurrentPage);
    pagePlusOne.removeEventListener('click', changeCurrentPage);
    pagePlusTwo.removeEventListener('click', changeCurrentPage);
    right.removeEventListener('click', increment);
    left.removeEventListener('click', decrement);
    first.removeEventListener('click', skipToFirst);
    last.removeEventListener('click', skipToLast);
    pageMinusTwo.addEventListener('click', changeCurrentPageMovies);
    pageMinusOne.addEventListener('click', changeCurrentPageMovies);
    pagePlusOne.addEventListener('click', changeCurrentPageMovies);
    pagePlusTwo.addEventListener('click', changeCurrentPageMovies);
    right.addEventListener('click', incrementMovies);
    left.addEventListener('click', decrementMovies);
    first.addEventListener('click', skipToFirstMovies);
    last.addEventListener('click', skipToLastMovies);
  }
});

export { fetchImages };

