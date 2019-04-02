<!--
 -  2019/3/14  lize
 -->
<template>

  <div id="app" :style = {height:height}>

    <transition name="van-fade">

      <router-view style = "height: 100%;" class = "ContentLayout"></router-view>

    </transition>

  </div>

</template>

<script>

  export default {

    name: 'app',

    data(){

        return {

          flag:true,

          height:"100%",

        }

    },

    created(){

      this.initialize();

    },
    methods:{

      //初始化
      initialize(){

        window.onresize = () =>{

          this.height = document.body.clientHeight

        }

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

    background-color: #ffffff;

  }

</style>
