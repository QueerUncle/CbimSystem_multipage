<!--
 -  2019/3/25  lize
 -->
<template>

  <div class="calender">

    <div class="header" v-show="$props.PC">

      <span @click="prevMonth"><</span>

      <span>

        <Select size="small" style="width:80px" v-model="year" @on-change="changeYear">

            <Option v-for="year in yearCheckArr" :value="year" :key="year">{{year}}</Option>

        </Select>

        &nbsp;

        <Select size="small" style="width:80px" v-model="month" @on-change="changeMonth">

            <Option v-for="month in monthCheckArr" :value="month" :key="month">{{month}}</Option>

        </Select>

      </span>

      <span @click="nextMonth"> > </span>

    </div>

    <div class="body" v-if="$props.PC">

      <table>

        <thead>

        <tr>

          <th v-for="(item,index) in weekArr" :key = "index">

            <span>{{item}}</span>

          </th>

        </tr>

        </thead>

        <tbody>

        <tr v-for="(item,index) in datesArr" :key="index">

          <td v-for="(days,indexa) in item" :key="indexa" style = "position: relative;">

            <span @click = "selectCalender(days,indexa)"  style="overflow: hidden"  :class="{bgGray: days.key == 'other',bgGreen: days.active ,active:days.active}">

                <i style="">{{days.value}}</i>

                <i v-show="days.flag  && new Date(days.nowDate).getTime() < (new Date().getTime() - 24*60*60*1000) " class = "biaojii" :class = {ff6b6b:!days.items.length,ffffff:days.items.length}></i>

            </span>

          </td>

        </tr>

        </tbody>

      </table>

    </div>

    <div class = "moveHeader" v-if="!$props.PC">{{year}}年{{month}}</div>

      <v-touch style = "overflow: hidden" v-if = "!$props.PC" class = "body a" v-on:swipeleft="nextMonth" v-on:swiperight="prevMonth">

        <van-swipe ref = "VanSwipe" :show-indicators = "false">

          <van-swipe-item v-for = "(p,index) in SwipeNum" :key = "index">

            <table>

              <thead>

              <tr>

                <th v-for="(item,index) in weekArr" :key = "index">

                  <span>{{item}}</span>

                </th>

              </tr>

              </thead>

              <tbody>

              <tr v-for="(item,index) in datesArr" :key="index">

                <td v-for="(days,indexa) in item" :key="indexa" style = "position: relative;">

              <span class = "dataSpan" @click = "selectCalender(days,indexa)"  style="overflow: hidden"  :class="{bgGray: days.key == 'other', bgGreen: days.nowDate == nowDateStr,active:days.active}">

                  <i>{{days.value}}</i>

                  <i v-show="days.flag && new Date(days.nowDate).getTime() < (new Date().getTime() - 24*60*60*1000)" class = "biaojii" :class = {ff6b6b:!days.items.length,ffffff:days.items.length}></i>

              </span>

                </td>

              </tr>

              </tbody>

            </table>

          </van-swipe-item >

        </van-swipe>

    </v-touch>

  </div>

</template>

