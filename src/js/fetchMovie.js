const api = {
  baseUrl: 'https://api.themoviedb.org',
  apiKey: '130c7a7ecd86dbb286ae26c3cdcca88c',
};

const fetchMovieData = async () => {
  const response = await fetch(
    `${api.baseUrl}/3/movie/157336?api_key=${api.apiKey}&language=en-US`,
  );
  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
};

export { fetchMovieData };
