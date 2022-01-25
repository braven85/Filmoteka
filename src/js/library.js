import { fetchMovieData } from './fetchMovie.js';

const buttonWatched = document.querySelector('#btn-watched');
const buttonQueue = document.querySelector('#btn-queue');
const info = document.querySelector('.start-info');
const div = document.querySelector('.start');
const list = document.createElement('ul');
list.classList.add('lib-gallery__list');
const current = document.querySelector('.pagination_current-page');
const watchedCountArray=JSON.parse(localStorage.getItem('watchedMovie'));
const pageNumberWatched=Math.ceil(watchedCountArray.length/20);
const queueCountArray=JSON.parse(localStorage.getItem('queue'));
const pageNumberQueue=Math.ceil(queueCountArray.length/20);
const currentPageWatched=watchedCountArray.slice(Number(current.textContent)*20-20,Number(current.textContent)*20);
const currentPageQueue=queueCountArray.slice(Number(current.textContent)*20-20,Number(current.textContent)*20);


const imgURL = 'https://image.tmdb.org/t/p/w500/';
function renderMyOneMovie(movie) {
  const { id, poster_path, original_title, release_date, genres } = movie;
  let year;
  if (year !== '') {
    year = release_date.slice(0, 4);
  } else {
    year = '';
  }
  let myGenre = genres.map(genre => genre.name).join(', ');
  list.innerHTML += `
          <li class="lib-gallery__item"><img class="lib-gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="${original_title}" />
            <p class="lib-gallery__title">${original_title}</p>
            <p class="lib-gallery__desc">${myGenre} | ${year}</p>
          </li>`;
}

function renderLibMovies(movieId) {
  fetchMovieData(movieId).then(movie => {
    renderMyOneMovie(movie);
  });
}

// let watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
// let queue = JSON.parse(localStorage.getItem('queue'));

function getWatched() {
  div.innerHTML = '';
  list.innerHTML = '';
  buttonWatched.removeEventListener('click', getWatched);
  buttonWatched.style.background = '#FF6B01';
  buttonWatched.style.border = 'transparent';
  buttonQueue.style.background = 'transparent';
  buttonQueue.style.border = '1px solid #FFF';
  buttonQueue.addEventListener('click', getQueque);
  if (watchedCountArray === null) {
    div.innerHTML = `<p class="start-info">EMPTY!</p>`;
  } else {
    for (let movie of currentPageWatched) {
      info.remove();
      renderLibMovies(movie.ID);
    }
  }
  div.append(list);
}
getWatched();
buttonWatched.addEventListener('click', getWatched);

function getQueque() {
  div.innerHTML = '';
  list.innerHTML = '';
  buttonQueue.removeEventListener('click', getQueque);
  buttonQueue.style.backgroundColor = '#FF6B01';
  buttonQueue.style.border = 'transparent';
  buttonWatched.style.background = 'transparent';
  buttonWatched.style.border = '1px solid #FFF';
  buttonWatched.addEventListener('click', getWatched);
  if (queueCountArray === null) {
    div.innerHTML = `<p class="start-info">EMPTY!</p>`;
  } else {
    for (let movie of queueCountArray) {
      info.remove();
      list.innerHTML = '';
      renderLibMovies(movie.ID);
    }
  }
  div.append(list);
}
buttonQueue.addEventListener('click', getQueque);

// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE
// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE
// OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE OKNO MODALNE

const openModalCard = document.querySelector('[data-modal-open]');

const getModalData = e => {
  let modalData = e.target.closest('.lib-gallery__image');
  let movieId = modalData.getAttribute('id');
  try {
    if (movieId !== null) {
      renderMovieLib(movieId);
    }
  } catch (error) {
    console.log('Wystąpił błąd przy pobieraniu danych z bazy');
  }
};

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
  buttonColorsWatched(movieId);
  buttonColorsQueue(movieId);
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

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');

