const ApiKey = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BaseUrl = 'https://api.themoviedb.org/3';
const ApiUrl = BaseUrl + '/discover/movie?sort_by=popularity.desc&'+ApiKey;
const ImgUrl = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchUrl = BaseUrl + '/search/movie?' + ApiKey; 

const getMovies = async (url) => {
    const res = await axios.get(url);
    showMovies(res.data.results);
}

getMovies(ApiUrl);

const showMovies = (data) => {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${ImgUrl+poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>    
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        
        `
        main.appendChild(movieEl)
    })
    
}
    const getColor = (vote) => {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchUrl + '&query=' + searchTerm);
    }else{
        getMovies(ApiUrl)
    }
})