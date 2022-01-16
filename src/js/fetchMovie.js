const api = {
  baseUrl: 'https://api.themoviedb.org',
  apiKey: '130c7a7ecd86dbb286ae26c3cdcca88c',
};

// const fetchMovieData = async () => {
//   const movieCard = document.querySelector('.movie-card');
//   const movieCards = document.querySelectorAll('.movie-card');
//   let movieCardsTable = [];

//   movieCards.forEach(card => {
//     //console.log(card.getAttribute('data-id'));
//     movieCardsTable.push(card.getAttribute('data-id'));
//   })

//   //console.log(movieCardsTable);

//   let movieID = movieCard.getAttribute('data-id');

//   //console.log(movieCard)

//   const response = await fetch(
//     `${api.baseUrl}/3/movie/${movieCardsTable[1]}?api_key=${api.apiKey}&language=en-US`,
//   );
//   const jsonData = await response.json();
//     //console.log(jsonData);
//   return jsonData;
// };

async function fetchMovieData(movieId) {

  const response = await fetch(
    `${api.baseUrl}/3/movie/${movieId}?api_key=${api.apiKey}&language=en-US`
  );
  const jsonData = await response.json();
  return jsonData;
}

//fetchMovieData();

export { fetchMovieData };
