<!--
 -  2019/3/14  lize
 -->
<template>

  <div id="app">

    <Layout class="layout">
      <!--头 -->
      <cbim-header></cbim-header>

      <Layout>
        <!-- 侧边栏 -->
        <Sider

          :style="{
              width:'206px',

              minHeight:heightVal+'px',

              minWidth:'206px',

              maxWidth:'206px',

              flex:'0 0 206px'}"

              class="slider">

                <menu-left

                  :RouterConfig="RouterInfos"

                  :MenuData="MenuData"

                  :MenuCoordinate="MenuCoordinate"

                  v-if="MenuData.length>0"

                  :Color="Color"

                  :Size="large">

                </menu-left>

          </Sider>

        <Layout style="overflow-x: auto;min-width: 1094px;">
          <!-- 内容 -->
          <Content class="content" :style="{minHeight: heightVal+'px',width:'100%'}">

            <router-view></router-view>

            <Button type="primary">uuuu</Button>

          </Content>

        </Layout>

      </Layout>
      <!-- 尾 -->
      <cbim-footer></cbim-footer>

    </Layout>

  </div>

</template>

<script>

  import CbimHeader from "@/common/components/templates/CbimHeader";

  import CbimFooter from "@/common/components/templates/CbimFooter";

  import menuLeft from "@/common/components/projectNavigation/Menu.vue";

  export default {

    components: {

      CbimHeader,

      CbimFooter,

      menuLeft

    },

    data (){

      return {

        RouterInfos   : {},

        Color         : "#ff5100",

        large         : "Large",

        isLogined     : true,

        MenuData      : [],

        MenuCoordinate: [],

        isCollapsed   : true,

        heightVal     : 0,

      };

    },
    created(){

      //获取路由信息
      this.Https.post("/api/comm/menu",{

        rolesId: '',

        isAll: false

      }).then(res=>{

        this.MenuData = res.data;

      });
      //获取路由键值对
      let dataUrl = "./RouterInfo.conf.json";

      this.Https.get(dataUrl)

        .then((res)=>{

          this.RouterInfos = res.data;

        })

        .catch((er) =>{

          console.log(er);

        });

      this.heightVal = this.$Height;

      window.onresize = () =>{

        _this.heightVal = window.innerHeight - 54 - 68;

      };

      this.MenuCoordinate = [0, 0, 0];

    },

    methods   : {}

  };

</script>

<style lang="scss" scoped>

  .layout{

    min-height: 100%;

    width: 100%;

    min-width: 1300px;

    overflow: auto;

    /deep/ .ivu-layout-sider-children{

      height: 100%;
    }
    .slider{

      width: 206px;

      float: left;
    }

    .content{

      background: #f7f7f7;

      /*min-height: 100%;*/

      /*height: 100%;*/

      float: left;

      box-shadow: 0px 5px 22px 0px rgba(57, 72, 95, 0.2) inset;

      /*width:-webkit-calc(100% - 206px);*/

      padding: 30px 42px 90px 42px;

      padding-bottom: 20px;

      overflow: hidden;

    }

  }

</style>

