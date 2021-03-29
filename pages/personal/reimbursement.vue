<template>
  <div class="reimbursement">
    <div class="breadbox">
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
      <p class="title">
        {{getLanguageData.nextText.selePayType}}
      </p>
      <div class="listbox">
        <div class="itembox" v-for="(item,index) in listData" :key="index" @click="changeSelectType(item)">
           <img
              v-if="paytypeCode === item.paytypeCode"
              src="@/assets/images/placeorder/selectedtype.png"
              alt=""
              class="radioimg"
            >
            <img v-else src="@/assets/images/placeorder/select.png" alt="" class="radioimg">
          <span class=".label">{{getLanguage === 'zh' ? item.paytypeName.split('|')[0] : item.paytypeName.split('|')[1]}}</span>
          <span v-if="item.imgUrlList && item.imgUrlList.length" class="label">
            <img v-for="(imgitem,imgindex) in item.imgUrlList" :key="imgindex" :src="getImageBasePath + imgitem" alt="">
          </span>
        </div>
      </div>
      <div class="btnbox">
        <div @click="goReimburse">
          {{getLanguageData.nextText.immediatelyPay}}
        </div>
      </div>
      <div class="pagebox" v-if="listData && listData.length > 10">
        <Page :total="totalRows" @on-change="changePageNo"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'reimbursement',
  middleware: 'auth',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      totalRows: 0,
      paytypeCode: '',
      listData: [],
      billNumber: '',
      waitRepayAmount: ''
    }
  },
  mounted () {
    if (this.$route.query.billNumber) {
      this.billNumber = this.$route.query.billNumber
    }
    if (this.$route.query.waitRepayAmount) {
      this.waitRepayAmount = this.$route.query.waitRepayAmount
    }
    this.getPayList()
  },
  methods: {
    // 生成12位随机数
    mockTransactionNo (length) {
      // 由以下元素组成
      const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let num = ''
      for (let i = 0; i < length; i++) {
        num += arr[parseInt(Math.random() * arr.length)]
      }
      return num
    },
    // 还款
    goReimburse () {
      const vm = this
      if (!vm.paytypeCode) {
        return vm.$Message.warning(vm.getLanguageData.checkoutcounter.selectPayType)
      }
      const _data = {
        payBalanceFlag: '',
        payChannelFlag: '1',
        terminalType: '3',
        tradeNumber: vm.billNumber,
        transFlow: vm.mockTransactionNo(12),
        channelCode: vm.paytypeCode.slice(1),
        payBackMoney: vm.waitRepayAmount + '.00',
        payBackType: '1',
        stopReturnUrl: location.href,
        url: location.origin + '/personal/refundResult'
      }
      vm.$axios({
        url: 'starday-pay/PayBackUser/payBack',
        method: 'post',
        data: _data
      }).then((res) => {
        if (res.code === 200) {
          window.open(res.data.url, '_blank')
        }
      })
    },
    // 获取还款方式的列表
    getPayList () {
      const vm = this
      const _data = {
        pageNo: vm.pageNo,
        pageSize: vm.pageSize,
        sort: 'DESC',
        terminalType: '3'
      }
      vm.$axios({
        url: 'starday-pay/CasherdeskPaytype/getValidPayBackPage',
        method: 'get',
        params: _data
      }).then((res) => {
        if (res.code === 200) {
          vm.listData = res.data.rows || []
          vm.totalRows = res.data.totalRows
        }
      })
    },
    changePageNo (num) {
      this.pageNo = num
      this.getPayList()
    },
    changeSelectType (item) {
      this.paytypeCode = item.paytypeCode
    }
  },
  computed: {
    ...mapGetters({
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getImageBasePath: 'getImageBasePath'
    })
  }
}
</script>
<style lang="scss" scoped>
  .reimbursement{
    .content{
      padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }
      .listbox{
        margin-top: 24px;
        padding: 30px 40px;
        border: 1px solid #e0e0e0;
        .itembox {
          padding: 10px 0;
          font-weight: 600;
          color: #333333;
          cursor: pointer;
          .radioimg {
            width: 18px;
            height: 18px;
            cursor: pointer;
            vertical-align: middle;
            margin-right: 32px;
          }
          .label{
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            display: inline-block;
            vertical-align: middle;
            img {
              width: 51px;
              height: 45px;
              margin-right: 5px;
            }
          }
        }
      }
      .btnbox{
        margin-top: 20px;
        text-align: right;
        >div{
          display: inline-block;
          width: 260px;
          height: 54px;
          background-color: #e76636;
          border-radius: 2px;
          font-size: 16px;
          color: #ffffff;
          cursor: pointer;
          text-align: center;
          line-height: 54px;
        }
      }
      .pagebox{
        margin-top: 20px;
        text-align: right;
      }
    }
  }
</style>
