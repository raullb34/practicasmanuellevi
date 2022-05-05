<template>
  <div id='app'>
    <countdown time="50" />
  </div>
</template>

<script>
import countdown from './components/countdown'
export default {
  name: 'App',
  components: {
    countdown
  }
}
</script>

<style>
body{
  padding: 20px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
  padding: 20px;
}
</style>
