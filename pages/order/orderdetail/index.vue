<template>
  <div class="orderdetail">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'order/orderlist'">
          {{getLanguageData.cencelText.myOrder}}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{getLanguageData.orderText.viewOrderDetail}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="orderdetail_container">
      <section class="orderdetail_title">
        {{getLanguageData.evaluateText.orderDetial}}
      </section>
      <section class="detail_info1">
        <div>{{getLanguageData.receiptText.receiptAdress}}: {{addressObj.address}}{{addressObj.deliveryAddress}}</div>
        <div>{{getLanguageData.evaluateText.orderNumber}}: {{orderDetailData.pOrderNumber}}</div>
        <div>
          {{getLanguageData.evaluateText.payPrice}}: <span>{{orderDetailData.payAmount}}</span>
          <b style="font-weight:400;font-size: 12px;color:#E76636">円</b>
        </div>
        <div>{{getLanguageData.checkoutcounter.paytype}}: <span>{{payChannle}}</span></div>
        <div>{{getLanguageData.evaluateText.placeOrderTime}}:  {{orderDetailData.createTime}}</div>
      </section>
      <section class="head">
        <div class="title">
          {{getLanguageData.evaluateText.orderInfo}}
        </div>
        <div class="title">
          {{getLanguageData.goodsText.stockNum}}
        </div>
        <div class="title">
          {{getLanguageData.evaluateText.receiverPerson}}
        </div>
        <div class="title">
          {{getLanguageData.evaluateText.payPrice}}
        </div>
        <div class="title">
          {{getLanguageData.emailText.state}}
        </div>
      </section>
      <section class="orderinfo" v-for="(item, index) in orderDetailData.goodsInfoList" :key="index">
        <div class="ordeno">
          {{getLanguageData.evaluateText.orderNumber}}: {{item.orderNumber}}
        </div>
        <div class="info_item2" >
          <div class="info">
            <div class="img_box">
              <img :src="getImageBasePath + item.goodsSkuImg" alt="">
            </div>
            <div class="right_info">
              <Poptip trigger="hover" word-wrap width="250" :content="item.goodsTitle">
                <section class="info_1">
                  {{item.goodsTitle}}
                </section>
              </Poptip>
              <section class="info_2">
                <div>{{item.goodsSkuVal}}</div>
                <div></div>
              </section>
            </div>
          </div>
          <div class="info">
            {{item.buyNumber}}
          </div>
          <div class="info">
            {{orderDetailData.addressMap.realName}}
          </div>
          <div class="info">
            {{item.payAmount}} 円
          </div>
          <div class="info">
            {{orderDetailData.orderState===1? getLanguageData.evaluateText.waitPay:(orderDetailData.orderState===2?getLanguageData.evaluateText.waitSure:(orderDetailData.orderState===3?getLanguageData.evaluateText.waitShip:(orderDetailData.orderState===4? getLanguageData.evaluateText.waitReceipt :(orderDetailData.orderState===5?getLanguageData.evaluateText.alreadReceipt:(orderDetailData.orderState===6?getLanguageData.evaluateText.alreadcompleted:(orderDetailData.orderState===7?getLanguageData.evaluateText.tranClose:''))))))}}
          </div>
        </div>
      </section>
      <section class="detail_info2">
        <section>
          <div>
            <span>{{getLanguageData.evaluateText.goodTotalPrice}}:</span>
            <span>{{orderDetailData.amount}}</span>
            <b style="font-size: 12px">円</b>
          </div>
          <div>
            <span>{{getLanguageData.evaluateText.couponOnly}}:</span>
            <span>-{{orderDetailData.couponAmount}}</span>
            <b style="font-size: 12px">円</b>
          </div>