function buttonColorsWatched(movieId) {
  // watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
  if (watchedCountArray == null) watchedCountArray = [];
  for (let movie of currentPageWatched) {
    if (movieId == movie.ID) {
      watchedBtn.style.backgroundColor = '#ff6b01';
      watchedBtn.style.color = 'white';
      watchedBtn.style.borderStyle = 'none';
      watchedBtn.innerHTML = 'Watched';
      break;
    } else {
      watchedBtn.style.backgroundColor = '#FFFFFF';
      watchedBtn.style.color = 'black';
      watchedBtn.style.border = '1px solid black';
      watchedBtn.innerHTML = 'Add to watched';
    }
  }
}

function buttonColorsQueue(movieId) {
  // queue = JSON.parse(localStorage.getItem('queue'));
  if (queueCountArray == null) queueCountArray = [];
  for (let movie of currentPageQueue) {
    if (movieId == movie.ID) {
      queueBtn.style.backgroundColor = '#ff6b01';
      queueBtn.style.color = 'white';
      queueBtn.style.borderStyle = 'none';
      queueBtn.innerHTML = 'In queue';
      break;
    } else {
      queueBtn.style.backgroundColor = '#FFFFFF';
      queueBtn.style.color = 'black';
      queueBtn.style.border = '1px solid black';
      queueBtn.innerHTML = 'Add to queue';
    }
  }
}

function addToWatched() {
  // watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
  if (watchedCountArray == null) watchedCountArray = [];

  let movieTitleForConsole = { movieTitle: movieData.title, ID: movieData.id };
  let newMovie = { movieTitle: movieData.title, ID: movieData.id };

  for (let movie of watchedCountArray) {
    if (movie.ID == newMovie.ID) {
      newMovie = '';
      break;
    }
  }

  if (newMovie === '') {
    for (let movie of watchedCountArray) {
      if (movie.ID == movieTitleForConsole.ID) {
        let movieIndex = watchedCountArray.indexOf(movie);
        watchedCountArray.splice(movieIndex, 1);
        localStorage.setItem('watchedMovie', JSON.stringify(watchedCountArray));
        buttonColorsWatched(movie.ID);
        if (watchedCountArray.length == 0) {
          watchedBtn.style.backgroundColor = '#FFFFFF';
          watchedBtn.style.color = 'black';
          watchedBtn.style.border = '1px solid black';
          watchedBtn.innerHTML = 'Add to watched';
        }
        getWatched();
        break;
      }
    }
  } else {
    watchedCountArray.push(newMovie);
    localStorage.setItem('watchedMovie', JSON.stringify(watchedCountArray));
    buttonColorsWatched(newMovie.ID);
    getWatched();
  }
  
}

function addToQueue() {
  // queue = JSON.parse(localStorage.getItem('queue'));
  if (queueCountArray == null) queueCountArray = [];

  let movieTitleForConsole = { movieTitle: movieData.title, ID: movieData.id };
  let newMovie = { movieTitle: movieData.title, ID: movieData.id };

  for (let movie of queueCountArray) {
    if (movie.ID == newMovie.ID) {
      newMovie = '';
      break;
    }
  }

  if (newMovie === '') {
    for (let movie of queueCountArray) {
      if (movie.ID == movieTitleForConsole.ID) {
        let movieIndex = queueCountArray.indexOf(movie);
        queueCountArray.splice(movieIndex, 1);
        localStorage.setItem('queue', JSON.stringify(queueCountArray));
        buttonColorsQueue(movie.ID);
        if (queueCountArray.length == 0) {
          queueBtn.style.backgroundColor = '#FFFFFF';
          queueBtn.style.color = 'black';
          queueBtn.style.border = '1px solid black';
          queueBtn.innerHTML = 'Add to queue';
        }
        getQueque();
        break;
      }
    }
  } else {
    queueCountArray.push(newMovie);
    localStorage.setItem('queue', JSON.stringify(queueCountArray));
    buttonColorsQueue(newMovie.ID);
    getQueque();
  }
}

watchedBtn.addEventListener('click', addToWatched);

queueBtn.addEventListener('click', addToQueue);

export {getWatched};
export {getQueque};
