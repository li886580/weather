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
      <p class="time">{{time.nowTime}}</p>
    </div>
    <div class="dayList">
      <div class="switchMonth">
        <a v-on:click="lastMonth()">
          <img class="lastMonth" src="../assets/icon/left-arrow.svg">
        </a>
        <div class="date">
          <a class="year">
            <p>{{time.year}}</p>
          </a>
          <a class="month">
            <p>{{time.month}}月</p>
          </a>
        </div>
        <a v-on:click="nextMonth()">
          <img class="nextMonth" src="../assets/icon/right-arrow.svg">
        </a>
      </div>
      <div class="monthlyCalendar">
        <div class="week">
          <div class="week__day">
            <p>日</p>
          </div>
          <div class="week__day">
            <p>一</p>
          </div>
          <div class="week__day">
            <p>二</p>
          </div>
          <div class="week__day">
            <p>三</p>
          </div>
          <div class="week__day">
            <p>四</p>
          </div>
          <div class="week__day">
            <p>五</p>
          </div>
          <div class="week__day">
            <p>六</p>
          </div>
        </div>
        <div class="lattice-group">
          <a class="lattice" v-for="lattice in lattices" :key="lattice.id" v-on:click="clickDay(lattice.id)">
            <p class="day" v-bind:class="{active: lattice.isActive}">{{lattice.day}}</p>
            <img v-bind:src="lattice.weather" class="weather-day" v-on:error.once="moveErrorImg">
            <img src="" class="special-day">
            <img src="" class="moonPhase-day">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelectCity: false,
      city: {id: 7, cityName: "高雄市"},
      time: {
        nowTime: '',
        year: null,
        month: null,
        date: null,
      },
      info: null,
      weather: {wxId: '', wxName: ''},
      temperature: '',
      humidity: null,
      weatherIconPath: '',
      citys: [{id: 0, cityName: "新竹縣"}, {id: 1, cityName: "金門縣"}, {id: 2, cityName: "苗栗縣"}, {id: 3, cityName: "新北市"}, {id: 4, cityName: "宜蘭縣"}, {id: 5, cityName: "雲林縣"}, {id: 6, cityName: "臺南市"}, {id: 7, cityName: "高雄市"}, {id: 8, cityName: "彰化縣"}, {id: 9, cityName: "臺北市"}, {id: 10, cityName: "南投縣"}, {id: 11, cityName: "澎湖縣"}, {id: 12, cityName: "基隆市"}, {id: 13, cityName: "桃園市"}, {id: 14, cityName: "花蓮縣"}, {id: 15, cityName: "連江縣"}, {id: 16, cityName: "臺東縣"}, {id: 17, cityName: "嘉義市"}, {id: 18, cityName: "嘉義縣"}, {id: 19, cityName: "屏東縣"}, {id: 20, cityName: "臺中市"}, {id: 21, cityName: "新竹市"}],

      lattices: [{id: 0, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 1, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 2, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 3, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 4, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 5, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 6, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 7, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 8, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 9, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 10, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 11, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 12, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 13, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 14, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 15, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 16, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 17, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 18, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 19, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 20, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 21, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 22, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 23, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 24, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 25, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 26, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 27, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 28, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 29, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 30, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 31, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 32, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 33, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 34, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 35, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 36, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 37, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 38, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 39, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 40, day: null, weather: '', special: '', moonPhase: '', isActive: false}, {id: 41, day: null, weather: '', special: '', moonPhase: '', isActive: false},]
    }
  },

  methods: {
    timeFormat(timeStamp) { //得到當下時分秒
      let newdate = new Date(timeStamp);
      let hh = newdate.getHours() < 10? "0" + newdate.getHours(): newdate.getHours();
      let mm = newdate.getMinutes() < 10? "0" + newdate.getMinutes(): newdate.getMinutes();
      this.time.nowTime = hh + "：" + mm;
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
      this.time.year = year;
      this.time.month = month;
      this.time.date = date
    },
    nowTimesDate(){ //定時器函數-年月日
      let self = this;
      self.timeFormatDate(new Date());
    },


    lastMonth(){ //前往上個月
      if(this.time.year === this.dayjs().year() && this.time.month === this.dayjs().month()+1){
        return
      }
      else{
        if(this.time.month == 1){
          this.time.year -= 1
          this.time.month = 12
        }
        else{
        this.time.month -= 1
        }
        this.getDay()
      }
    },
    nextMonth(){ //前往下個月
      if(this.time.month == 12){
        this.time.year += 1
        this.time.month = 1
      }
      else{
        this.time.month += 1
      }
      this.getDay()
    },


    citySelect(city){ //選擇城市
      this.city = city
      this.weather.wxId = this.info[this.city.id].weatherElement[6].time[0].elementValue[1].value
      this.weather.wxName = this.info[this.city.id].weatherElement[6].time[0].elementValue[0].value
      this.temperature = this.info[this.city.id].weatherElement[1].time[0].elementValue[0].value
      this.humidity = this.info[this.city.id].weatherElement[0].time[0].elementValue[0].value
    },


    clickDay(id){ //點擊某一天
      console.log(id)
    },
    
    
    getDay(){ //取得月曆的上的日期
      const firstDay = this.dayjs(this.time.year + '-' + this.time.month + '-01').day() //取得月份第一天是星期幾
      const days = this.dayjs(this.time.year + '-' + this.time.month).daysInMonth() //取得月份有幾天
      const lastMonthDays = this.dayjs(this.time.month == 1 ? this.time.year-1 + '-12' : this.time.year + '-' + (this.time.month-1)).daysInMonth() //取得上個月有幾天
      console.log(firstDay, days, lastMonthDays)
      
      
      for(var i = 1; i <= days; i++){ //把本月日期填上
        var findThisMonth = this.lattices.find(function(item){
          return item.id === firstDay+i-1
        })
        findThisMonth.day = i
        findThisMonth.isActive = true
      }
      for(var j = 1; j <= 42-findThisMonth.id-1; j++){ //把次月日期填上
        var findNextMonth = this.lattices.find(function(item){
          return item.id === firstDay+i+j-2
        })
        findNextMonth.day = j
        findNextMonth.isActive = false
      }
      for(var x = 1; x <= 42-i-j+2; x++){ //把上月日期填入
        var findLastMonth = this.lattices.find(function(item){
          return item.id === firstDay-x
        })
        findLastMonth.day = lastMonthDays-x+1
        findLastMonth.isActive = false
      }
        this.getDayWeather()
    },
    getDayWeather(){ //取得月曆上天氣的icon
        if(this.time.year === this.dayjs().year() && this.time.month === this.dayjs().month()+1){
          for(var y = 0; y <= 6; y++){
            let timeDate = this.time.date
            var findThisWeek = this.lattices.find(function(item){
              return item.day === timeDate+y
            })
            findThisWeek.weather = require('../assets/icon/weatherIcon/' + this.info[this.city.id].weatherElement[6].time[y*2].elementValue[1].value + '.svg')
          }
        }
        else{
          for(var z = 0; z <= 41; z++){
            this.lattices[z].weather = ''
          }
        }
    },


    moveErrorImg(event){ //破圖處理
      event.currentTarget.src = require('../assets/icon/blank.svg');
      return true;
    },

    // blackImg(lattice){
    //   lattice.weather = require('../assets/icon/blank.svg')
    // }


  },

  computed: {
    
  },

  created: function(){ //創建完成時
    this.nowTimes();
    this.nowTimesDate();
    this.$axios
      .get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-E6B72E01-C0C6-4326-A1F1-7872CE97019F')
      .then(response => { //接完API後要做的事
        this.info = response.data.records.locations[0].location
        this.weather.wxId = this.info[this.city.id].weatherElement[6].time[0].elementValue[1].value
        this.weather.wxName = this.info[this.city.id].weatherElement[6].time[0].elementValue[0].value
        this.temperature = this.info[this.city.id].weatherElement[1].time[0].elementValue[0].value
        this.humidity = this.info[this.city.id].weatherElement[0].time[0].elementValue[0].value
        this.weatherIconPath = require('../assets/icon/weatherIcon/' + this.weather.wxId + '.svg') //接完API再把資料寫入DATA，否則一開始Data取不到資料
        this.getDay()
        })
      .catch(function (error) { // 請求失敗處理
        console.log(error);
      });
      console.log(this.time.month)
  },
  mounted(){ //掛載完成時
    this.nowTimes();
    this.nowTimesDate();
  },
  updated(){
  }
  
}
</script>

<style scope>
  @import './Weather.css';
</style>