const left = document.querySelector('.pagination_left');
const hidingFirst = document.querySelector('.pagination_hider-first');
const hidingLast = document.querySelector('.pagination_hider-last');
const first = document.querySelector('.pagination_first-page');
const pageMinusTwo = document.querySelector('.pagination_less-two');
const pageMinusOne = document.querySelector('.pagination_less-one');
const current = document.querySelector('.pagination_current-page');
const pagePlusOne = document.querySelector('.pagination_more-one');
const pagePlusTwo = document.querySelector('.pagination_more-two');
const last = document.querySelector('.pagination_last-page');
const right = document.querySelector('.pagination_right');

pageMinusTwo.value = -2;
pageMinusOne.value = -1;
pagePlusOne.value = 1;
pagePlusTwo.value = 2;
right.value = 1;
left.value = -1;

const conditionalHide = (e) => {
  if (current.textContent === '1') {
    left.disabled = true;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'hidden';
    pageMinusOne.disabled = true;
    pageMinusTwo.style.visibility = 'hidden';
    pageMinusTwo.disabled = true;
  } else if (current.textContent === '2') {
    left.disabled = false;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'hidden';
    pageMinusTwo.disabled = true;
  } else if (current.textContent === '3') {
    left.disabled = false;
    first.style.visibility = 'hidden';
    first.disabled = true;
    hidingFirst.style.visibility = 'hidden';
    hidingFirst.disabled = true;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'visible';
    pageMinusTwo.disabled = false;
  } else {
    left.disabled = false;
    first.style.visibility = 'visible';
    first.disabled = false;
    hidingFirst.style.visibility = 'visible';
    hidingFirst.disabled = false;
    pageMinusOne.style.visibility = 'visible';
    pageMinusOne.disabled = false;
    pageMinusTwo.style.visibility = 'visible';
    pageMinusTwo.disabled = false;
  }

  if (Number(current.textContent) === Number(last.textContent)) {
    right.disabled = true;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'hidden';
    pagePlusOne.disabled = true;
    pagePlusTwo.style.visibility = 'hidden';
    pagePlusTwo.disabled = true;
  } else if (Number(current.textContent) === Number(last.textContent) - 1) {
    right.disabled = false;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'hidden';
    pagePlusTwo.disabled = true;
  } else if (Number(current.textContent) === Number(last.textContent) - 2) {
    right.disabled = false;
    last.style.visibility = 'hidden';
    last.disabled = true;
    hidingLast.style.visibility = 'hidden';
    hidingLast.disabled = true;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'visible';
    pagePlusTwo.disabled = false;
  } else {
    right.disabled = false;
    last.style.visibility = 'visible';
    last.disabled = false;
    hidingLast.style.visibility = 'visible';
    hidingLast.disabled = false;
    pagePlusOne.style.visibility = 'visible';
    pagePlusOne.disabled = false;
    pagePlusTwo.style.visibility = 'visible';
    pagePlusTwo.disabled = false;
  }
};
conditionalHide();
const pagesCorection = (e) => {
  pageMinusTwo.textContent = Number(current.textContent) - 2;
  pageMinusOne.textContent = Number(current.textContent) - 1;
  pagePlusOne.textContent = Number(current.textContent) + 1;
  pagePlusTwo.textContent = Number(current.textContent) + 2;
};
const changeCurrentPage = (e) => {
  e.preventDefault();
  current.textContent = e.currentTarget.textContent;
  console.log(current.value);

  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(e.currentTarget.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(e.currentTarget.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(e.currentTarget.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(e.currentTarget.value);
  conditionalHide();
};

const skipToFirst = (e) => {
  e.preventDefault();
  changeCurrentPage(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pageMinusOne.style.visibility = 'hidden';
  pageMinusOne.disabled = true;
  pageMinusTwo.style.visibility = 'hidden';
  pageMinusTwo.disabled = true;
  conditionalHide();
  pagesCorection();
};

const skipToLast = (e) => {
  e.preventDefault();
  changeCurrentPage(e);
  e.currentTarget.style.visibility = 'hidden';
  e.currentTarget.disabled = true;
  pagePlusOne.style.visibility = 'hidden';
  pagePlusOne.disabled = true;
  pagePlusTwo.style.visibility = 'hidden';
  pagePlusTwo.disabled = true;
  conditionalHide();
  pagesCorection();
};

const increment = (e) => {
  e.preventDefault();
  current.textContent = Number(current.textContent) + Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) + Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) + Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) + Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) + Number(right.value);
  conditionalHide();
};

const decrement = (e) => {
  e.preventDefault();

  current.textContent = Number(current.textContent) - Number(right.value);
  pageMinusTwo.textContent = Number(pageMinusTwo.textContent) - Number(right.value);
  pageMinusOne.textContent = Number(pageMinusOne.textContent) - Number(right.value);
  pagePlusOne.textContent = Number(pagePlusOne.textContent) - Number(right.value);
  pagePlusTwo.textContent = Number(pagePlusTwo.textContent) - Number(right.value);
  conditionalHide();
};

pageMinusTwo.addEventListener('click', changeCurrentPage);
pageMinusOne.addEventListener('click', changeCurrentPage);
pagePlusOne.addEventListener('click', changeCurrentPage);
pagePlusTwo.addEventListener('click', changeCurrentPage);
right.addEventListener('click', increment);
left.addEventListener('click', decrement);
first.addEventListener('click', skipToFirst);
last.addEventListener('click', skipToLast);
