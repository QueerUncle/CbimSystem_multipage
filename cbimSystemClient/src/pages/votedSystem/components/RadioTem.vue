<!--
 -  2019/1/14  lize
 -->
<template>

  <div class = "RadioTem">

    <div class = "Radio-test-questions-title">

      <p>{{data.title}}</p>

    </div>

    <div class = "Radio-test-questions-operation">

      <van-radio-group v-model="data.value[0].radio" class="demo-radio-group">

        <van-radio v-for="(item,index) in data.content" :name="item" :key = "index+1">{{item.title}}</van-radio>

      </van-radio-group>

    </div>

    <div class = "Remarks-div">

      <van-cell-group>

        <van-field

          v-model="data.remarks.value"

          type="textarea"

          label="入选理由："

          placeholder="请输入留言"

          rows="1"

          :error-message ="data.remarks.message"

          @blur = "RemarksOnBlur(data.remarks)"

          :autosize = "{maxHeight:200,minHeight:100}"

          :required = "data.remarks.force_explanation ? true : false "

          :label-align = "center"

        >

        </van-field>

      </van-cell-group>

      <!--<mu-text-field-->

        <!--style = "width: 100%;"-->

        <!--:error-text = "data.remarks.message"-->

        <!--@change = "RemarksOnBlur(data.remarks)"-->

        <!--multi-line-->

        <!--:rows="3"-->

        <!--:rows-max="6"-->

        <!--v-model="data.remarks.value">-->

        <!--<div slot = "prepend" style="width: 40%">-->

          <!--<span v-if="data.remarks.force_explanation" style="color: red">*</span>-->

          <!--<span>入选理由</span>-->

        <!--</div>-->

      <!--</mu-text-field>-->

    </div>

  </div>

</template>

<script>
    export default {
        props:['data','overallLnegth'],

        data () {
            return {}
        },
        mounted () {

        },
        methods: {

          //富文本失去焦点
          RemarksOnBlur(obj){

            obj.value.replace(/\s+/g,"");

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

          },

        }

    }
</script>

<style scoped lang="scss">

  .van-radio{

    border: none;

  }

  .RadioTem{

    background: #ffffff;

    .Radio-test-questions-title{

      p{

        margin-bottom: 10px;

        padding: 10px 10px;

        font-size: 16px;

      }

    }

  }

  .van-cell{

    border-bottom: 1px solid #ebedf0;

  }
  .Radio-test-questions-operation{

    padding: 0 15px;

    .van-radio-group{

      .van-radio{

        margin-bottom: 10px;

        padding: 10px 0;

      }

    }

  }

  .van-radio{

    margin-bottom: 20px;

  }
  .Remarks-div{

    margin-top: 30px;

    padding: 0 10px;

  }
</style>
