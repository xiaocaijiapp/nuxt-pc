<template>
  <div class="myBill">
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
        <BreadcrumbItem>{{getLanguageData.nextText.myAccount}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <p class="title">
        {{getLanguageData.nextText.myAccount}}
      </p>
      <div class="billbox">
        <div v-if="JSON.stringify(currentMonth) !== '{}'" class="leftbox">
          <p class="lefttitle">
            <span v-if="currentMonth.billState === 1">
              {{getLanguageData.nextText.currentWaitPay}}（円）
            </span>
            <span v-if="currentMonth.billState === 0">
              {{getLanguageData.nextText.nextMonthAdd}}（円）
            </span>
            <span v-if="currentMonth.billState === 2">
              {{getLanguageData.nextText.alreadyPayPrice}}（円）
            </span>
            <span v-if="currentMonth.billState === 3">
              {{getLanguageData.nextText.alreadyOver}}（円）
            </span>
          </p>
          <div class="leftPrice">
            <span v-if="currentMonth.billState === 0">
              {{currentMonth.billAmount || 0}}
            </span>
            <span v-else>
              {{currentMonth.waitRepayAmount || 0}}
            </span>
          </div>
          <p class="datebox">
            {{getLanguageData.nextText.settleDay}}{{currentMonth.settleDay}}
          </p>
          <div>
            <Button v-if="currentMonth.billState === 1 || currentMonth.billState === 3" type="primary" @click="$router.push('/personal/reimbursement?billNumber=' + currentMonth.billNumber + '&waitRepayAmount=' + currentMonth.billAmount)">{{getLanguageData.nextText.immediatelyPay}}</Button>
            <Button style="margin-left:20px;" @click="goDetialPage(currentMonth.billNumber, 0)">{{getLanguageData.nextText.detialText}}</Button>
          </div>
        </div>
        <div v-else class="settlebox">
          <p class="settleTitle">{{getLanguageData.nextText.currentMonthAlry}}</p>
          <div>
            <Button @click="goDetialPage(currentMonth.billNumber, 0)">{{getLanguageData.nextText.detialText}}</Button>
          </div>
        </div>
        <div class="rightbox" v-if="JSON.stringify(nextMonth) !== '{}'">
          <p class="rightTitle">
            <!-- {{getLanguageData.nextText.nextMonthAdd}} -->
            {{nextMonth.billDay.split('-')[1] * 1}}{{getLanguageData.nextText.mouthNum}}
            <span v-if="nextMonth.billState === 0">
              {{getLanguageData.nextText.adding}}
            </span>
            <span v-if="nextMonth.billState === 1">
              {{getLanguageData.nextText.nextWaitPay}}
            </span>
            <span v-if="nextMonth.billState === 2">
              {{getLanguageData.nextText.alreadyPayPrice}}
            </span>
            <span v-if="nextMonth.billState === 3">
              {{getLanguageData.nextText.alreadyOver}}
            </span>
          </p>
          <p v-if="JSON.stringify(nextMonth) !== '{}'" class="rightPrice">
            <span v-if="nextMonth.billState === 0">
              {{getLanguageData.nextText.alreadyAdd}}
            </span>
            <span v-if="nextMonth.billState === 1">
              {{getLanguageData.nextText.currentWaitPay}}
            </span>
            <span v-if="nextMonth.billState === 2">
              {{getLanguageData.nextText.alreadyPayPrice}}
            </span>
            <span v-if="nextMonth.billState === 3">
              {{getLanguageData.nextText.alreadyOver}}
            </span>
            {{nextMonth.billAmount || 0}}門，{{getLanguageData.nextText.settleDay}}{{nextMonth.settleDay}}
          </p>
          <p v-else class="rightPrice">
            {{getLanguageData.nextText.noPayPrice}}
          </p>
          <div v-if="JSON.stringify(nextMonth) !== '{}'">
            <Button v-if="nextMonth.billState === 1 || nextMonth.billState === 3" type="primary" @click="$router.push('/personal/reimbursement?billNumber=' + nextMonth.billNumber + '&waitRepayAmount=' + nextMonth.billAmount)">{{getLanguageData.nextText.immediatelyPay}}</Button>
            <Button style="margin-left:20px;" @click="goDetialPage(nextMonth.billNumber, 1)">{{getLanguageData.nextText.detialText}}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'myBill',
  middleware: 'auth',
  data () {
    return {
      currentMonth: {},
      nextMonth: {}
    }
  },
  mounted () {
    this.getListInfo()
  },
  methods: {
    // 获取账单列表
    getListInfo () {
      const vm = this
      vm.$axios({
        url: 'starday-pay/payNextMonth/myBillList',
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          vm.currentMonth = res.data[0] || {}
          vm.nextMonth = res.data[1] || {}
        }
      })
    },
    goDetialPage (num, str, billState) {
      this.$router.push('/personal/billDetail?billNumber=' + num + '&str=' + str)
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
  .myBill{
    /deep/.ivu-btn{
      width: 115px;
    }
    .content{
      padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      .billbox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 24px;
        padding: 30px 40px;
        border: 1px solid #e0e0e0;
        .leftbox{
          flex: 1;
          .lefttitle{
            font-size: 22px;
            font-weight: 500;
            color: #333333;
          }
          .leftPrice{
            margin-top: 10px;
            font-size: 38px;
            font-weight: 500;
            color: #e76636;
          }
          .datebox{
            margin-bottom: 20px;
            font-size: 12px;
            font-weight: 500;
            color: #999;
          }
        }
        .settlebox{
          flex: 1;
          text-align: center;
          .settleTitle{
            margin-bottom: 20px;
            font-size: 22px;
            font-weight: 500;
            color: #333333;
          }
        }
        .rightbox{
          flex: 1;
          border-left: 1px solid #e0e0e0;
          text-align: center;
          .rightTitle{
            font-size: 22px;
            font-weight: 500;
            color: #333;
          }
          .rightPrice{
            margin: 10px 0 20px;
            font-size: 18px;
            font-weight: 500;
            color: #999;
          }
        }
      }
    }
  }
</style>
