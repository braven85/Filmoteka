const api = {
  baseUrl: 'https://api.themoviedb.org',
  apiKey: '130c7a7ecd86dbb286ae26c3cdcca88c',
};


async function fetchMovieData(movieId) {

  const response = await fetch(
    `${api.baseUrl}/3/movie/${movieId}?api_key=${api.apiKey}&language=en-US`
  );
  const jsonData = await response.json();
  return jsonData;
}


export { fetchMovieData };
