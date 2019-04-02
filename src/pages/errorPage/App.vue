<!--
 -  2019/3/14  lize
 -->
<template>

  <div id="app" :style = {height:height}>

    <div class="weui_msg">

      <div class="weui_icon_area">

        <i class="weui_icon_info weui_icon_msg"></i>

      </div>

      <div class="weui_text_area">

        <h4 class="weui_msg_title">权限获取异常,请稍后重试……</h4>

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

        }

    },

    created(){

      this.initialize();

    },
    methods:{

      //initialize
      initialize(){

        window.onresize = () => {

          this.height = document.body.clientHeight

        }

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

    .weui_msg{

      padding-top: 36px;

      text-align: center;

      .weui_icon_area{

        margin-bottom: 30px;

        .weui_icon_msg{

          &:before{

            font-size: 104px;

            color: #10AEFF

          }

        }

      }

      .weui_text_area{

        margin-bottom: 25px;

        padding: 0 20px;

        .weui_msg_title{

          margin-bottom: 5px;

          font-weight: 400;

          font-size: 20px;

        }

      }

    }

  }

</style>
