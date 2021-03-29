<template>
  <div class="refundResult">
    <div class="breadbox">
      <!-- {{ listData }} -->
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{ getLanguageData.emailText.personalInfo }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal/nextpay'">{{getLanguageData.nextText.nextPay}}</BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal/myBill'">{{getLanguageData.nextText.myAccount}}</BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.nextText.payResult}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <p class="title">
        {{getLanguageData.nextText.nextPay}}
      </p>
      <div class="resultbox">
        <img v-if="state" src="@/assets/images/personal/paysuccess.png" alt="">
        <div v-if="state" class="fontbox">
          {{getLanguageData.nextText.paySuccess}}
        </div>
        <img v-if="!state" src="@/assets/images/personal/payerr.png" alt="">
        <div v-if="!state" class="fontbox">
          {{getLanguageData.nextText.payError}}
        </div>
        <div class="btn" @click="$router.push('/personal/nextpay')">
          {{getLanguageData.nextText.overBtn}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'refundResult',
  middleware: 'auth',
  data () {
    return {
      state: true
    }
  },
  mounted () {
    if (this.$route.query.state) {
      if (this.$route.query.state === 'true') {
        this.state = true
      } else {
        this.state = false
      }
    }
  },
  methods: {
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
  .refundResult{
    .content{
      padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }
      .resultbox{
        margin-top: 24px;
        padding: 60px 0 ;
        border: 1px solid #e0e0e0;
        text-align: center;
        .fontbox{
          margin: 22px 0 40px;
          font-size: 22px;
          color: #20232c;
        }
        .btn{
          width: 228px;
          height: 54px;
          margin: 0 auto;
          background: #e76636;
          border-radius: 6px;
          line-height: 54px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
</style>
