<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "SelectTem">

    <div class = "Select-test-questions-title">

      <p>{{selectData.title}}</p>

    </div>

    <div class = "Select-test-questions-operation">

      <div class = "SelectItemWarp"  v-for="(item,index) in selectData.max" :key = "index+1">

        <van-cell-group >

          <van-field

            class = "itemWarp"

            v-model="selectData.value[index].title"

            :label="index | textFn"

            placeholder="请选择"

            :error-message = "selectData.value[index].message"

            rows="1"

            autosize

            @blur = "onBlur(selectData.value[index],index,selectData.subscript)"

            @focus = "onFocus(selectData.value[index],index,selectData.subscript)"

          >

            <van-icon v-if = "selectData.value[index].title" slot="button" name="close" @click = "clickRightIcon(selectData.value[index])"/>

          </van-field>

        </van-cell-group>

        <div class = "Remarks-div">

          <van-cell-group>

            <van-field

              v-model="selectData.value[index].remarks.value"

              type="textarea"

              label="入选理由："

              placeholder="请输入留言"

              rows="1"

              :error-message ="selectData.value[index].remarks.message"

              @blur = "RemarksOnBlur(selectData.value,selectData.value[index].title,selectData.value[index].remarks)"

              :autosize = "{maxHeight:200,minHeight:100}"

              :required = "data.remarks.force_explanation ? true : false "

              :label-align = "center"

            >

            </van-field>

          </van-cell-group>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

  import fs from '../../../extend/fs'

  export default {

    props:['data','inputValue','overallLnegth'],

    data () {

      return {

          selectData:{

            subscript:null,

            title:null,

            max:null,

            min:null

          },

          itemIndex:0,

      }
    },
    watch:{

      data(n){

        this.selectData = n;

      }

    },
    mounted () {

      this.initialize();

    },
    filters:{

      textFn(val){

        return `选项${val+1}：`;

      }

    },
    methods: {

      //初始化
      initialize(){

          this.selectData = this.$props.data;

      },
      //失去焦点
      onBlur(item,index,subscript){

        this.itemIndex = "";

        this.$emit('on-focus',true,index,subscript);

      },
      //获取焦点
      onFocus(item,index,subscript){

        this.itemIndex = index;

        this.$emit('on-focus',true,index,subscript);

        document.activeElement.blur();

      },
      //富文本失去焦点
      RemarksOnBlur(data,title,obj){

        obj.value.replace(/\s+/g,"");

        if( obj.force_explanation || title ){

          if(!obj.value){

            obj.message = "格式错误！";

            return

          }else{

            if(this.$fs.isChinese(obj.value)){

              obj.message = "格式错误！";

              return

            }else{

              obj.message = "";

              return

            }

          }

        }

      },

      clickRightIcon(data){

        data.title = "";

      }

    }

  }
</script>

<style scoped lang="scss">

  .van-hairline--top-bottom::after{

    border: none;

  }

  .van-hairline--bottom::after{

    border: none;
  }

  .SelectTem{

    background: #fafafa;

    .Select-test-questions-title{

      background-color: #ffffff;

      margin-top: 10px;

      p{

        margin-bottom: 10px;

        padding: 10px 10px;

        font-size: 16px;

      }

    }

    .Select-test-questions-operation{

      .SelectItemWarp{

        background-color: #fafafa;

        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

        margin-top: 10px;

      }

      .itemWarp{

        font-size: 14px;

      }

    }
  }
</style>
