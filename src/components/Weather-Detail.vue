<template>
  <div class="content">
    <div class="information">
      <div class="city">
        <p>高雄市</p>
      </div>
      <div class="weatherData">
        <div class="weatherData__Status">
          <img src="" alt="">
          <p>晴午後多雲局部短暫陣雨或雷雨</p>
        </div>
        <div class="weatherData__Detail">
          <li class="morningTemperature"></li>
          <li class="nightTemperature"></li>
          <li class="humidity"></li>
          <li class="star"></li>
          <li class="moon"></li>
        </div>
      </div>
    </div>
    <div class="dayList">
      <div class="switchMonth">
        <img class="lastMonth" src="../assets/icon/left-arrow.svg">
        <p class="yearAndMonth">2021 4月</p>
        <img class="nextMonth" src="../assets/icon/right-arrow.svg">
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scope>
  @import './Weather-Detail.css';
</style>