<script>

  const month_contrast = Number(new Date().getMonth()+1) < 10 ? "0"+ Number(new Date().getMonth()+1) : Number(new Date().getMonth()+1);

  const year_contrast =new Date().getFullYear();

  const date_contrast = new Date().getDate() <10 ? '0'+ new Date().getDate() : new Date().getDate();

  export default {

    name: "calender",

    props: ["startYear", "endYear", "initDate",'PC','WorkHoursList'],

    watch:{

        'WorkHoursList'(n){

            if(n.length){

                for(let i = 0; i<n.length; i++ ){

                    for(let j = 0; j< this.datesArr.length; j++){

                        for(let p = 0; p<this.datesArr[j].length; p++){

                            if(n[i].key == this.datesArr[j][p].formatting){

                                this.datesArr[j][p].items = n[i].value ? n[i].value : [];

                            }

                        }

                    }

                }

            }

        }

    },

    data(){

      return {

        SwipeNum:2,

        flag:false,

        active:'',

        datesArr: new Array(6),

        year: 2018,

        month: 12,

        day: 12,

        nowDateStr: "",

        daysArr: [],

        monthCheckArr: [],

        yearCheckArr: [],

        initDateStr: "",

        weekArr:['一','二','三','四','五','六','日'],

      }

    },

    created(){

      this.initialize();

    },
    methods: {
      //初始化
      initialize(){

        //月份选项数组
        for(let i= 1; i < 13;i++){

          this.monthCheckArr.push(i);

        };

        //年份选项数组

        let startYear = this.$props.startYear? this.$props.startYear : 1900;

        let endYear = this.$props.endYear? this.$props.endYear : 2100;

        for (let i=startYear;i<endYear+1;i++) {

          this.yearCheckArr.push(i);

        }

        this.initDateStr = this.$props.initDate? this.$props.initDate : new Date().getTime();

        this.drawPicker(this.initDateStr);

      },
      //切换年份
      changeYear(item){

        this.year = item;

        let days1 = this.getDaysOfMonth(this.year + "/" + this.month);

        this.day = this.day <= days1 ? this.day : 1;

        let dateStr = this.year + "/" + this.month + "/" + this.day;

        this.drawPicker(dateStr);

      },
      //切换月份
      changeMonth(item){

        this.month = item;

        var days1 = this.getDaysOfMonth(this.year + "/" + this.month);

        this.day = this.day <= days1 ? this.day : 1;

        var dateStr = this.year + "/" + this.month + "/" + this.day;

        this.drawPicker(dateStr);

      },
      //切换日期
      selectCalender(item){

        this.SetData(item,this.datesArr);

        this.$emit("on_date_click",item);

      },
      //查询上一个月
      prevMonth(){

        this.month = this.month - 1;

        if(this.month <= 0){

          this.month = 12;

          this.year--;

        }

        let days1 = this.getDaysOfMonth(this.year + "/" + this.month);

        this.day = this.day < days1 ? this.day : 1;

        let dateStr = this.year + "/" + this.month + "/" + this.day;

        this.drawPicker(dateStr);

        this.flag = !this.flag;

      },
      //查询写一个月日期
      nextMonth(){

        this.month = this.month + 1;

        if(this.month > 12){

          this.month = 1;

          this.year++;

        }

        let days1 = this.getDaysOfMonth(this.year + "/" + this.month);

        this.day = this.day < days1 ? this.day : 1;

        let midStr = this.year + "/" + this.month + "/" + this.day;

        let dateStr = this.year + "/" + this.month + "/" + this.day;

        this.drawPicker(dateStr);

        this.flag = !this.flag;

      },
      //计算所显示数据
      drawPicker(primalDate) {

        let date = new Date(primalDate);

        let month = date.getMonth() + 1;

        let year = date.getFullYear();

        let nowDay = date.getDate();

        this.year = year;

        this.month = month;

        let days = this.getDaysOfMonth(date); //当前月份天数

        this.day = nowDay <= days ? nowDay : 1;

        this.nowDateStr = this.year + "/" + this.month + "/" + this.day;

        let prevMonth,midYear,midStr;

        if (this.month == 1) {

          prevMonth = 12;

          midYear = this.year - 1;

        }else {

          prevMonth = this.month - 1;

          midYear = this.year

        }

        this.daysArr = [];

        midStr = midYear + "/" + prevMonth + '/' + 1;

        let lastMonthDays = this.getDaysOfMonth(midStr); //上一个月天数

        date.setDate(1); //设置日期为1号

        let firstDay = date.getDay(); //本月1号是周几

        //当月有效日期
        for (let i = 1;i <= days;i++) {

          this.daysArr.push({

            key: "self",

            nowDate: `${this.year}/${this.month > 9 ? this.month : '0' + this.month}/${i > 9 ? i : '0' + i }`,

            formatting: `${this.year}-${this.month > 9 ? this.month : '0' + this.month}-${i > 9 ? i : '0' + i }`,

            value: i,

            active: i == date_contrast && this.year == year_contrast && this.month == month_contrast ? true : false,

            items: [],

            flag: new Date(`${this.year}/${this.month > 9 ? this.month : '0' + this.month}/${i > 9 ? i : '0' + i }`).getTime() >= new Date("2019/03/01").getTime() ? true : false,

            weekday: new Date(`${this.year}-${this.month > 9 ? this.month : '0' + this.month}-${i > 9 ? i : '0' + i }`).getDay()

          });

        }

        //月份开头无效日期
        for(let j=firstDay-1;j > 0;j--){

          this.daysArr.unshift({

            key: "other",

//            nowDate: lastMonthDays,

            nowDate: `${this.year}/${Number(this.month-1) >9 ? Number(this.month-1) : '0' + Number(this.month-1)}/${lastMonthDays > 9 ? lastMonthDays : '0' + lastMonthDays}`,

            formatting:`${this.year}-${Number(this.month-1) >9 ? Number(this.month-1) : '0' + Number(this.month-1)}-${lastMonthDays > 9 ? lastMonthDays : '0' + lastMonthDays}`,

            value: lastMonthDays,

            active: false,

            items:[],

            flag: new Date(`${this.year}/${this.month > 9 ? this.month : '0' + this.month}/${j > 9 ? j : '0' + j }`).getTime() >= new Date("2019/02/25").getTime()  ? true : false

          });

          lastMonthDays--;

        }

        let addLength = 42 - this.daysArr.length;

        //月份结尾无效日期
        for(let j=1;j<=addLength;j++){

          this.daysArr.push({

            key: "other",

//            nowDate: j,

            nowDate: `${this.year}/${Number(this.month+1) > 9 ? Number(this.month+1) : '0' + Number(this.month+1)}/${j > 9 ? j : '0' + j}` ,

            formatting:`${this.year}-${Number(this.month+1) > 9 ? Number(this.month+1) : '0' + Number(this.month+1)}-${j > 9 ? j : '0' + j}`,

            value: j,

            active: false,

            items:[],

            flag:new Date(`${this.year}/${this.month > 9 ? this.month : '0' + this.month}/${j > 9 ? j : '0' + j }`).getTime() >= new Date("2019/02/25").getTime()  ? true : false

          });

        }

        for (let j=0;j<this.datesArr.length;j++) {

          this.datesArr[j] = this.daysArr.slice(j*7,j*7+7);

        }

        this.$emit("on_success",JSON.parse(JSON.stringify(this.datesArr)));

        console.log(this.datesArr)

      },
      //获取每个月的天数
      getDaysOfMonth(primalDate){

        //计算当前月份有多少天
        let date = new Date(primalDate);

        let month = date.getMonth();

        let time = date.getTime();

        let newtime = date.setMonth(month + 1);

        return Math.ceil((newtime - time) / (24*60*60*1000));

      },
      //处理数据
      SetData(item,Ary){

        if(item.flag){

          if(Ary && Ary.length){

            Ary.forEach((i,v) =>{

              if(i && i.length){

                i.forEach((j,y) =>{

                  if(j.nowDate == item.nowDate){

                    j.active = true;

                  }else{

                    j.active = false;

                  }

                })

              }

            })

          }

        }

      }

    }

  }

