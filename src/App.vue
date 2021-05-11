<template>
  <div class="backgroundImage">
    <Weather/>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    Weather
  }
}
</script>
<style>
  @import '../src/assets/css/vendors/CSS Reset.css';
  html,body{
    height: 100%;
    width: 100%;
  }
  .backgroundImage{
    display: flex;
    align-items: center;
    padding: 40px;
    background-color: gray;
    height: 100%;
    min-width: 768px;
    box-sizing: border-box;
    
  }
</style>
