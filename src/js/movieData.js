const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
import { fetchMovieData } from './fetchMovie';
const movieCard = document.querySelector('.movie-card');

let movieData = {
  photo: '',
  title: '',
  votesAvarage: '',
  votes: '',
  popularity: '',
  orginalTitle: '',
  genre: '',
  about: '',
};

const renderMovie = async () => {
  let data = await fetchMovieData();
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
  console.log(movieData);

  
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
  document.querySelector('.popularity').insertAdjacentHTML('afterbegin', `${movieData.popularity}`);
  document
    .querySelector('.orginal-title')
    .insertAdjacentHTML('afterbegin', `${movieData.orginalTitle}`);
  document.querySelector('.genre').insertAdjacentHTML('afterbegin', `${movieData.genre}`);
  document.querySelector('.modal__about').insertAdjacentHTML('afterbegin', `${movieData.about}`);
};



function addToWatched() {
  localStorage.setItem('watchedMovie', JSON.stringify(movieData));
}

function addToQueue() {
  localStorage.setItem('queue', JSON.stringify(movieData));
}



movieCard.addEventListener('click', renderMovie());
watchedBtn.addEventListener('click', addToWatched);
queueBtn.addEventListener('click', addToQueue);