</script>

<style scoped lang="scss">

  .calender {

    background-color: #4f77aa;

    font-size: 14px;

    width: 100%;

    line-height: 30px;

    box-shadow: 0px 5px 22px #ddd;

    .moveHeader{

      text-align: center;

      color: #ffffff;

      height: 44px;

      line-height: 44px;

      font-size: 14px;

    }

    .header {

      text-align: center;

      background: deepskyblue;

      color: #fff;

      padding: 5px 0;

      span {

        font-size: 14px;

        &:first-child {

          margin-right: 50px;

          cursor: pointer;

        }
        &:last-child {

          margin-left: 50px;

          cursor: pointer;

        }

      }

    }
    .body {

      table {

        width: 100%;

        tbody,thead{

          width: 100%;

          th,td {

            text-align: center;

            cursor: pointer;

          }

          .dataSpan{

            display: inline-block;

            border: 1px solid transparent;

            border-radius: 999px;

            width: 40px;

            height: 40px;

            -webkit-transition: all 0.5s;

            -moz-transition: all 0.5s;

            -ms-transition: all 0.5s;

            -o-transition: all 0.5s;

            transition: all 0.5s;

            text-align: center;

            font-size: 1px;

          }

        }

        thead{

          color: #96adcf;

        }

        tbody{

          font-size: 14px;

          tr{

            td{

              padding-bottom: 8px;

              .dataSpan{

                color:#ffffff;

                i{

                  display: block;

                  font-style: normal;

                  font-size: 16px;

                }

                .biaojii{

                  width: 5px;

                  height: 5px;

                  display: block;

                  background: #ff6b6b;

                  color:#ff6b6b!important;

                  border-radius: 999px;

                  position: absolute;

                  bottom: 20px;

                  z-index: 100;

                  text-align: center;

                  font-size: 20px;

                  margin-left: 16.5px;

                }

              }

            }

          }

        }

      }

    }

  }

  .bgGreen {

    background: #6a8ab7;

    -webkit-border-radius: 10px;

    -moz-border-radius: 10px;

    border-radius: 10px;

  }

  .active{

    background-color: #ffffff;

    color: #4f77aa!important;

    -webkit-border-radius: 10px;

    -moz-border-radius: 10px;

    border-radius: 10px;

  }

  .bgGray {

    color: #96adcf!important;

  }

  .ff6b6b{

    background-color: #ff6b6b!important;

  }

  .ffffff{

    background-color: #ffffff!important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


</style>
