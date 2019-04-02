<!--
 -  2019/3/26  lize
 -->
<template>

  <div class = "CalenderTem">

    <!--<div class = "topHead">-->

      <!--&lt;!&ndash;【{{$store.state.userInfo.name ? $store.state.userInfo.name : "" }}】公时报备&ndash;&gt;-->

      <!--<van-nav-bar fixed :title="headerTitle" @click-left="onClickLeft"></van-nav-bar>-->

    <!--</div>-->

    <div class = "sctionWarp">

      <Calender :WorkHoursList = "WorkHoursList"  @on_success = "onSuccess" @on_date_click = "onDateClick"></Calender>

    </div>

    <div class = "modoleWarp">

      <div class = "itemWarp" v-for="(item,index) in list" :key = "index">

        <p>{{item.name}}：</p>

        <p>{{item.value}}</p>

      </div>

    </div>

  </div>

</template>

<script>
    export default {
        components:{

            Calender:() => import('../../../components/calender/Calender.vue')

        },
        data () {
            return {

              headerTitle:'',

              list:[

                  {
                      name:"本月总计工时",

                      value:"",

                  },
                  {
                    name:"本月实际工时",

                    value:"",

                  },
                  {
                    name:"本月缺计工时",

                    value:"",

                  }

                ],

              WorkHoursList:[],

            }
        },
        mounted () {

            this.initialize();

        },
        methods: {
          //initialize
          initialize(){

            this.headerTitle = `【${this.$store.state.userInfo.ent_title ? this.$store.state.userInfo.ent_title : "" }】公时报备`;

          },
          //onDateClick
          onDateClick(item){

            let date = item.nowDate.split('/');

            if(item.flag){

              if(!item.items.length){

                this.$store.state.WorkHoursList = item.items;

                this.$router.push({path:'/ReportedManHour',query:{date:item.nowDate}})

              }else{

                this.$dialog.confirm({

                  message: `${date[0]}年${date[1]}月${date[2]}日工时已经记录,是否修改当日记录工时?`,

                  confirmButtonText:"去修改",

                  cancelButtonText:"取消",

                  lockScroll:true

                }).then((e) =>{

                  this.$store.state.WorkHoursList = item.items;

                  this.$dialog.close();

                  setTimeout(() =>{

                    this.$router.push({path:'/ReportedManHour',query:{date:item.nowDate}})

                  },300)

                })

                  .catch((er) =>{

                    console.log(er);

                  })

              }

            }else{

              this.$toast({message:'仅可对今天以前的日期进行填报！',duration:1000});

            }

          },
          //onSuccess
          onSuccess(data){

              let Ary = data;

              let NewAry = [];

              let NewAry_Item = [];

              for(let i = 0; i<Ary.length;i++){

                  for(let j = 0; j<Ary[i].length; j++){

                    NewAry.push(Ary[i][j].formatting);

                    NewAry_Item.push(Ary[i][j]);
                  }
              }

            this.GetWorkHoursList({dataList:NewAry},data);

          },
          //GetWorkHoursList
          GetWorkHoursList(dataList,calender){

//            let url = "/jjc/system/workHours/list";

//            let url = "/mocks/system/workHours/list";

            let url = process.env.VUE_APP_GetWorkHoursList;

            this.$http.post(url,dataList)

              .then((e) =>{

                console.log(e);

                if(e.success){

                  this.WorkHoursList = e.data;

                  this.Calculate(this.WorkHoursList,calender)

                }

              })

              .catch((er) =>{

                console.log(er);

                this.$toast.fail("网络错误!");

              })

          },
          //计算统计
          Calculate(WorkHoursList,calender){

            let num = 0;

            let countNum = 0;

            WorkHoursList.forEach((i,v) =>{

              calender.forEach((j,y) =>{

                  j.forEach((o,p) =>{

                      if(i.key == o.formatting){

                          o.WorkHoursList = i.value;

                      }

                  })

              });

            });

            calender.forEach((j,y) =>{

              j.forEach((o,p) =>{

                  if(o.WorkHoursList){

                      o.WorkHoursList.forEach((r,t) =>{

                        num+= Number(r.hours)

                      })

                  }

                if(o.key == "self"){

                  if(o.weekday<6 && o.weekday>0){

                    countNum++;

                  }

                }

              })

            });

            this.list[0].value = `${countNum*7.5} 小时`;

            this.list[1].value = `${num*0.5} 小时`;

            this.list[2].value = `${countNum*7.5 - num*0.5} 小时`;

          },
          //onClickLeft
          onClickLeft(){

              window.location.href = '/';

          }

        }

    }
</script>

<style scoped lang="scss">
  .CalenderTem{

    /*background-color: #f5f7f9;*/

    background-color: #ffffff;

    display: flex;

    flex-direction:column ;

    height: 100%;

    .topHead{

      overflow: hidden;

      /*background-color: #ffffff;*/

      /*height: 40px;*/

      /*line-height: 40px;*/

      /*text-align: center;*/

      .van-nav-bar{

        background-color: #f5f7f9;

        .van-nav-bar__title{

          color: #000000;

        }

        .van-icon{

          color: #000000;

        }

      }

    }

    .sctionWarp{

      /*margin-top: 44px;*/

      flex: 2;

    }

    .modoleWarp{

      margin-top: 15px;

      padding: 10px;

      box-shadow: 0px 5px 22px 0px rgba(57, 71, 95, 0.2);

      font-size: 14px;

      .itemWarp{

        display: flex;

        p{

          line-height: 26px;

          &:nth-child(1){

            width: 28%;

          }

          &:nth-child(2){

            flex: 1;

          }

        }

      }

    }

  }
</style>
