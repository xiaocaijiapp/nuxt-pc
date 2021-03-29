<template>
  <div class="billDetail">
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
        <BreadcrumbItem>{{getLanguageData.nextText.detialText}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="leftbox">
        <p>{{monthNum}}{{getLanguageData.nextText.mouthNum}}{{getLanguageData.nextText.accountList}}</p>
        <div class="pricebox">
          <div class="title">
            <span v-if="currentMonth.billState === 1">
              {{monthNum}}{{getLanguageData.nextText.mouthNum}}{{getLanguageData.nextText.shouldPay}}（円）
            </span>
            <span v-if="currentMonth.billState === 0">
              {{getLanguageData.nextText.nextMonthAdd}}（円）
            </span>
            <span v-if="currentMonth.billState === 2">
              {{getLanguageData.nextText.billAccountPay.replace('N', monthNum)}}（円）
            </span>
            <span v-if="currentMonth.billState === 3">
              {{monthNum}}{{getLanguageData.nextText.mouthNum}}{{getLanguageData.nextText.shouldPay}}（円）
            </span>
          </div>
          <div class="price">
            <!-- <span v-if="currentMonth.billState === 0">
              {{currentMonth.billAmount || 0}}
            </span> -->
            <span>
              {{currentMonth.billAmount || 0}}
            </span>
          </div>
          <div class="datebox" v-if="currentMonth.settleDay">
            <span v-if="currentMonth.billState === 1">
              {{getLanguageData.nextText.settleDay}}{{currentMonth.settleDay}}
            </span>
            <p class="overbox" v-if="currentMonth.billState === 3">
              <img src="@/assets/images/personal/waning.png" alt="">
              <span>
                <!-- 已逾期{{currentMonth.overdueDays || 0}}天 -->
                {{getLanguageData.nextText.alreadyOverDay.replace('N', (currentMonth.overdueDays || 0))}}
              </span>
            </p>
          </div>
          <div v-if="currentMonth.billState === 1 || currentMonth.billState === 3">
            <Button type="primary" @click="$router.push('/personal/reimbursement?billNumber=' + currentMonth.billNumber + '&waitRepayAmount=' + currentMonth.billAmount)">{{getLanguageData.nextText.immediatelyPay}}</Button>
          </div>
        </div>

        <div class="footbox">
          <p class="tabletitle">
            {{monthNum}}{{getLanguageData.nextText.mouthNum}}{{getLanguageData.nextText.billDetail}}
          </p>
          <div class="tablebox">
            <Table :show-header="false" stripe :columns="columns1" :data="tableData1">
              <template slot-scope="{ row }" slot="orderNumber">
                <span :style="row.type === 0 ? 'cursor:pointer;' : ''" @click="goOrderDetail(row)">{{getLanguageData.nextText.orderNum}}：{{row.orderNumber}}</span>
              </template>
              <template slot-scope="{ row }" slot="payAmount">
                <span>￥{{row.type === 1 ? '-' : ''}}{{row.payAmount}}</span>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'billDetail',
  middleware: 'auth',
  data () {
    return {
      columns1: [
        {
          key: 'createTime',
          align: 'center'
        },
        {
          slot: 'orderNumber',
          align: 'center',
          width: 300
        },
        {
          slot: 'payAmount',
          align: 'center'
        }
      ],
      tableData1: [],
      currentMonth: {},
      strnum: 0,
      monthNum: 0
      // billState: 0
    }
  },
  mounted () {
    if (this.$route.query.billNumber) {
      this.getListInfo1(this.$route.query.billNumber)
    }
    if (this.$route.query.str) {
      this.strnum = this.$route.query.str * 1
    }
    // if (this.$route.query.billState) {
    //   this.billState = this.$route.query.billState * 1
    // }
    this.getListInfo()
  },
  methods: {
    goOrderDetail (row) {
      if (row.type === 0) {
        this.$router.push('/order/orderdetail?orderNumber=' + row.orderNumber)
      }
    },
    getListInfo () {
      const vm = this
      vm.$axios({
        url: 'starday-pay/payNextMonth/myBillList',
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          if (vm.strnum === 0) {
            vm.currentMonth = res.data[0] || {}
          } else {
            vm.currentMonth = res.data[1] || {}
          }
        }
        // console.log('vm.currentMonth----', vm.currentMonth)
        vm.monthNum = vm.currentMonth.billDay.split('-')[1] * 1
      })
    },
    getListInfo1 (num) {
      const vm = this
      vm.$axios({
        url: 'starday-pay/payNextMonth/myBillFlowList',
        method: 'post',
        data: {
          billNumber: num
        }
      }).then((res) => {
        if (res.code === 200) {
          vm.tableData1 = res.data.myBillFlowResDtoList || []
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
  .billDetail{
    .content{
      display: flex;
      justify-content: flex-start;
      padding: 24px 40px;
      background-color: #fff;
      .leftbox,.rightbox{
        flex: 1;
        p{
          font-weight: 500;
          color: #333;
        }
        .pricebox{
          min-height: 232px;
          margin-top: 24px;
          padding: 30px 40px;
          border: 1px solid #e0e0e0;
          .rightPrice{
            margin: 10px 0 20px;
            font-size: 18px;
            font-weight: 500;
            color: #999;
          }
          .title{
            font-size: 22px;
            font-weight: 500;
            color: #333;
          }
          .price{
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
            .overbox{
              font-size: 12px;
              color: #e76636;
              img{
                margin-right: 4px;
                vertical-align: middle;
              }
              span{
                vertical-align: middle;
              }
            }
          }
        }
        .footbox{
          margin-top: 40px;
          .tabletitle{
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }
          .tablebox{
            margin-top: 24px;
          }
        }
      }
      .rightbox{
        margin-left: 40px;
      }
    }
  }
</style>
