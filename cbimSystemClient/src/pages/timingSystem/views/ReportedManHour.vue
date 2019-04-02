<!--
 -  2019/3/26  lize
 -->
<template>

  <div class = "ReportedManHour">

    <div class = "topHead">

      <!--{{date}} 公时报备-->

      <van-nav-bar  @click-left="onClickLeft" fixed :title="headerTitle" ></van-nav-bar>

    </div>

    <van-pull-refresh id = "sectionWarp" class = "sectionWarp" :style = "" style = "overflow: auto" v-model="isLoading" @refresh="onRefresh">

      <div class = "listWarp" v-for="(item,index) in projects" :key = "index">

        <div>

          <div class = "itemWarp">

            <p>项目名称：</p>

            <p @click = "ClickProjectName(item,index)">

              {{item.title}}

              <van-icon style = "float: right" name="arrow-down" />

            </p>

          </div>

          <div class = "itemWarp">

            <p>日期：</p>

            <p>{{$route.query.date}}</p>

          </div>

          <div class = "itemWarp" v-show="item.prj_id == '' && item.type == 'other'">

            <p>事项：</p>

            <p><input type="text" v-model="item.event_content"></p>

          </div>

          <div class = "itemWarp">

            <p>工时：</p>

            <p @click = "ClickWorkHours(item,index)">

              {{item.hours}}

              <van-icon style = "float: right" name="arrow-down" />

            </p>

          </div>

          <div class = "itemWarp" style="justify-content: center;margin-top: 5px;">

            <van-button style = "border:none!important;" size="mini" plain hairline type="primary" @click = "del(item,index)">删 除</van-button>

          </div>

        </div>

      </div>

      <van-button style = "margin-top: 10px;" plain type="info" size="large" @click = "AddRecord">添加一条新纪录</van-button>

    </van-pull-refresh>

    <div class = "bottomWarp">

      <div class = "listWarp">

        <div class = "itemWarp" v-for="(item,index) in list" :key = "index">

          <p>{{item.name}}：</p>

          <p>{{item.value}}</p>

        </div>

      </div>

      <van-button @click = "SaveDate" :loading = "loading"  loading-text="提交中..." type="info" size="large">提交</van-button>

    </div>

    <van-popup

      v-model="show"

      position="bottom"

      lock-scroll

      :close-on-click-overlay = false

      :overlay="true">

      <van-picker

        show-toolbar

        title="标题"

        :columns="columns"

        :item-height = "$store.state.phoneInfo == 'ios' ? 88 : 44 "

        :default-index="2"

        value-key = "title"

        @cancel="onCancel"

        @confirm="onConfirm">

      </van-picker>

    </van-popup>

  </div>

</template>

