import { fetchMovieData } from './fetchMovie.js';

const buttonWatched = document.querySelector('#btn-watched');
const buttonQueue = document.querySelector('#btn-queue');
const info = document.querySelector('.start-info');
const div = document.querySelector('.start');
const list = document.createElement('ul');
list.classList.add('lib-gallery__list');

// click control
// const handleClick = () => {
//   console.log('btn Watched was clicked');
// };
// buttonWatched.addEventListener('click', handleClick);

// const handleClickQ = () => {
//   console.log('btn Queue was clicked');
// };
// buttonQueue.addEventListener('click', handleClickQ);


const imgURL = 'https://image.tmdb.org/t/p/w500/';
function renderMyOneMovie(movie) {
    const { id, poster_path, original_title, release_date, genres } = movie;
    //let year = release_date?.slice(0, 4) ?? '';
    let year;
    if (year !== '') {
      year = release_date.slice(0,4);
    } else {
      year = '';
    }
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

// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE 
// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE 
// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE 

const openModalCard = document.querySelector('[data-modal-open]');

const getModalData = (e) => {
  let modalData = e.target.closest(".lib-gallery__image");
  let movieId = modalData.getAttribute('id');
  try {
    if (movieId !== null) {
      renderMovieLib(movieId);
    }
  } catch (error) {
    console.log("Wystąpił błąd przy pobieraniu danych z bazy");
  }
}

openModalCard.addEventListener('click', getModalData);

let movieData = {
  photo: '',
  title: '',
  votesAvarage: '',
  votes: '',
  popularity: '',
  orginalTitle: '',
  genre: '',
  about: '',
  id: '',
};

function renderMovieLib(movieId) {
  clearModal();
  fetchMovieData(movieId).then(res => {
    let data = res;
    movieData.photo = data.poster_path;
    movieData.title = data.title;
    movieData.votesAvarage = data.vote_average;
    movieData.votes = data.vote_count;
    movieData.popularity = data.popularity;
    movieData.orginalTitle = data.original_title;
    const genresArray = data.genres;
    let genres = genresArray.map(genresArray => genresArray.name);
    movieData.genre = genres.toString();
    movieData.about = data.overview;
    movieData.id = data.id;

    document
      .querySelector('.movie')
      .insertAdjacentHTML(
        'afterbegin',
        `<img class="modal__movie-photo" src="https://image.tmdb.org/t/p/original${movieData.photo}" alt="photo" />`,
      );
    document
      .querySelector('.modal__movie-title')
      .insertAdjacentHTML('afterbegin', `${movieData.title}`);
    document.querySelector('.vote').insertAdjacentHTML('afterbegin', `${movieData.votesAvarage}`);
    document.querySelector('.votes').insertAdjacentHTML('afterbegin', `${movieData.votes}`);
    document
      .querySelector('.popularity')
      .insertAdjacentHTML('afterbegin', `${movieData.popularity}`);
    document
      .querySelector('.orginal-title')
      .insertAdjacentHTML('afterbegin', `${movieData.orginalTitle}`);
    document.querySelector('.genre').insertAdjacentHTML('afterbegin', `${movieData.genre}`);
    document.querySelector('.modal__about').insertAdjacentHTML('afterbegin', `${movieData.about}`);
  });
}

function clearModal() {
  document.querySelector('.movie').innerHTML = '';
  document.querySelector('.modal__movie-title').innerHTML = '';
  document.querySelector('.vote').innerHTML = '';
  document.querySelector('.votes').innerHTML = '';
  document.querySelector('.popularity').innerHTML = '';
  document.querySelector('.orginal-title').innerHTML = '';
  document.querySelector('.genre').innerHTML = '';
  document.querySelector('.modal__about').innerHTML = '';
}