<template>
  <div class="nextpay">
    <div class="breadbox">
      <!-- {{ listData }} -->
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{ getLanguageData.emailText.personalInfo }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.nextText.nextPay}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <p class="title">{{getLanguageData.nextText.nextPay}}</p>
      <div v-if="info.monthlyPayOpen === 0" class="quotabox">
        <div v-if="info.monthlyPayStatus === 0">
          <p class="canuse">
            {{getLanguageData.nextText.canUsePrice}}(円)
          </p>
          <div class="pricebox">
            {{info.availableCredit || 0}}
          </div>
          <p class="repayment" v-if="settleDay">
            {{getLanguageData.nextText.settleDay}}{{settleDay}}
          </p>

          <div class="otherbox">
            <span @click="$router.push('/personal/myBill')">{{getLanguageData.nextText.myAccount}}</span>
            <span>|</span>
            <span @click="$router.push('/personal/verification')">{{getLanguageData.nextText.validationInfo}}</span>
          </div>
        </div>
        <div v-if="info.monthlyPayStatus === 1" class="timeout">
          <p>{{getLanguageData.nextText.noUseNextPay}}</p>
          <p>{{getLanguageData.nextText.timeOutNoPay}}</p>
          <Button type="primary" @click="$router.push('/personal/myBill')">{{getLanguageData.nextText.immediatelyPay}}</Button>
          <div class="otherbox">
            <span @click="$router.push('/personal/myBill')">{{getLanguageData.nextText.myAccount}}</span>
            <span>|</span>
            <span @click="$router.push('/personal/verification')">{{getLanguageData.nextText.validationInfo}}</span>
          </div>
        </div>
        <div v-if="info.monthlyPayStatus === 2" class="blackout">
          <p>{{getLanguageData.nextText.noUseNextPay}}</p>
          <p>{{getLanguageData.nextText.noUse}}！</p>
        </div>
      </div>
      <div v-else class="quotabox">
        <Button type="primary" @click="$router.push('/personal/verification')">{{getLanguageData.nextText.goOpen}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nextpay',
  middleware: 'auth',
  data () {
    return {
      info: {},
      settleDay: ''
    }
  },
  mounted () {
    this.getQuotaInfo()
    this.getMySettleDay()
  },
  methods: {
    // 查询次月付额度
    getQuotaInfo () {
      const vm = this
      vm.$axios({
        url: 'starday-user/user/monthly/pay/credit/info',
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          vm.info = res.data
        }
      })
    },
    // 获取我的额度
    getMySettleDay () {
      const vm = this
      vm.$axios({
        url: 'starday-pay/payNextMonth/mySettleDay',
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          vm.settleDay = res.data
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  }
}
</script>
<style lang="scss" scoped>
  .nextpay{
    .content{
      padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }
      .quotabox{
        margin-top: 24px;
        padding: 30px 40px;
        border: 1px solid #e0e0e0;
        .canuse{
          font-size: 22px;
          font-weight: 500;
          color: #333333;
        }
        .pricebox{
          margin-top: 10px;
          font-size: 38px;
          font-weight: 500;
          color: #e76636;
        }
        .repayment{
          font-size: 12px;
          font-weight: 500;
          color: #999;
        }
        .otherbox{
          margin-top: 20px;
          span {
            cursor: pointer;
            font-size: 12px;
            font-weight: 400;
            color: #333;
          }
          span:nth-of-type(2){
            margin: 0 10px;
          }
        }
        .timeout{
          p {
            font-size: 22px;
            font-weight: 500;
            color: #333333;
          }
          p:nth-of-type(2){
            margin:10px 0;
            font-size: 18px;
            font-weight: 500;
            color: #999999;
          }
          .otherbox{
            margin-top: 20px;
            span {
              cursor: pointer;
              font-size: 12px;
              font-weight: 400;
              color: #333;
            }
            span:nth-of-type(2){
              margin: 0 10px;
            }
          }
        }
        .blackout{
          p {
            font-size: 22px;
            font-weight: 500;
            color: #333;
          }
          p:nth-of-type(2){
            margin-top: 10px;
            font-size: 18px;
            font-weight: 500;
            color: #ff5d19;
          }
        }
      }
    }
  }
</style>
