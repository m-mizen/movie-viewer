<template>
  <section class="movie-list">
    <h1><slot>Default Title</slot></h1>
    <div class="scroll-wrap" ref="scroll-wrap">
      <ol :style="`width: ${(popularMovies.length + 2) * 15}rem;transform: translateX(${this.currentCard * -15}rem);`">
        <li v-for="(movie, index) in popularMovies" :key="movie.id" @click="scrollToItem(index)">
          <movie-card 
            :movie="movie" 
            :current="index===currentCard"
          ></movie-card>
        </li>
        <li class="load-more">
          <a 
            href='#more'
            class="load-more-button" 
            @click.prevent="loadMovies" 
            :disabled="loading">
            <div class="load-more-inner">
              <span class="load-more-text">Load More</span>
            </div>
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>

import store from '@/store/index.js'
import MovieCard from '@/components/MovieCard'
import lodash from 'lodash'

export default {
  name: 'MovieList',
  props: ['title'],
  components: {
    'movie-card': MovieCard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sharedState: store.state,
      loading: false,
      page: 1,
      currentCard: 0,
      popularMovies: [],
    }
  },
  mounted(){
    this.loadMovies()
    this.$el.addEventListener('wheel', _.throttle(this.scrollCallback, 100));
  },
  methods:{
    async loadMovies(){
      // console.log(this.sharedState.movies, this.page);

      if (this.loading) return;

      this.loading = true;
      try {
        const apiResp = await fetch(`${this.sharedState.apiBase}/discover/movie?sort_by=popularity.desc&page=${this.page}&api_key=${this.sharedState.apiKey}`)
        this.page++

        const apiData = await apiResp.json()

        store.addMovies(apiData.results)

        this.loading = false
        this.popularMovies = _.orderBy(this.sharedState.movies, ['popularity'], ['desc'])
        // this.popularMovies = this.sharedState.movies
      } catch (err){
        console.log(err)
      }
    },
    scrollToItem(n){
      this.currentCard = n
    },
    scrollCallback(e){
      console.log(e)
      if(e.deltaY > 1 && this.currentCard < this.popularMovies.length - 1){
        this.currentCard++
      } else if (e.deltaY < -1 && this.currentCard > 0){
        this.currentCard--
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-list{
  margin: auto;
}
.scroll-wrap{
  width: 45rem;
  max-width: 100%;
  margin: auto;
}
ol{
  transition: transform 0.5s;
  list-style: none;
  position: relative;
  display: block;
}
ol::after{
  content: '';
  display: table;
  clear: both;
}
li{
  width: 15rem;
  float: left;
}
li.load-more{
  width: 30rem;
  padding: 0 .5rem;
}

.load-more-button{
  display: block;
  border: 2px solid #fff;
  border-radius: 4px;
  position: relative;
}
.load-more-button::after{
  content: '';
  padding-bottom: 75%;
  display: block;
}
.load-more-inner{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
