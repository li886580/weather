<template>
  <div class="backgroundImage">
    <!-- <Weather/>
    <WeatherDetail/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Weather from './components/Weather'
// import WeatherDetail from './components/Weather-Detail'

export default {
  name: 'App',
  components: {
    // Weather,
    // WeatherDetail
  }
}
</script>
<style>
  @import '../src/assets/css/vendors/CSS Reset.css';
  @import './common/front/font.css';
  html,body{
    height: 100%;
    width: 100%;
  }
  .backgroundImage{
    display: flex;
    align-items: center;
    padding: 30px;
    height: 100%;
    min-width: 768px;
    box-sizing: border-box;
    background-image: url(./assets/IMG_2468.png);
    background-size: cover;
    position: relative;
    background-repeat: no-repeat;
  }
  .backgroundImage::before{ /* 處理背景圖片模糊不影響子層 */
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(50px);

  }
</style>
