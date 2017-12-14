const store = {
  debug: true,
  state: {
    saved: false,
    //http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg
    apiKey: 'a3cd6916474b85de15327feede9f3d30',
    apiBase: 'https://api.themoviedb.org/3',
    apiBase4: 'https://api.themoviedb.org/4',
    posterUrl: 'http://image.tmdb.org/t/p/',
    posterSizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    movies: {}
  },
  saveState() {
    if (window.localStorage) {
      window.localStorage.setItem('movieData', JSON.stringify(this.state));
      this.state.saved = true;
    }
  },
  getState() {
    const movieJson = window.localStorage.getItem('movieData');
    if (!movieJson) {
      return;
    }
    const movieData = JSON.parse(movieJson);
    if (!movieData) {
      return;
    }
    this.state = movieData;
  },
  addMovie(data) {
    if (!data || !data.id) {
      // console.log('error adding movie: ', data)
      return;
    }
    this.state.movies[data.id] = data;
  },
  addMovies(dataSet) {
    dataSet.forEach(movieData => {
      this.addMovie(movieData)
    });
    console.log(this.state.movies)
  }
}

window.AppStore = store;

export default store;