const left = document.querySelector('.pagination_left');
const hiding = document.querySelector('.pagination_hiding-box');
const first = document.querySelector('.pagination_first-page');
const pageMinusTwo = document.querySelector('.pagination_page-less-two');
const pageMinusOne = document.querySelector('.pagination_page-less-one');
const current = document.querySelector('.pagination_current-page');
const pagePlusOne = document.querySelector('.pagination_page-more-one');
const pagePlusTwo = document.querySelector('.pagination_page-more-two');
const last = document.querySelector('.pagination_last-page');
const right = document.querySelector('.pagination_right');

pageMinusTwo.value = -2;
pageMinusOne.value = -1;
pagePlusOne.value = 1;
pagePlusTwo.value = 2;
right.value = 1;
left.value = -1;

const changeCurrentPage = (e) => {
  e.preventDefault();
  current.textContent = e.currentTarget.textContent;
  console.log(current.value);

  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(e.currentTarget.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(e.currentTarget.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(e.currentTarget.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(e.currentTarget.value);
};

const increment = (e) => {
  e.preventDefault();

  current.textContent = Number(current.textContent) + Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
};

const decrement=(e)=>{
  e.preventDefault();
  
  current.textContent = Number(current.textContent) - Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
  
}

pageMinusTwo.addEventListener('click', changeCurrentPage);
pageMinusOne.addEventListener('click', changeCurrentPage);
pagePlusOne.addEventListener('click', changeCurrentPage);
pagePlusTwo.addEventListener('click', changeCurrentPage);
right.addEventListener('click', increment);
left.addEventListener('click', decrement);