<!--          <div>-->
<!--            <span>满减:</span>-->
<!--            <span>-</span>-->
<!--          </div>-->
          <div>
            <span>{{getLanguageData.evaluateText.countdeduction}}:</span>
            <span>-{{orderDetailData.integral}}</span>
            <b style="font-size: 12px">円</b>
          </div>
          <div>
            <span>{{getLanguageData.evaluateText.discountAmount}}:</span>
            <span>-{{orderDetailData.discountAmount}}</span>
            <b style="font-size: 12px">円</b>
          </div>
          <div>
            <span>{{getLanguageData.evaluateText.totalFreight}}:</span>
            <span>{{orderDetailData.freight}}</span>
            <b style="font-size: 12px">円</b>
          </div>
          <div>
            <span>{{getLanguageData.evaluateText.needPay}}:</span>
            <span class="amout_span">{{orderDetailData.payAmount}}</span>
            <b style="font-size: 15px;color:#E76636">円</b>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  middleware: 'auth',
  data () {
    return {
      orderDetailData: {},
      address: '',
      orderState: '',
      addressObj: {}
    }
  },
  mounted () {
    this.orderState = this.$route.query.orderState * 1
    this.requestOrderDeatils()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    payChannle () {
      const _this = this
      let payChannle = ''
      switch (_this.orderDetailData.payChannel) {
        case 0:
          payChannle = '0円' + this.getLanguageData.myCouponText.payText
          break
        case 1:
          payChannle = this.getLanguageData.orderText.balancePay
          break
        case 2:
          payChannle = this.getLanguageData.orderText.creditCardPayment
          break
        case 3:
          payChannle = this.getLanguageData.checkoutcounter.banlipay
          break
        case 4:
          payChannle = 'payPal' + this.getLanguageData.myCouponText.payText
          break
        case 5:
          payChannle = this.getLanguageData.orderText.balance + '+' + this.getLanguageData.orderText.creditCardPayment
          break
        case 6:
          payChannle = this.getLanguageData.orderText.balance + '+' + this.getLanguageData.checkoutcounter.banlipay
          break
        case 7:
          payChannle = this.getLanguageData.orderText.balance + '+payPal'
          break
        case 8:
          payChannle = this.getLanguageData.orderText.creditCardPayment
          break
        case 9:
          payChannle = this.getLanguageData.orderText.balance + '+' + this.getLanguageData.orderText.creditCardPayment
          break
        case 10:
          payChannle = this.getLanguageData.placeOrder.cod
          break
        case 11:
          payChannle = this.getLanguageData.orderText.creditCardPayment
          break
        case 12:
          payChannle = this.getLanguageData.orderText.balance + '+' + this.getLanguageData.orderText.creditCardPayment
          break
        case 13:
          payChannle = this.getLanguageData.nextText.nextPay
          break
        default:
          payChannle = '--'
      }
      return payChannle
    }
  },
  methods: {
    requestOrderDeatils () {
      const _this = this
      if (this.orderState === 1 || this.orderState === 2) {
        _this.$axios.get('starday-order/myOrder/info/toPay/' + _this.$route.query.orderNumber).then((res) => {
          if (res.code === 200) {
            _this.orderDetailData = res.data
            _this.addressObj = res.data.addressMap
          }
        })
      } else {
        _this.$axios.get('starday-order/myOrder/info/paid/' + _this.$route.query.orderNumber).then((res) => {
          if (res.code === 200) {
            _this.orderDetailData = res.data
            _this.addressObj = res.data.addressMap
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.orderdetail {
  .orderdetail_container {
    .detail_info1 {
      padding: 10px 30px 20px;
      border: 1px solid #e0e0e0;
      margin-top: 40px;
      div {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        margin-top: 10px;
        span {
          color: #E76636;
          font-size: 14px;
        }
      }
    }
    .head {
      height: 46px;
      display: flex;
      background: #e0e0e0;
      margin-top: 20px;
      .title {
        width: 200px;
        font-size: 12px;
        color: #333;
        line-height: 46px;
        text-align: center;
      }
      .title:nth-of-type(1) {
        width: 556px;
      }
    }
    .orderinfo {
      .ordeno {
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        line-height: 40px;
        padding-left: 20px;
      }
      .info_item2 {
        height: 140px;
        display: flex;
        border: 1px solid #e0e0e0;
        .info {
          width: 200px;
          height: 140px;
          border-right: 1px solid #e0e0e0;
        }
        .info:nth-of-type(1) {
          width: 556px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 50px;
          .img_box {
            width: 100px;
            height: 100px;
            background: #e0e0e0;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right_info {
            width: 353px;
            height: 100px;
            .info_1 {
              width: 353px;
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .info_2 {
              display: flex;
              justify-content: space-between;
              >div {
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
              }
              >div:nth-of-type(1) {
                color: #666666;
                text-align: left;
              }
              >div:nth-of-type(2) {
                color: #333333;
                text-align: right;
              }
            }
          }
        }
        .info:not(:first-child){
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
        }
        .info:last-child {
          border-right: none;
        }
      }
    }
    .detail_info2 {
      height: 200px;
      background: #e0e0e0;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      section {
        div {
          text-align: right;
          line-height: 28px;
          padding-right: 40px;
          span {
            display: inline-block;
            width: 95px;
            height: 20px;
            font-size: 14px;
            text-align: right;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          b {
            font-weight: 400;
          }
          .amout_span {
            font-size: 20px;
            color: #E76636;
          }
        }
      }
    }
  }
}
</style>
