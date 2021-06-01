<template>
  <div class="content">
    <div class="information">

      <div class="citySelect">
        <a class="city" v-on:click="isSelectCity = !isSelectCity">{{city.cityName}}</a>
        <div class="option" v-if="isSelectCity">
          <li v-on:click="isSelectCity= !isSelectCity, citySelect(city)" v-for="city in citys" :key= city.id>{{city.cityName}}</li>
        </div>
      </div>
      
      <div class="weatherData">
        <div class="weatherData__Status">
          <img v-bind:src = "weatherIconPath">
          <p>{{weather.wxName}}</p>
        </div>
        <div class="temperature-humidity">
          <img class="temperature" src="../assets/icon/wi-thermometer.svg">
          <p class="temperature">{{temperature}}°</p>
          <img class="humidity" src="../assets/icon/wi-humidity.svg">
          <p class="humidity">{{humidity}}%</p>
        </div>
      </div>
      <p class="time">{{nowTime}}</p>
    </div>
    <div class="dayList">
      <div class="switchMonth">
        <a v-on:click="lastMonth()">
          <img class="lastMonth" src="../assets/icon/left-arrow.svg">
        </a>
        <div class="date">
          <a class="year">
            <p>{{year}}</p>
          </a>
          <a class="month">
            <p>{{month}}月</p>
          </a>
        </div>
        <a v-on:click="nextMonth()">
          <img class="nextMonth" src="../assets/icon/right-arrow.svg">
        </a>
      </div>
      <div class="monthlyCalendar"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelectCity: false,
      city: {"id":7 ,"cityName": "高雄市"},
      nowTime: '',
      year: null,
      month: null,
      date: null,
      info: null,
      weather: {'wxId': '01', 'wxName': ''},
      temperature: '',
      humidity: null,
      number: '01',
      weatherIconPath: require('../assets/icon/weatherIcon/' + this.number + '.svg'),
      citys: [{"id": 0, "cityName": "新竹縣"}, {"id": 1, "cityName": "金門縣"}, {"id": 2, "cityName": "苗栗縣"}, {"id": 3, "cityName": "新北市"}, {"id": 4, "cityName": "宜蘭縣"}, {"id": 5, "cityName": "雲林縣"}, {"id": 6, "cityName": "臺南市"}, {"id": 7, "cityName": "高雄市"}, {"id": 8, "cityName": "彰化縣"}, {"id": 9, "cityName": "臺北市"}, {"id": 10, "cityName": "南投縣"}, {"id": 11, "cityName": "澎湖縣"}, {"id": 12, "cityName": "基隆市"}, {"id": 13, "cityName": "桃園市"}, {"id": 14, "cityName": "花蓮縣"}, {"id": 15, "cityName": "連江縣"}, {"id": 16, "cityName": "臺東縣"}, {"id": 17, "cityName": "嘉義市"}, {"id": 18, "cityName": "嘉義縣"}, {"id": 19, "cityName": "屏東縣"}, {"id": 20, "cityName": "臺中市"}, {"id": 21, "cityName": "新竹市"}]
    }
  },

  methods: {
    timeFormat(timeStamp) { //得到當下時分秒
      let newdate = new Date(timeStamp);
      let hh = newdate.getHours() < 10? "0" + newdate.getHours(): newdate.getHours();
      let mm = newdate.getMinutes() < 10? "0" + newdate.getMinutes(): newdate.getMinutes();
      this.nowTime = hh + "：" + mm;
    },
    nowTimes(){ //定時器函數-時分秒
      let self = this;
      self.timeFormat(new Date());
      setInterval(function(){
        self.timeFormat(new Date());
      }, 1000);
    },

    timeFormatDate(timeStamp) { //得到當下年月日
      let newdate = new Date(timeStamp);
      let year = newdate.getFullYear();
      let month = newdate.getMonth() + 1
      let date = newdate.getDate()
      this.year = year;
      this.month = month;
      this.date = date
    },
    nowTimesDate(){ //定時器函數-年月日
      let self = this;
      self.timeFormatDate(new Date());
    },


    lastMonth(){
      if(this.month == 1){
        this.year -= 1
        this.month = 12
      }
      else{
      this.month -= 1
      }
    },
    nextMonth(){
      if(this.month == 12){
        this.year += 1
        this.month = 1
      }
      else{
      this.month += 1
      }
    },


    citySelect(city){
      this.city = city
      this.weather.wxId = this.info[this.city.id].weatherElement[6].time[0].elementValue[1].value
      this.weather.wxName = this.info[this.city.id].weatherElement[6].time[0].elementValue[0].value
      this.temperature = this.info[this.city.id].weatherElement[1].time[0].elementValue[0].value
      this.humidity = this.info[this.city.id].weatherElement[0].time[0].elementValue[0].value
    },




  },
  
  computed() {
  },

  created() { //創建完成時
    this.nowTimes();
    this.nowTimesDate();
    // this.weatherIconPath = ''
    // console.log(this)

  },



  mounted(){ //掛載完成時
    this.nowTimes();
    this.nowTimesDate();

    this.$axios
      .get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-E6B72E01-C0C6-4326-A1F1-7872CE97019F')
      .then(response => (this.info = response.data.records.locations[0].location))
      .catch(function (error) { // 請求失敗處理
        console.log(error);
      });



  //   getUsers()
  //   async function getUsers() {
  //   try {
  //     const get = await axios.get('http://localhost:3000/users')
  //     const { data } = get // 資料在 data 屬性
  //     console.dir(get) // 回傳類似 RequestObject
  //     console.table(data)
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
    // this.weather.wxId = this.info[this.city.id].weatherElement[6].time[0].elementValue[1].value
    // this.weather.wxName = this.info[this.city.id].weatherElement[6].time[0].elementValue[0].value
    // this.temperature = this.info[this.city.id].weatherElement[1].time[0].elementValue[0].value
    // this.humidity = this.info[this.city.id].weatherElement[0].time[0].elementValue[0].value
    
    

  },

  
}
</script>

<style scope>
  @import './Weather.css';
</style>