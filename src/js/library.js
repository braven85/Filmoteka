import '../sass/main.scss';
// import { addToWatched, addToQueue, renderMovie } from './movieData';
import { fetchMovieData } from './fetchMovie';

const API_KEY = '130c7a7ecd86dbb286ae26c3cdcca88c';
const buttonWatched = document.querySelector('#btn-watched');
const buttonQueue = document.querySelector('#btn-queue');
const info = document.querySelector('.start-info');
const div = document.querySelector('.start');
const paragraph = document.createElement('p');

// click control
const handleClick = () => {
  console.log('btn Watched was clicked');
};
buttonWatched.addEventListener('click', handleClick);

const handleClickQ = () => {
  console.log('btn Queue was clicked');
};
buttonQueue.addEventListener('click', handleClickQ);

// error
// let id = 
// async function fetchMovie(id) {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=130c7a7ecd86dbb286ae26c3cdcca88c`,
//     );
//     if (!response.ok) {
//       throw new Error(response.status);
//     } else {
//       return await response.json();
//     }
//   } catch (err) {
//     return console.log(err);
//   }
// }

  const imgURL = 'http://image.tmdb.org/t/p/w500/';
  function renderMyOneMovie(movie) {
    const { id, poster_path, original_title, release_date, genres, } = movie;
    paragraph.innerHTML += `
        <ul class="lib-gallery">
        <li class="lib-gallery__item"><img class="lib-gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="${original_title}" />
          <p class="lib-gallery__title">${original_title}</p>
          <p class="lib-gallery__desc">${genres} | ${release_date}</p>
        </li>
        </ul>`;
};

function renderLibMovies(movieId) {
  fetchMovieData(movieId).then(movie => {
    renderMyOneMovie(movie);
  });
}

let watchedMovie = JSON.parse(localStorage.getItem('watchedMovie'));
console.log(watchedMovie);
function getWatched() {
  if (watchedMovie !== null) {
    info.remove();
    paragraph.innerHTML = '';
    watchedMovie.forEach(renderLibMovies);
  }
  div.append(paragraph);
}

buttonWatched.addEventListener('click', getWatched);

let queue = JSON.parse(localStorage.getItem('queue'));
function getQueque() {
  if (queue !== null) {
    info.remove();
    paragraph.innerHTML = '';
    queue.forEach(renderLibMovies);
  }
  div.append(paragraph);
}

buttonQueue.addEventListener('click', getQueque);


// ========================== LOCAL STORAGE

// const addtoLocalStorage = function (key, value) {
// Get the existing data
//   let saved = localStorage.getItem(key);
//   saved = saved ? JSON.parse(saved) : [];
// Add new data to localStorage
//   saved.push(value);
// Save back to localStorage
//   localStorage.setItem(key, JSON.stringify(saved));
// };

// const addToWatched = () => {
//   addToLocalStorage('watchedID', watchedBtn.dataset.id);
//   console.log('btn was clicked');
// };
// watchedBtn.addEventListener('click', addToWatched);

// const load = (key) => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     // console.log(
//     //   (idQueue =
//     //     serializedState === null ? undefined : JSON.parse(serializedState))
//     // );
//     return (idQueue =
//       serializedState === null ? undefined : JSON.parse(serializedState));
//   } catch (error) {
//     console.error("Get state error: ", error.message);
//   }
// };


// async function fetchMovies(id) {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
//     );
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return await response.json();
//   } catch (err) {
//     return console.log(err);
//     }
// };

// async function fetchGenres() {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
//     );
//     if (!response.ok) {
//       throw new Error(response.status);
//     } else {
//       return response.json();
//     }
//   } catch (err) {
//     return console.log(err);
//   }
// }

// ==============forEach
// let arrW = [];
// function renderLibMovies() {
//   arrW.forEach((id) => {
//     fetchMovie(id).then(({ id, poster_path, original_title, release_date, genres }) => {
//       paragraph.innerHTML += `
//        < ul class="lib-gallery" >
//         <li class="lib-gallery__item"><img class="lib-gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="${original_title}" />
//           <p class="lib-gallery__title">${original_title}</p>
//           <p class="lib-gallery__desc">${genre} | ${release_date}</p>
//         </li>
//         </ul>`;
//     });
//   });
// }

//  buttonWatched.addEventListener('click', renderLibMovies);
//  buttonQueue.addEventListener('click', renderLibMovies);


// ===========grid na sztywno
// const handleClick = () => {
//   console.log('btn Watched was clicked');
// };
// buttonWatched.addEventListener('click', handleClick);

// const handleClickQ = () => {
//   console.log('btn Queue was clicked');
// };
// buttonQueue.addEventListener('click', handleClickQ);
// //moja lipna funkcja

// buttonWatched.onclick = function () {
//   const info = document.querySelector('.start-info');
//   info.remove();
//   const div = document.querySelector('.start');
//   const paragraph = document.createElement('p');
//   paragraph.innerHTML =
//     `<ul class="lib-gallery__list">
//     <li class="lib-gallery__item">
//     <img class="lib-gallery__image" src="http://image.tmdb.org/t/p/w500//teCy1egGQa0y8ULJvlrDHQKnxBL.jpg">
//     <p class="lib-gallery__title">Greyhound</p>
//     <p class="lib-gallery__desc">Drama, Action | 2020</p></li>
//     <li class="lib-gallery__item">
//     <img class="lib-gallery__image" src="http://image.tmdb.org/t/p/w500//eWnDaPkOe0ISpkDgwnfidQoMfX2.jpg">
//     <p class="lib-gallery__title">Greyhound</p>
//     <p class="lib-gallery__desc">Drama, Action | 2020</p></li>
//     <li class="lib-gallery__item">
//     <img class="lib-gallery__image" src="http://image.tmdb.org/t/p/w500//1g0dhYtq4irTY1GPXvft6k4YLjm.jpg">
//     <p class="lib-gallery__title">Greyhound</p>
//     <p class="lib-gallery__desc">Drama, Action | 2020</p></li>
//     <li class="lib-gallery__item">
//     <img class="lib-gallery__image" src="http://image.tmdb.org/t/p/w500//8c4a8kE7PizaGQQnditMmI1xbRp.jpg">
//     <p class="lib-gallery__title">Greyhound</p>
//     <p class="lib-gallery__desc">Drama, Action | 2020</p></li>
//     </ul>`;
//   div.append(paragraph);
// };
