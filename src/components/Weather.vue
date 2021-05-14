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
        <div class="temperature-humidity">
          <img class="temperature" src="../assets/icon/wi-thermometer.svg">
          <p class="temperature">22˚</p>
          <img class="humidity" src="../assets/icon/wi-humidity.svg">
          <p class="humidity">30%</p>
        </div>
      </div>
      <p class="time">07：01</p>
    </div>
    <div class="dayList">
      <div class="switchMonth">
        <img class="lastMonth" src="../assets/icon/left-arrow.svg">
        <p class="yearAndMonth">2021 4月</p>
        <img class="nextMonth" src="../assets/icon/right-arrow.svg">
      </div>
      <div class="monthlyCalendar"></div>
    </div>
  </div>
</template>
<script>

</script>
<style scope>
  @import './Weather.css';
</style>