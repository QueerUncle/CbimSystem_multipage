<!--
 -  2019/3/14  lize
 -->
<template>

  <div id="app" :style = {height:height}>

    <router-view></router-view>

  </div>

</template>

<script>

  export default {

    name: 'app',

    data(){

        return {

            flag:false,

            height:"100%",

        }

    },

    components: {

    },

    mounted(){

      this.initialize();

    },

    methods:{

      //initialize
      initialize(){

        console.log(this.$fs.getUrlparame(),'222222222222222222');

        window.onresize = () => {

          this.height = document.body.clientHeight

        };

        this.GetUserInfo();

        this.GetProjectList();

        let u = navigator.userAgent;

        if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){

            this.$store.state.phoneInfo = "Android";

        }else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

            this.$store.state.phoneInfo  = "ios";

        }

      },

      //获取项目列表
      GetProjectList(){

        let url = process.env.VUE_APP_GetProjectList;

          this.$http.get(url)

            .then((e) =>{

              console.log(e);

              if(e.success){

                  let obj = {

                    end_date: "",

                    prj_id: "",

                    start_date: "",

                    status: 1,

                    title: "其他"

                  };

                  e.data.push(obj);

                  this.$store.state.projectList = e.data;

                  this.flag = false;

              }

            })

            .catch((er) =>{

              console.log(er);

              this.$toast.fail("网络错误!");

            })

      },

      //GetUserInfo
      GetUserInfo(){

//        let url = "/jjc/system/userInfo";

        let url = process.env.VUE_APP_GetUserInfo;

        this.$http.get(url)

            .then((e) =>{

              console.log(e);

              if(e.success){

                  this.$store.state.userInfo = e.data;

              }


            })

            .catch((er) =>{

              console.log(er);

            })

      }

    }

  }

</script>

<style lang = "scss" scoped>

  #app {

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

  }

</style>
