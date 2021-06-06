<template>
  <div class="content">
    <div class="information">
      <div class="citySelect">
        <a class="city" v-on:click="isSelectCity = !isSelectCity">{{this.$store.state.city.cityName}}</a>
        <div class="option" v-if="isSelectCity">
          <li v-on:click="isSelectCity = !isSelectCity, citySelect(city)" v-for="city in this.$store.state.citys" :key= city.id>{{city.cityName}}</li>
        </div>
      </div>
      
      <div class="weatherData">
        <div class="weatherData__Status">
          <img v-bind:src = "weather.icon">
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
            <p>{{this.$store.state.time.year}}</p>
          </a>
          <a class="month">
            <p>{{this.$store.state.time.month}}月</p>
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
          <a class="lattice" v-for="lattice in lattices" :key="lattice.id" v-on:click="clickDay(lattice.date.year, lattice.date.month, lattice.date.day)">
            <p class="day" v-bind:class="{active: lattice.isActive}">{{lattice.date.day}}</p>
            <img v-bind:src="lattice.weather.icon" v-bind:title="lattice.weather.name" class="weather-day">
            <img v-bind:src="lattice.special.icon" v-bind:title="lattice.special.name" class="special-day">
            <img v-bind:src="lattice.moonPhase.icon" v-bind:title="lattice.moonPhase.name" class="moonPhase-day">
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
      // city: {id: 7, cityName: "高雄市"},
      time: {
        nowTime: '',
        // year: null,
        // month: null,
        date: null,
      },
      // info: null,
      weather: {wxId: '', wxName: '', icon: require('../assets/icon/blank.svg')},
      temperature: null,
      humidity: null,
      // citys: require('../../static/citys.json'),
      lattices: [{id: 0, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 1, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 2, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 3, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 4, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 5, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 6, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 7, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 8, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 9, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 10, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 11, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 12, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 13, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 14, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 15, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 16, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 17, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 18, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 19, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 20, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 21, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 22, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 23, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 24, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 25, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 26, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 27, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 28, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 29, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 30, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 31, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 32, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 33, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 34, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 35, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 36, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 37, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 38, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 39, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 40, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false}, {id: 41, date: {year: null, month: null, day: null}, weather: {name: '' ,icon: require('../assets/icon/blank.svg')}, special: {name: '' ,icon: require('../assets/icon/blank.svg')}, moonPhase: {name: '', icon: require('../assets/icon/blank.svg')}, isActive: false},],
      // star: require('../../static/star.json'),
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
      this.$store.state.time.year = year;
      this.$store.state.time.month = month;
      this.time.date = date
    },
    nowTimesDate(){ //定時器函數-年月日
      let self = this;
      self.timeFormatDate(new Date());
    },


    lastMonth(){ //前往上個月
      if(this.$store.state.time.year === this.dayjs().year() && this.$store.state.time.month === this.dayjs().month()+1){
        return
      }
      else{
        if(this.$store.state.time.month == 1){
          this.$store.state.time.year -= 1
          this.$store.state.time.month = 12
        }
        else{
        this.$store.state.time.month -= 1
        }
        // this.getDay()
      }
    },
    nextMonth(){ //前往下個月
      if(this.$store.state.time.month == 12){
        this.$store.state.time.year += 1
        this.$store.state.time.month = 1
      }
      else{
        this.$store.state.time.month += 1
      }
      // this.getDay()
    },


    citySelect(city){ //選擇城市
      // this.city = city
      this.$store.state.city = city
      // this.getDay()
    },
    getTodayWeather(){
      this.weather.wxId = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[0].elementValue[1].value
      this.weather.wxName = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[0].elementValue[0].value
      this.temperature = this.$store.state.info[this.$store.state.city.id].weatherElement[1].time[0].elementValue[0].value
      this.humidity = this.$store.state.info[this.$store.state.city.id].weatherElement[0].time[0].elementValue[0].value
    },


    clickDay(year, month, day){ //點擊某一天
      this.$store.state.time.selectDate.year = year
      this.$store.state.time.selectDate.month = month
      this.$store.state.time.selectDate.day = day
    },
    
    
    getDay(){ //取得月曆的上的日期
      Object.assign(this.$data.lattices, this.$options.data().lattices) //先初始化lattices的資料
      const firstDay = this.dayjs(this.$store.state.time.year + '-' + this.$store.state.time.month + '-01').day() //取得月份第一天是星期幾
      const days = this.dayjs(this.$store.state.time.year + '-' + this.$store.state.time.month).daysInMonth() //取得月份有幾天
      const lastMonthDays = this.dayjs(this.$store.state.time.month == 1 ? this.$store.state.time.year-1 + '-12' : this.$store.state.time.year + '-' + (this.$store.state.time.month-1)).daysInMonth() //取得上個月有幾天
      
      
      for(var i = 1; i <= days; i++){ //把本月日期填上
        var findThisMonth = this.lattices.find(function(item){ //尋找本月日期
          return item.id === firstDay+i-1
        })
        findThisMonth.date.day = i
        findThisMonth.isActive = true
        findThisMonth.date.year = this.$store.state.time.year
        findThisMonth.date.month = this.$store.state.time.month
        //---取得當月的特殊星象&月象---V
        let year = this.$store.state.time.year
        let month = this.$store.state.time.month < 10 ? '0' + this.$store.state.time.month : this.$store.state.time.month
        let day = i < 10 ? '0' + i : i
        var findSpecial = this.$store.state.star.find(function(item){
          return item.date === year + '-' + month + '-' + day
        })
        //---星象---V
        if(findSpecial !== undefined){ //只有2021年的資料，如果跨到2022年就會爆錯
          findThisMonth.special.name = findSpecial.s
          if (findThisMonth.special.name !== ""){
            findThisMonth.special.icon = require('../assets/icon/wi-stars.svg')
          }
          // else{
          //   findThisMonth.special.icon = ""
          //   findThisMonth.special.name = ""
          // }
          //---月象---V
          if (findThisMonth.special.name.indexOf("朔") !== -1){ //若特殊星象包含朔，就把月象補上朔月
            findThisMonth.moonPhase.name = "朔月"
            findThisMonth.moonPhase.icon = require('../assets/icon/wi-moon-new.svg')
          }
          else if(findThisMonth.special.name.indexOf("望") !== -1){ //同上
            findThisMonth.moonPhase.name = "滿月"
            findThisMonth.moonPhase.icon = require('../assets/icon/wi-moon-full.svg')
          }
          // else{
          //   findThisMonth.moonPhase.name = ""
          //   findThisMonth.moonPhase.icon = ""
          // }
        }
        else {
          // findThisMonth.special.icon = ""
          // findThisMonth.special.name = ""
          // findThisMonth.moonPhase.name = ""
          // findThisMonth.moonPhase.icon = ""
        }
      }
      for(var j = 1; j <= 42-findThisMonth.id-1; j++){ //把次月日期填上
        let findNextMonth = this.lattices.find(function(item){
          return item.id === firstDay+i+j-2
        })
        findNextMonth.date.day = j
        // findNextMonth.isActive = false
        // findNextMonth.special.icon = ""
        // findNextMonth.special.name = ""
        // findNextMonth.moonPhase.icon = ""
        // findNextMonth.moonPhase.name = ""
        if(this.$store.state.time.month === 12){
          findNextMonth.date.year = this.$store.state.time.year + 1
          findNextMonth.date.month = 1
        }
        else{
          findNextMonth.date.year = this.$store.state.time.year
          findNextMonth.date.month = this.$store.state.time.month + 1
        }

      }
      for(var x = 1; x <= 42-i-j+2; x++){ //把上月日期填入
        let findLastMonth = this.lattices.find(function(item){
          return item.id === firstDay-x
        })
        findLastMonth.date.day = lastMonthDays-x+1
        // findLastMonth.isActive = false
        // findLastMonth.special.icon = ""
        // findLastMonth.special.name = ""
        // findLastMonth.moonPhase.icon = ""
        // findLastMonth.moonPhase.name = ""
        if(this.$store.state.time.month === 1){
          findLastMonth.date.year = this.$store.state.time.year - 1
          findLastMonth.date.month = 12
        }
        else{
          findLastMonth.date.year = this.$store.state.time.year
          findLastMonth.date.month = this.$store.state.time.month - 1
        }

      }
      this.getDayWeather()
    },
    getDayWeather(){ //取得月曆上天氣的icon
      if(this.$store.state.time.year === this.dayjs().year() && this.$store.state.time.month === this.dayjs().month()+1){
        for(var y = 0; y <= 6; y++){
          let timeDate = this.time.date
          var findThisWeek = this.lattices.find(function(item){
            return item.date.day === timeDate+y
          })
          findThisWeek.weather.icon = require('../assets/icon/weatherIcon/' + this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[y*2].elementValue[1].value + '.svg')
          findThisWeek.weather.name = this.$store.state.info[this.$store.state.city.id].weatherElement[6].time[y*2].elementValue[0].value
        }
      }
      else{
        for(var z = 0; z <= 41; z++){
          this.lattices[z].weather.icon = require('../assets/icon/blank.svg')
          // this.lattices[z].weather.name = ''
        }
      }
    },
  },

  created: function(){ //創建完成時
    this.nowTimes();
    this.nowTimesDate();
    this.$axios
      .get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-E6B72E01-C0C6-4326-A1F1-7872CE97019F')
      .then(response => { //接完API後要做的事
        this.$store.state.info = response.data.records.locations[0].location
        this.getTodayWeather()
        this.weather.icon = require('../assets/icon/weatherIcon/' + this.weather.wxId + '.svg') //接完API再把資料寫入DATA，否則一開始Data取不到資料
        this.getDay()
        })
      .catch(function (error) { // 請求失敗處理
        console.log(error);
      });
  },
  mounted(){ //掛載完成時
    this.nowTimes();
    this.nowTimesDate();
  },

  beforeUpdate(){
    this.getTodayWeather()
    this.getDay()
  }
  
}
</script>

<style scope>
  @import './Weather.css';
</style>