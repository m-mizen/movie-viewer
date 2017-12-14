<template>
  <div class="app-index">

    <movie-list>Popular Movies</movie-list>

  </div>
</template>

<script>
import store from '@/store/index.js'
import MovieList from '@/components/MovieList'

export default {
  name: 'IndexComponent',
  data(){
    return {
      'sharedState': store.state
    }
  },
  components: {
    'movie-list': MovieList,
  },
}
</script>