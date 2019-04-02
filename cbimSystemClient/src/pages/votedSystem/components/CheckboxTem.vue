<!--
 -  2019/1/14  lize
 -->
<template>
  <div class = "CheckboxTem">

    <div class = "Radio-test-questions-title">

      <p>{{data.title}}</p>

    </div>

    <div class = "checkbox-test-questions-operation">

      <van-checkbox-group v-model="data.value" :max="data.max">

        <van-checkbox v-for="(item, index) in data.content" :key="index+1" :name="item">{{item.title}}</van-checkbox>

      </van-checkbox-group>

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
  .CheckboxTem{

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
.checkbox-test-questions-operation{

  padding: 0 15px;

  .van-checkbox-group{

    .van-checkbox{

      margin-bottom: 10px;

      padding: 10px 0;

    }

  }

}
  .Remarks-div{

    margin-top: 30px;

    padding: 0 10px;

  }
</style>
