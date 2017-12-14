<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store/index.js'

export default {
  name: 'app',
}
</script>

<style>
:root{
  --font-size-base: 20px;
  --line-height-base: 1.2;
  color: #fefeef;
  background: rgb(34, 34, 34);
  font-size: 20px;
  line-height: 1.2;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
*, *::after, *::before{
  box-sizing: inherit;
}
body{
  font-family: 'Roboto', sans-serif;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fefeef;
  height: 100%;
  line-height: 1.2;
}
#app {
  text-align: center;
}

h1{
  font-size: 1.667rem;
  margin: .6rem auto 1.2rem;
}
</style>