<script>
    export default {
        data () {
            return {

                headerTitle:'',

                date:'',

                isLoading:false,

                loading:false,

                show:false,

                columns:[],

                projects:[],

                list:[

                  {

                    name:"日期",

                    value:"",

                  },
                  {

                    name:"累计工时",

                    value:"",

                  },
                  {

                    name:"项目总数",

                    value:"",

                  }

                ],

                hours:[],

                WorkHoursLength:'',

                delAry:[],

                clickNum:'',

                clickType:''

            }
        },
        mounted () {

            this.initialize();

        },
        watch:{

          projects(n){

              if(n && n.length){

                  let num = 0;

                  for(let i = 0; i<n.length; i++){

                      if(typeof n[i].hours == 'number'){

                        num+=n[i].hours;

                      }

                  }

                  this.list[0].value = this.date;

                  this.list[1].value = `${num} 小时`;

                  this.list[2].value = `${n.length} 个`;

              }

          }

        },
        methods: {

          //initialize
          initialize(){

            this.date = `${this.$route.query.date.split('/')[0]}年${this.$route.query.date.split('/')[1]}月${this.$route.query.date.split('/')[2]}日`;

            this.headerTitle = `【${this.date}】 工时报备`;

            this.hours = this.hoursInit(0.5);

            let obj = {

              dataList:[`${this.$route.query.date.split('/').join("-")}`]

            };

            this.GetProjectInfo(obj);

          },
          //初始化工时下拉
          hoursInit(step){

            let newAry = [];

            let n = 0;

            for(let i = 0; i < 24*2; i++){

                let obj = {

                    title:n+=Number(step)

                };

              newAry.push(obj);

            }

            return newAry

          },
          //点击取消
          onCancel(){

              this.show = false;

          },
          //点击确定
          onConfirm(value,index){

              if(this.clickType == "hours"){

                this.projects[this.clickNum].hours = value.title;

              }else if(this.clickType == "name"){

                  if(value.prj_id == ''){

                    this.projects[this.clickNum].type = "other";

                  }

                  this.projects[this.clickNum].title = value.title;

                  this.projects[this.clickNum].prj_id = value.prj_id;

              }

            this.show = false;

            this.updateWorkHours();

          },
          //下拉刷新
          onRefresh(){

              setTimeout(() =>{

                  this.isLoading = false;

              },500)

          },
          //点击选择工时
          ClickWorkHours(item,index){

            this.columns = this.hoursInit(0.5);

            this.clickType = "hours";

            this.clickNum = index;

            this.show = true;

          },
          //点击项目名称
          ClickProjectName(item,index){

            this.columns = this.$store.state.projectList;

            this.clickType = "name";

            this.clickNum = index;

            this.show = true;

          },
          //获取当前日期下的报备
          GetProjectInfo(dataList){

//              let url = "/jjc/system/workHours/list";

//            let url = "/mocks/system/workHours/list";

            let url = process.env.VUE_APP_GetWorkHoursList;

            this.$http.post(url,dataList)

              .then((e) =>{

                console.log(e);

                if(e.success){

                  if(e.data[0].value){

                    this.projects = e.data[0].value;  //数据库中今天的事项

                    for(let i = 0; i<this.projects.length;i++){

                      this.projects[i].hours = this.projects[i].hours*0.5;

                      if(this.projects[i].type == "other"){

                        this.projects[i].title = "其他";

                      }

                    }

                    this.WorkHoursLength = this.projects.length; //数据库中今天事项的长度

                  }

                }

              })

              .catch((er) =>{

                console.log(er);

                this.$toast.fail("网络错误!");

              })

            },
          //添加一条工时报备
          AddRecord(){

            let obj = {

              id: '',

              type: "prj",

              prj_id: "",

              title:'请选择项目名称',

              event_content: "",

              hours: '请选择工时',

              date:this.$route.query.date.split('/').join("-"),

              isdel:false

            };

            this.projects.push(obj);

//            setTimeout(() =>{
//
//              document.getElementById('sectionWarp').scrollTop  = document.getElementById('sectionWarp').scrollHeight;
//
//            },500)

          },
          //删除一条
          del(item,index){

              item.isdel = true;

              if(item.id){

                this.delAry.push(item);

              }

              this.projects.splice(index,1);

          },
          //提交数据
          SaveDate(){

            let saveSate = this.projects.concat(this.delAry);

            let SendData = JSON.parse(JSON.stringify(saveSate));

            let flag = true;

            for(let i = 0; i<SendData.length; i++){

                console.log(SendData[i],'22222222222222222222222222222')

              if(!SendData[i].title || SendData[i].title == "请选择项目名称"){

                this.$toast({message:'请选择所填报的项目名称！',duration:1000});

                flag = false;

                return

              }

              if(SendData[i].type == "other"){

                if(!SendData[i].event_content){

                  this.$toast({message:'请填写所填报的事项名称！',duration:1000});

                  flag = false;

                  return

                }

              }

              if(!SendData[i].hours || SendData[i].hours == "请选择工时"){

                this.$toast({message:'请选择所填报的工时！',duration:1000});

                flag = false;

                return

              }

              SendData[i].hours = SendData[i].hours/0.5;

            }

            if(flag){

              if(SendData.length){

//                  let url = '/jjc/system/workHours/save';

//                let url = '/mocks/system/workHours/save';

                let url = process.env.VUE_APP_SaveDate;

                this.$http.post(url,SendData)

                  .then((e) =>{

                    console.log(e);

                    if(e.success){

                      this.$toast({message:e.message,duration:1000});

                      setTimeout(() =>{

                        this.$router.push('/')

                      },1000)

                    }

                  })

                  .catch((er) =>{

                    console.log(er);

                  })

              }

            }

          },
          //点击后退按钮
          onClickLeft(){

              this.$router.go(-1);

          },
          //更新时间统计
          updateWorkHours(){

            if(this.projects && this.projects.length){

              let num = 0;

              for(let i = 0; i<this.projects.length; i++){

                if(typeof this.projects[i].hours == 'number'){

                  num+=this.projects[i].hours;

                }

              }

              this.list[0].value = this.date;

              this.list[1].value = `${num} 小时`;

              this.list[2].value = `${this.projects.length} 个`;

            }

          }

        }

    }
</script>

<style scoped lang="scss">

  .ReportedManHour{

    background-color: #f5f7f9;

    display: flex;

    flex-direction:column;

    height: 100%;

    .topHead{

      /*background-color: #ffffff;*/

      /*height: 40px;*/

      /*line-height: 40px;*/

      /*text-align: center;*/

      /*width: 100%;*/

      /*flex: 0;*/

      .van-nav-bar{

        background-color: #ffffff;

        .van-nav-bar__title{

          color: #000000;

        }

        .van-icon{

          color: #000000;

        }

      }

    }

    .bottomWarp{

      font-size: 14px;

      width: 100%;

      .listWarp{

        .itemWarp{

          p{

            &:nth-child(2){

              justify-content: flex-start!important;

            }

          }

        }

      }

    }

    .sectionWarp{

      width: 100%;

      flex: 2;

      margin-top: 44px;

      font-size: 14px;

    }

    .listWarp{

      padding: 10px;

      box-shadow: 3px 5px 22px 0px rgba(57, 71, 95, 0.2);

      background-color: #ffffff;

      margin: 10px 0;

      .itemWarp{

        display: flex;

        p{

          line-height: 26px;

          margin-bottom: 10px;

          input{

            border: none;

            width: 100%;

          }

          &:nth-child(1){

            padding-left: 10px;

            width: 28%;

          }

          &:nth-child(2){

            flex: 1;

          }

        }

      }

    }

  }

  .van-picker-column{

    ul{

      line-height: 44px!important;

      li{

        height: 44px!important;

      }

    }

  }

</style>
