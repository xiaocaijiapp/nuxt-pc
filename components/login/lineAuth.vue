<template>
  <div class="lineauth">
    <div class="maskcontent">
      <div class="lineheader">
        <div class="lineimg">
          <img src="@/assets/images/login/lineau.png" alt="">
          <p>LINE</p>
        </div>
        <div class="changeimg">
          <img src="@/assets/images/login/change.png" alt="">
        </div>
        <div class="lineimg">
          <img src="@/assets/images/login/stardayau.png" alt="">
          <p>Starday</p>
        </div>
      </div>
      <div class="aucontent">
        <p>{{ getLanguageData.lineau.asksure }}</p>
        <p>{{ getLanguageData.lineau.listo }}</p>
        <p>{{ getLanguageData.lineau.listt }}</p>
      </div>
      <div class="btncontent">
        <p @click="sureHandle">
          {{ getLanguageData.lineau.sureAuth }}
        </p>
        <p @click="cancleHandle">
          {{ getLanguageData.lineau.cancleAuth }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LineAuth',
  methods: {
    sureHandle () {
      const _url = location.origin + '/login/thirdparty'
      location.href = 'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=\n' +
          '1654155216&redirect_uri=' + _url + '&state=12345abcde&scope=profile%20openid%20email&nonce=09876xyz'
    },
    cancleHandle () {
      this.$emit('hideAuthModal')
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    })
  }
}
</script>

<style scoped lang="scss">
  .lineauth{
    position: fixed;
    z-index: 99999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    text-align: center;
    .maskcontent{
      display: inline-block;
      margin-top: 130px;
      width: 580px;
      height: 606px;
      box-sizing: border-box;
      background-color: #F2F2F2;
      border-radius: 10px;
      padding: 60px;
      .lineheader{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        img{
          width: 60px;
          height: 60px;
        }
        .changeimg{
          margin: 20px 40px 0;
          img{
            width: 30px;
            height: 30px;
          }
        }
      }
      .aucontent{
        border-top: 1px solid #DEDEDE;
        text-align: left;
        p:nth-of-type(1){
          font-size:18px;
          font-weight:400;
          color:rgba(51,51,51,1);
          padding: 20px 0 30px 0;
        }
        p:nth-of-type(2),p:nth-of-type(3){
          font-size:16px;
          font-weight:400;
          color:#666666;
          margin-bottom: 14px;
        }
      }
      .btncontent{
        margin-top: 50px;
        p{
          display: inline-block;
          width: 260px;
          height: 54px;
          border-radius:6px;
          color: #FFFFFF;
          font-size: 18px;
          text-align: center;
          line-height: 54px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        p:nth-of-type(1){
          background-color: #E76636;
        }
        p:nth-of-type(2){
          background-color: #BBBBBB;
        }
      }
    }
  }
</style>
