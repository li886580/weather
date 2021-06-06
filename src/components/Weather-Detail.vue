<template>
  <div class="content">
    <a class="back">
      <img src="../assets/icon/back.svg">
    </a>
    <div class="information">
      <div class="citySelect">
        <a class="city" v-on:click="isSelectCity = !isSelectCity">{{this.$store.state.city.cityName}}</a>
        <div class="option" v-if="isSelectCity">
          <li v-on:click="isSelectCity = !isSelectCity, citySelect(city)" v-for="city in this.$store.state.citys" :key= city.id>{{city.cityName}}</li>
        </div>
      </div>

      <div class="weatherData">
        <div class="weatherData__Status">
          <img v-bind:src="weather.icon">
          <p>{{weather.wxName}}</p>
        </div>
        <div class="weatherData__Detail">
          <li class="temperature">
            <div class="listTitle">
              <img src="../assets/icon/wi-thermometer.svg">
            </div>
            <div class="listContent">
              <p>{{temperature}}</p>
            </div>
          </li>
          <li class="humidity">
            <div class="listTitle">
              <img src="../assets/icon/wi-humidity.svg">
            </div>
            <div class="listContent">
              <p>{{humidity}}</p>
            </div>
          </li>
          <li class="star">
            <div class="listTitle">
              <img src="../assets/icon/wi-stars.svg">
            </div>
            <div class="listContent">
              <p>{{special}}</p>
            </div>
          </li>
          <li class="moon">
            <div class="listTitle">
              <p>月像</p>
            </div>
            <div class="listContent">
              <p>{{moonPhase}}</p>
            </div>
            </li>
        </div>
      </div>
    </div>
    <div class="dayList">
      <div class="switchDay">
        <a class="lastDay" v-on:click="lastDay()">
          <img src="../assets/icon/up-arrow.svg">
        </a>
        <div class="date">
          <a class="year">
            <p>{{this.$store.state.time.selectDate.year}}</p>
          </a>
          <a class="month">
            <p>{{this.$store.state.time.selectDate.month}}月</p>
          </a>
          <p class="day">{{this.$store.state.time.selectDate.day}}日</p>
        </div>
        <a class="nextDay" v-on:click="nextDay()">
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
export default {
  data() {
    return {
      isSelectCity: false,
      weather: {wxId: '', wxName: '', icon: require('../assets/icon/blank.svg')},
      temperature: null,
      humidity: null,
      special: '',
      moonPhase: '',
    }
  },

  methods: {
    citySelect(city){ //選擇城市
      this.$store.state.city = city
    },


    lastDay(){
      let formatDate = this.dayjs(this.$store.state.time.selectDate.year + '-' + this.$store.state.time.selectDate.month + '-' + this.$store.state.time.selectDate.day).format('YYYY-MM-DD') //格式化時間
      if(formatDate <= this.dayjs().format('YYYY-MM-DD')){
        return
      }
      else{
        formatDate = this.dayjs(formatDate).subtract(1, 'day')
        this.$store.state.time.selectDate.year = this.dayjs(formatDate).year()
        this.$store.state.time.selectDate.month = this.dayjs(formatDate).month()+1
        this.$store.state.time.selectDate.day = this.dayjs(formatDate).date()
      }
    },
    nextDay(){
      let formatDate = this.dayjs(this.$store.state.time.selectDate.year + '-' + this.$store.state.time.selectDate.month + '-' + this.$store.state.time.selectDate.day).format('YYYY-MM-DD') //格式化時間
      formatDate = this.dayjs(formatDate).add(1, 'day')
      this.$store.state.time.selectDate.year = this.dayjs(formatDate).year()
      this.$store.state.time.selectDate.month = this.dayjs(formatDate).month()+1
      this.$store.state.time.selectDate.day = this.dayjs(formatDate).date()
    },


    getSelectDayWeather(){ //填上天氣、溫度、降雨機率
      let formatDate = this.dayjs(this.$store.state.time.selectDate.year + '-' + this.$store.state.time.selectDate.month + '-' + this.$store.state.time.selectDate.day).format('YYYY-MM-DD') //格式化時間

      let findSelectDay1 = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time.map(function (item){
        return item.startTime
      }).indexOf(formatDate + " 06:00:00")

      let findSelectDay2 = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time.map(function (item){
        return item.startTime
      }).indexOf(formatDate + " 18:00:00")

      if(findSelectDay1 !== -1){
        this.weather.wxId = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[findSelectDay1].elementValue[1].value
        this.weather.wxName = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[findSelectDay1].elementValue[0].value
        this.temperature = this.$store.state.info[this.$store.state.city.id].weatherElement[1].time[findSelectDay1].elementValue[0].value + "˚"
        if(this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[findSelectDay1].elementValue[0].value !== " "){ //下雨機率只有3天的資料，所以要多這個判斷
        this.humidity = this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[findSelectDay1].elementValue[0].value + "%"
        }
        else{
          this.humidity = "無資料"
        }
        console.log(this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[findSelectDay1].elementValue[0].value)
      }
      else if(findSelectDay2 !== -1){
        this.weather.wxId = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[findSelectDay2].elementValue[1].value
        this.weather.wxName = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[findSelectDay2].elementValue[0].value
        this.temperature = this.$store.state.info[this.$store.state.city.id].weatherElement[1].time[findSelectDay2].elementValue[0].value + "˚"
        if(this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[findSelectDay1].elementValue[0].value !== " "){//下雨機率只有3天的資料，所以要多這個判斷
        this.humidity = this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[findSelectDay2].elementValue[0].value + "%"
        }
        else{
          this.humidity = "無資料"
        }
      }
      else{
        this.weather.wxId = ""
        this.weather.wxName = "無資料"
        this.temperature = "無資料"
        this.humidity = "無資料"
      }
      if(this.weather.wxId !== ""){ //取得天氣icon
      this.weather.icon = require('../assets/icon/weatherIcon/' + this.weather.wxId + '.svg')
      }
      else{
        this.weather.icon = require('../assets/icon/blank.svg')
      }
    },
    getSelectDaySpecial(){ //取得星象
      let formatDate = this.dayjs(this.$store.state.time.selectDate.year + '-' + this.$store.state.time.selectDate.month + '-' + this.$store.state.time.selectDate.day).format('YYYY-MM-DD') //格式化時間

      let findSpecial = this.$store.state.star.map(function (item){
        return item.date
      }).indexOf(formatDate)
      if(this.$store.state.star[findSpecial].s !== ""){
        this.special = this.$store.state.star[findSpecial].s
      }
      else{
        this.special = "無特殊星象"
      }
    },
    getSelectDayMoonPhase(){ //取得月象
      if(this.special.indexOf("朔") !== -1){
        this.moonPhase = "朔月"
      }
      else if(this.special.indexOf("望") !== -1){
        this.moonPhase = "滿月"
      }
      else{
        this.moonPhase = "無特殊月象"
      }
    }
  },
  beforeUpdate(){
    this.getSelectDayWeather()
    this.getSelectDaySpecial()
    this.getSelectDayMoonPhase()
  }
}
</script>
<style scope>
  @import './Weather-Detail.css';
</style>