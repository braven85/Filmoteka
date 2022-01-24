// import { fetchImages, fetchMovies, conditionalHide } from './gallery.js';

// const hidingFirst = document.querySelector('.pagination_hider-first');
// const hidingLast = document.querySelector('.pagination_hider-last');
// const left = document.querySelector('.pagination_left');
// const first = document.querySelector('.pagination_first-page');
// const pageMinusTwo = document.querySelector('.pagination_less-two');
// const pageMinusOne = document.querySelector('.pagination_less-one');
// const current = document.querySelector('.pagination_current-page');
// const pagePlusOne = document.querySelector('.pagination_more-one');
// const pagePlusTwo = document.querySelector('.pagination_more-two');
// const last = document.querySelector('.pagination_last-page');
// const right = document.querySelector('.pagination_right');
// const gallery = document.querySelector('.gallery');
// const text = document.querySelector('.header__input');
// const search = document.querySelector('.header__icon--search');

// pageMinusTwo.value = -2;
// pageMinusOne.value = -1;
// pagePlusOne.value = 1;
// pagePlusTwo.value = 2;
// right.value = 1;
// left.value = -1;

// const galleryRefresh = (e) => {
//   gallery.innerHTML = '';
// };

// conditionalHide();

// const changeCurrentPage = (e) => {
//   e.preventDefault();
//   current.textContent = e.currentTarget.textContent;
//   console.log(current.textContent);
//   galleryRefresh();
//   fetchImages(Number(current.textContent))
//     .then((data) => { last.textContent = data.total_pages; });

//   conditionalHide();
// };

// const changeCurrentPageMovies = (e) => {
//   e.preventDefault();
//   current.textContent = e.currentTarget.textContent;
//   console.log(current.textContent);
//   galleryRefresh();
//   fetchMovies(text.value, Number(current.textContent))
//     .then((data) => last.textContent = data.total_pages);

//   conditionalHide();
// };

// const skipToFirst = (e) => {
//   e.preventDefault();
//   changeCurrentPage(e);
//   e.currentTarget.style.visibility = 'hidden';
//   e.currentTarget.disabled = true;
//   pageMinusOne.style.visibility = 'hidden';
//   pageMinusOne.disabled = true;
//   pageMinusTwo.style.visibility = 'hidden';
//   pageMinusTwo.disabled = true;
//   conditionalHide();
// };

// const skipToFirstMovies = (e) => {
//   e.preventDefault();
//   changeCurrentPageMovies(e);
//   e.currentTarget.style.visibility = 'hidden';
//   e.currentTarget.disabled = true;
//   pageMinusOne.style.visibility = 'hidden';
//   pageMinusOne.disabled = true;
//   pageMinusTwo.style.visibility = 'hidden';
//   pageMinusTwo.disabled = true;
//   conditionalHide();
// };

// const skipToLast = (e) => {
//   e.preventDefault();
//   changeCurrentPage(e);
//   e.currentTarget.style.visibility = 'hidden';
//   e.currentTarget.disabled = true;
//   pagePlusOne.style.visibility = 'hidden';
//   pagePlusOne.disabled = true;
//   pagePlusTwo.style.visibility = 'hidden';
//   pagePlusTwo.disabled = true;
//   conditionalHide();
// };

// const skipToLastMovies = (e) => {
//   e.preventDefault();
//   changeCurrentPageMovies(e);
//   e.currentTarget.style.visibility = 'hidden';
//   e.currentTarget.disabled = true;
//   pagePlusOne.style.visibility = 'hidden';
//   pagePlusOne.disabled = true;
//   pagePlusTwo.style.visibility = 'hidden';
//   pagePlusTwo.disabled = true;
//   conditionalHide();
// };

// const increment = (e) => {
//   e.preventDefault();
//   current.textContent = Number(current.textContent) + Number(right.value);
//   pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
//   pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
//   pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
//   pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
//   galleryRefresh();
//   fetchImages(Number(current.textContent))
//     .then((data) => last.textContent = data.total_pages);

//   conditionalHide();
// };

// const incrementMovies = (e) => {
//   e.preventDefault();
//   current.textContent = Number(current.textContent) + Number(right.value);
//   pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
//   pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
//   pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
//   pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
//   galleryRefresh();
//   fetchMovies(text.value, Number(current.textContent))
//     .then((data) => last.textContent = data.total_pages);

//   conditionalHide();
// };

// const decrement = (e) => {
//   e.preventDefault();

//   current.textContent = Number(current.textContent) - Number(right.value);
//   pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
//   pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
//   pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
//   pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
//   galleryRefresh();
//   fetchImages(Number(current.textContent))
//     .then((data) => last.textContent = data.total_pages);

//   conditionalHide();
// };

// const decrementMovies = (e) => {
//   e.preventDefault();
//   current.textContent = Number(current.textContent) - Number(right.value);
//   pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
//   pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
//   pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
//   pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
//   galleryRefresh();
//   fetchMovies(text.value, Number(current.textContent))
//     .then((data) => last.textContent = data.total_pages);

//   conditionalHide();
// };

// const listenerChanger = (e) => {
//   pageMinusTwo.removeEventListener('click', changeCurrentPage);
//   pageMinusOne.removeEventListener('click', changeCurrentPage);
//   pagePlusOne.removeEventListener('click', changeCurrentPage);
//   pagePlusTwo.removeEventListener('click', changeCurrentPage);
//   right.removeEventListener('click', increment);
//   left.removeEventListener('click', decrement);
//   first.removeEventListener('click', skipToFirst);
//   last.removeEventListener('click', skipToLast);
//   pageMinusTwo.addEventListener('click', changeCurrentPageMovies);
//   pageMinusOne.addEventListener('click', changeCurrentPageMovies);
//   pagePlusOne.addEventListener('click', changeCurrentPageMovies);
//   pagePlusTwo.addEventListener('click', changeCurrentPageMovies);
//   right.addEventListener('click', incrementMovies);
//   left.addEventListener('click', decrementMovies);
//   first.addEventListener('click', skipToFirstMovies);
//   last.addEventListener('click', skipToLastMovies);
//   current.textContent = 1;
//   conditionalHide();
// };

// pageMinusTwo.addEventListener('click', changeCurrentPage);
// pageMinusOne.addEventListener('click', changeCurrentPage);
// pagePlusOne.addEventListener('click', changeCurrentPage);
// pagePlusTwo.addEventListener('click', changeCurrentPage);
// right.addEventListener('click', increment);
// left.addEventListener('click', decrement);
// first.addEventListener('click', skipToFirst);
// last.addEventListener('click', skipToLast);
// search.addEventListener('click', listenerChanger);
// text.addEventListener('keyup', (event) => {
//   if (event.keyCode === 13) { listenerChanger() }
// });
