<template>
  <section class="movie-card" :class="{ current: current }">

    <div class="img-wrap">
      <img :src="posterUrl" alt="Movie poster">
    </div>

    <transition name="fade">
      <div v-if="current" class="movie-information">
        <div class="movie-information-inner">
          <div class="movie-title" :style="`background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),url(${backDropUrl});`">
            <h1>{{ movie.title }} <span class="movie-release-date">({{ movie['release_date'].split('-')[0] }})</span></h1>
          </div>
          <div class="movie-overview">{{ movie.overview }}</div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script>
import store from '@/store/index.js'

export default {
  name: 'MovieCard',
  props: ['movie', 'current'],
  data () {
    return {
      sharedState: store.state,
    }
  },
  computed:{
    posterUrl(){
      return this.sharedState.posterUrl + '/' + this.sharedState.posterSizes[3] + '/'+ this.movie['poster_path'];
    },
    backDropUrl(){
      return this.sharedState.posterUrl + '/' + this.sharedState.posterSizes[3] + '/'+ this.movie['backdrop_path'];
    }
  },
}
</script>

<style scoped>
section{
  padding: 0 .5rem .6rem;
  position: relative;
  width: 100%;
}
.movie-title{
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  padding: 24% 1rem .6rem;
}
h1{
  font-size: 1.66667rem;
  line-height: 1.2;
}
.movie-release-date{
  font-size: .6em;
  vertical-align: middle;
}
.movie-overview{
  clear: both;
  padding: .6rem 1rem 2.4rem;
}

.movie-information{
  position: absolute;
  left: 0%;
  right: -200%;
  top: 100%;
  text-align: left;
  padding: 0 .5rem;
}
.movie-information-inner{
  background-color: #000;
}

img{
  user-select: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
}

.img-wrap{
  cursor: pointer;
  transform-origin: bottom;
  transform: scale(0.9);
  filter: brightness(.65);
  transition: transform 0.5s, filter 0.3s, border-color 0.3s;
}
.img-wrap::after{
  content: '';
  display: block;
  padding-bottom: 150%;
}

.current .img-wrap{
  filter: brightness(1);
  transform: scale(1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .21s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
