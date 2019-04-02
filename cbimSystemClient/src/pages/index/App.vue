<!--
 -  2019/3/14  lize
 -->
<template>

  <div id="app" :style = {height:height}>

    <div class = "comntentWarp">

      <div class = "SwiprWarp">

        <van-swipe class = "swipeContent" :autoplay="3000" indicator-color="white">

          <van-swipe-item :key = "index" class = "swipeSlie"  v-for = "(item,index) in swipeList">

            <!--{{item.name}}-->

            <img :src="item.src" alt="">

          </van-swipe-item>

        </van-swipe>

      </div>

      <div class = "ContentWarp">

        <!--<van-pull-refresh v-model="isLoading"  @refresh="onRefresh">-->

          <!--<i slot="pulling"></i>-->

          <!--<i slot="loosing"></i>-->

          <!--<i slot="loading"></i>-->

          <div class = "classFiyWarp"  v-for="(item,index) in list" :key = "index">

            <div class = "classNameWarp">{{item.title}}</div>

            <div class = "titleWarp" type="flex" justify="space-around">

              <div class = "itemWarp" @click = "linkTo(j.href)" span="6"  v-for="(j,indexs) in item.ClassFiyList" :key = "indexs">

                <div class = "conWap">

                  <div class = "imgWarp">

                    <img :src="j.src" alt="">

                  </div>

                  <div class = "textWarp">{{j.name}}</div>

                </div>

              </div>

            </div>

          </div>

        <!--</van-pull-refresh>-->

      </div>

    </div>

  </div>

</template>

<script>

  export default {

    name: 'app',

    data(){

        return {

            height:"100%",

            RouterInfo:'',

            list:[

              {

                title:'综合分类',

                ClassFiyList:[

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  }

                ]

              },

              {

                title:'综合分类',

                ClassFiyList:[

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  }

                ]

              },

              {

                title:'综合分类',

                ClassFiyList:[

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },
                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                ]

              },

              {

                title:'综合分类',

                ClassFiyList:[

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },
                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"投票",

                    src:require('./assets/vote.png'),

                    href:"/votedSystem?a=1"

                  },
                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                  {

                    name:"工时",

                    src:require('./assets/time.png'),

                    href:"/timingSystem?a=2"

                  },

                ]

              },

            ],

            swipeList:[

              {

                  name:1,

                  background:'#66c6f2',

                  src:'./img/01.jpg'

              },
              {

                name:2,

                background:'#39a9ed',

                src:'./img/02.jpg'

              },
              {

                name:3,

                background:'#39a9ed',

                src:'./img/03.jpg'

              },

            ],

            isLoading:false,

            loading:false,

        }

    },

    created(){

    },
    methods:{

      //initialize
      initialize(){

        let meta_content = document.querySelector('meta[name="viewport"]').getAttribute('content');

        if(meta_content.indexOf('viewport-fit=cover')<0){

          document.querySelector('meta[name="viewport"]').setAttribute('content',`${meta_content},viewport-fit=cover`);

        };

        this.GetAppList();

        window.onresize = () => {

          this.height = document.body.clientHeight

        }

      },

      //linkTo
      linkTo(href){

        if(href){

          window.location.href = href;

        }

      },

      //获取App列表
      GetAppList(){

          let url = process.env.VUE_APP_GetAppList;

          this.$http.get(url)

            .then((e) =>{

              console.log(e);

            })

            .catch((er) =>{

              console.log(er);

            })

      },

      onRefresh(){

        setTimeout(() => {

          this.isLoading = false;

        }, 0);

      },

    }

  }

</script>

<style lang = "scss" scoped>

  #app {

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

    display: flex;

    flex-direction:column;

    background-color: #fafafa;

    .comntentWarp{

      flex: 2;

      display: flex;

      flex-flow: column;

      .SwiprWarp{

        height: 140px;

        .swipeContent{

          height: 100%;

          overflow: hidden;

          text-align: center;

          line-height: 140px;

          .swipeSlie{

            height: 100%;

            img{

              width: 100%;

              height: 100%;

            }

          }

        }

      }

      .ContentWarp{

        flex: 2;

        overflow-y:scroll;

        padding-bottom: 30px;

        -webkit-overflow-scrolling: touch;

        .classFiyWarp{

          margin-top: 30px;

          background-color: #ffffff;

          box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

          border-radius: 4px;

          position: relative;

          .classNameWarp{

            position: absolute;

            left:10px;

            height:30px;

            line-height: 30px;

            border: 1px solid rgba(0, 0, 0, 0.1);

            top:-15px;

            background-color: #ffffff!important;

            padding: 0 16px;

            box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

            border-radius: 4px;

          }

          .titleWarp{

            padding:16px 0 8px ;

            min-height:140px;

            width: 100%;

            text-align: center;

            display: flex;

            align-items:center;/*垂直居中*/

            flex-wrap:wrap;

            .itemWarp{

              width: 20%;

              margin: 10px 8px;

              overflow: hidden;

              display: flex;

              align-items: center;

              justify-content: center;

              .conWap{

                width: 40px;

                height: 100%;

                font-size: 12px;

                .imgWarp{

                  width: 100%;

                  height: 40px;

                  margin-bottom: 3px;

                  img{

                    width: 100%;

                    height: 100%;

                  }

                }

              }

            }

          }

        }

      }

    }

  }

</style>
