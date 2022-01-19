import '../sass/main.scss';
import { fetchMovieData } from './fetchMovie';

const buttonWatched = document.querySelector('#btn-watched');
const buttonQueue = document.querySelector('#btn-queue');
const info = document.querySelector('.start-info');
const div = document.querySelector('.start');
const list = document.createElement('ul');
list.classList.add('lib-gallery__list');

// click control
const handleClick = () => {
  console.log('btn Watched was clicked');
};
buttonWatched.addEventListener('click', handleClick);

const handleClickQ = () => {
  console.log('btn Queue was clicked');
};
buttonQueue.addEventListener('click', handleClickQ);


const imgURL = 'http://image.tmdb.org/t/p/w500/';
function renderMyOneMovie(movie) {
    const { id, poster_path, original_title, release_date, genres } = movie;
    let year = release_date?.slice(0, 4) ?? '';
    let myGenre = genres.map(genre => genre.name).join(', ');
    list.innerHTML += `
          <li class="lib-gallery__item"><img class="lib-gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="${original_title}" />
            <p class="lib-gallery__title">${original_title}</p>
            <p class="lib-gallery__desc">${myGenre} | ${year}</p>
          </li>`;
  };

function renderLibMovies(movieId) {
  fetchMovieData(movieId).then(movie => {
    renderMyOneMovie(movie);
  });
}

let watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
function getWatched() {
  if (watchedMovie !== null) {
    for (let movie of watchedMovie) {
      info.remove();
      list.innerHTML = '';
      renderLibMovies(movie.ID);
    }
    buttonWatched.removeEventListener('click', getWatched);
    buttonQueue.addEventListener('click', getQueque)
  }
  div.append(list);
}
buttonWatched.addEventListener('click', getWatched);

let queue = JSON.parse(localStorage.getItem('queue'));
function getQueque() {
  if (queue !== null) {
    for (let movie of queue) {
      info.remove();
      list.innerHTML ='';
      renderLibMovies(movie.ID);
    }
    buttonQueue.removeEventListener('click', getQueque);
    buttonWatched.addEventListener('click', getWatched);
  }
  div.append(list);
}
buttonQueue.addEventListener('click', getQueque);