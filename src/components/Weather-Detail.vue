<template>
  <div class="content">
    <a class="back">
      <img src="../assets/icon/back.svg">
    </a>
    <div class="information">
      <a class="city">
        <p>高雄市</p>
      </a>
      <div class="weatherData">
        <div class="weatherData__Status">
          <img v-bind:src="weatherIconPath">
          <p>晴午後多雲局部短暫陣雨或雷雨</p>
        </div>
        <div class="weatherData__Detail">
          <li class="morningTemperature">
            <div class="listTitle">
              <p>早</p>
              <img src="../assets/icon/wi-thermometer.svg">
            </div>
            <div class="listContent">
              <p>22˚~23˚</p>
            </div>
          </li>
          <li class="nightTemperature">
            <div class="listTitle">
              <p>晚</p>
              <img src="../assets/icon/wi-thermometer.svg">
            </div>
            <div class="listContent">
              <p>20˚~21˚</p>
            </div>
          </li>
          <li class="humidity">
            <div class="listTitle">
              <img src="../assets/icon/wi-humidity.svg">
            </div>
            <div class="listContent"></div>
          </li>
          <li class="star">
            <div class="listTitle">
              <img src="../assets/icon/wi-stars.svg">
            </div>
            <div class="listContent"></div>
          </li>
          <li class="moon">
            <div class="listTitle">
              <p>月像</p>
            </div>
            <div class="listContent"></div>
            </li>
        </div>
      </div>
    </div>
    <div class="dayList">
      <div class="switchDay">
        <a class="lastDay">
          <img src="../assets/icon/up-arrow.svg">
        </a>
        <div class="date">
          <a class="year">
            <p>2021</p>
          </a>
          <a class="month">
            <p>4月</p>
          </a>
          <p class="day">7日</p>
        </div>
        <a class="nextDay">
          <img src="../assets/icon/down-arrow.svg">
        </a>
      </div>
      <div class="sun-moon">
        <li class="sunrise">
          <img src="../assets/icon/wi-sunrise.svg">
          <p class="sunrise__time">06:00</p>
        </li>
        <li class="sunset">
          <img src="../assets/icon/wi-sunset.svg">
          <p class="sunset__time">17:00</p>
        </li>
        <li class="moonrise">
          <img src="../assets/icon/wi-moonrise.svg">
          <p class="moonrise__time">23:00</p>
        </li>
        <li class="moonset">
          <img src="../assets/icon/wi-moonset.svg">
          <p class="moonset__time">03:00</p>
        </li>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scope>
  @import './Weather-Detail.css';
</style>