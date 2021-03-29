<template>
  <div class="emailModal">
    <div v-if="showModal" class="body">
      <div class="modelBox">
        <div class="closeBox">
          <img src="@/assets/images/common/closeBtn.png" alt="" @click="closeModal">
        </div>
        <div class="constentbox">
          <div class="title">
            <p>{{ emailInfo.title }}</p>
          </div>
          <div class="bodybox">
            <div class="bodyboxTitle">
              <div>
                <span>{{ getLanguageData.goodsText.userSendEmail }}：</span>
                <span>{{ emailInfo.sendUserName }}{{ emailInfo.sendMail }}</span>
              </div>
              <div>
                <span>{{ getLanguageData.emailText.timer }}：</span>
                <span>{{ emailInfo.sendTime }}</span>
              </div>
            </div>
            <div class="footbody">
              <p>{{ emailInfo.detail }}</p>
              <div v-if="emailInfo.attachments" class="detailimg" style="margin-top: 30px">
                <img v-for="(item,index) in emailInfo.attachments.split(',')" :key="index" style="max-width: 500px" :src="getImageBasePath + item" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="btnbox">
          <div class="btn" @click="closeModal">
            {{ getLanguageData.emailText.sureButton }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EmailModal',
  props: ['showModal', 'emailInfo'],
  data () {
    return {
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeEmail')
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath'
    })
  }
}
</script>
<style lang="scss" scoped>
.emailModal {
    .body{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
        .modelBox {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 700px;
            height: 500px;
            padding: 6px;
            background-color: #fff;
            border-radius: 6px;
            .closeBox{
                text-align: right;
                img{
                    width: 20px;
                    cursor: pointer;
                }
            }
            .constentbox{
                margin: 0 40px;
                .title {
                    p{
                        font-size: 18px;
                        font-weight: 500;
                        color: #333333;
                    }
                }
                .bodybox{
                    overflow: hidden;
                    overflow-y: scroll;
                    width: 100%;
                    height: 286px;
                    margin-top: 20px;
                    padding:14px 10px;
                    background-color: #f3f4f6;
                    .bodyboxTitle{
                        display: flex;
                        justify-content: flex-start;
                        >div{
                            flex: 1;
                            span{
                                font-size: 10px;
                                color: #666666;
                            }
                        }
                    }
                    .footbody{
                        margin-top: 12px;
                        font-size: 12px;
                        color: #333333;
                    }
                }
            }
            .btnbox{
                .btn{
                    width: 240px;
                    height: 40px;
                    margin: 20px auto 0;
                    background: #e76636;
                    border-radius: 2px;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
