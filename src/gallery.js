const axios = require('axios').default;
const gallery = document.querySelector('.gallery');
let IDS;

async function fetchImages() {
    try {
      IDS = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=130c7a7ecd86dbb286ae26c3cdcca88c&language=en-US`)
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=130c7a7ecd86dbb286ae26c3cdcca88c`);
      console.log(res.data);
      buildTrending(res.data.results)
    return res.data;
  }
  catch (error) {
    return console.log("fail");
  }
}

let trendingMovies = fetchImages();

function buildTrending(resp) {
    console.log(IDS.data.genres);
    const markup = resp.map(variable => {
        let genreName = "";
        let movieName = "";
        let movieDate = "";
        
        IDS.data.genres.forEach(element => {
            let currentID = Object.values(element)[0];
            if (variable.genre_ids.includes(currentID))
            {
                genreName += Object.values(element)[1] +", "
                console.log(genreName);
            }
        });
        genreName = genreName.slice(0, genreName.length - 2);
        if ('title' in variable)
        {
            movieName = variable.title;
            movieDate = variable.release_date.slice(0, 4);
        }
        else if ('name' in variable)
        {
            movieName = variable.name;
            movieDate = variable.first_air_date.slice(0, 4);
        }
            return `<div class="movie-card">
  <div class="movie-picture">
    <img src="${variable.poster_path}" alt="Greyhound poster">
  </div>
  <div class="movie-description">
    <div class="movie-title">
      ${movieName}
    </div>
    <div class="movie-genre">
      ${genreName} | ${movieDate}
    </div>
  </div>
</div> `
        })
            .join('');
        gallery.innerHTML += markup;
}

console.log(trendingMovies);