<template>
  <div class="order_container">
    <div class="head">
      <div class="title">
        {{getLanguageData.orderText.orderInfo}}
      </div>
      <div class="title">
        {{getLanguageData.orderText.consignee}}
      </div>
      <div class="title">
        {{getLanguageData.orderText.paymentAmount}}
      </div>
      <div class="title">
        {{getLanguageData.orderText.allSatus}}
      </div>
      <div class="title">
        {{getLanguageData.orderText.operation}}
      </div>
    </div>
    <div v-for="(item, index) in orderListData" :key="index" class="orderinfo">
      <div class="info_content">
        <!-- 大订单(多店铺 多商品) -->
        <div v-if="item.storeInfoList && item.storeInfoList.length" class="info_box">
          <div class="store_item1">
            <!-- 店铺 -->
            <div v-for="(storeItem, s) in item.storeInfoList" :key="s" class="store_info" :class="{'storeinfo':item.storeInfoList.length===1}">
              <div class="store_detail">
                <div class="storename">
                  <Row>
                    <Col span="12">
                      <span style="font-weight: 700;cursor: pointer" @click="$router.push('/store/' + storeItem.storeId)">{{ storeItem.storeName }}</span>
                    </Col>
                    <Col span="12">
                      <span style="color:#666;font-size:12px">{{ item.createTime }}</span>
                    </Col>
                  </Row>
                </div>
                <!-- 商品 -->
                <div v-for="(goodsItem, g) in storeItem.goodsInfoList" :key="g" class="goods_info">
                  <div class="info" @click="$router.push('/product/' + goodsItem.goodsId)">
                    <div class="img_box">
                      <img :src="getImageBasePath + goodsItem.goodsSkuImg + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
                    </div>
                    <div class="right_info">
                      <Poptip trigger="hover" word-wrap width="250" :content="goodsItem.goodsTitle">
                        <section class="info_1">
                          {{ goodsItem.goodsTitle }}
                        </section>
                      </Poptip>
                      <section class="info_2">
                        <div>{{ goodsItem.goodsSkuVal }}</div>
                        <div>×{{ goodsItem.buyNumber }}</div>
                      </section>
                    </div>
                  </div>
                  <div class="info">
                    {{ goodsItem.addressMap.realName }}
                  </div>
                  <div class="info">
                    ¥{{ goodsItem.payAmount }}
                  </div>
                </div>
              </div>
              <div class="store_status">
                <div>
                  <section class="des1">
                    {{ item.orderState===1?getLanguageData.orderText.obligation:(item.orderState===2?getLanguageData.orderText.waitConfirmed:(item.orderState===3?getLanguageData.orderText.waitSend:(item.orderState===4?getLanguageData.orderText.waitReceiving:(item.orderState===5?getLanguageData.orderText.received:(item.orderState===6?getLanguageData.orderText.completed:(item.orderState===7?getLanguageData.orderText.tradingClosed:'')))))) }}
                  </section>
                  <section class="des2" @click="$router.push('/order/orderdetail/?orderNumber=' + storeItem.pOrderNumber + '&orderState=' + item.orderState)">
                    {{getLanguageData.orderText.viewOrderDetail}}
                  </section>
                  <section v-if="item.payType===2 && item.orderState===3" class="des3" @click="cancelOrderHandle(storeItem.pOrderNumber,item.payType)">
                    {{getLanguageData.orderText.cancelOrder}}
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div class="store_item2">
            <Button v-if="(item.orderState===5 || item.orderState===6) && item.storeInfoList[0].goodsInfoList[0].orderEvaluateStatus===0" class="eva" @click="$router.push('/order/evaluate/?orderNumber=' + item.storeInfoList[0].pOrderNumber)">
              {{getLanguageData.orderText.immediatelyEvaluate}}
            </Button>
            <Button v-if="item.orderState===4" class="pay" style="margin-top: 10px" @click="confirmRecevice(item.storeInfoList[0].pOrderNumber)">
              {{getLanguageData.orderText.confirmReceipt}}
            </Button>
            <Button v-if="item.orderState===4 || item.orderState===5 || item.orderState===6" class="confirm" style="margin-top: 10px" @click="seachLogisticsHandle(item.storeInfoList[0].pOrderNumber)">
              {{getLanguageData.orderText.queryLogistics}}
            </Button>
            <Button v-if="item.orderState===1" class="pay" @click="toPayHandle(item)">
              {{getLanguageData.orderText.immediatelyPay}}
            </Button>
            <Button v-if="item.orderState===3" class="refund" @click="refundHandle">
              {{getLanguageData.cencelText.returnGood}}
            </Button>
            <Button v-if="item.orderState===2" class="confirm" style="margin-top: 10px" @click="stopPayHandle(item.tradeNumber)">
              {{getLanguageData.orderText.stopPay}}
            </Button>
            <section v-if="item.orderState===1" class="cancel" @click="cancelOrderHandle(item.tradeNumber)">
              {{getLanguageData.orderText.cancelOrder}}
            </section>
<!--            <section v-if="item.payType===2 && item.orderState===3" class="cancel" @click="cancelOrderHandle(item.tradeNumber,item.payType)">-->
<!--              {{getLanguageData.orderText.cancelOrder}}-->
<!--            </section>-->
            <section class="apply" v-if="item.orderState===5" @click="applyServiceHandle">
              {{getLanguageData.orderText.afterSale}}
            </section>
          </div>
        </div>
        <!-- 小订单(一个店铺一个商品) -->
        <div v-else class="store_info">
          <div class="storename" style="border-bottom: 1px solid #e0e0e0">
            <Row>
              <Col span="12" >
              <span style="font-weight: 700;cursor: pointer" @click="$router.push('/store/' + item.storeId)">{{ item.storeName }}</span>
              </Col>
              <Col span="12">
              <div style="text-align: right;padding-right: 20px">
                <span style="margin-right: 20px">{{ item.createTime }}</span>
              </div>
              </Col>
            </Row>
          </div>
          <div class="goods_info" style="border-top: none">
            <div class="info" @click="$router.push('/product/' + item.goodsId)">
              <div class="img_box">
                <img :src="getImageBasePath + item.goodsSkuImg + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
              </div>
              <div class="right_info">
                <Poptip trigger="hover" word-wrap width="250" :content="item.goodsTitle">
                  <section class="info_1">
                    {{ item.goodsTitle }}
                  </section>
                </Poptip>
                <section class="info_2">
                  <div>{{ item.goodsSkuVal }}</div>
                  <div>×{{ item.buyNumber }}</div>
                </section>
              </div>
            </div>
            <div class="info">
              {{ item.addressMap.realName }}
            </div>
            <div class="info" style="border-right: 1px solid #e0e0e0">
              ¥{{ item.amount }}
            </div>
            <div class="info">
              <section class="des1">
                {{ item.orderState===1?getLanguageData.orderText.obligation:(item.orderState===2?getLanguageData.orderText.waitConfirmed:(item.orderState===3?getLanguageData.orderText.waitSend:(item.orderState===4?getLanguageData.orderText.waitReceiving:(item.orderState===5?getLanguageData.orderText.received:(item.orderState===6?getLanguageData.orderText.completed:(item.orderState===7?getLanguageData.orderText.tradingClosed:'')))))) }}
              </section>
              <section class="des2" @click="$router.push('/order/orderdetail/?orderNumber=' + item.orderNumber + '&orderState=' + item.orderState)">
                {{getLanguageData.orderText.viewOrderDetail}}
              </section>
            </div>
            <div class="buttonbox">
              <Button v-if="(item.orderState===5 || item.orderState===6) && item.orderEvaluateStatus===0" class="eva" @click="$router.push('/order/evaluate/?orderNumber=' + item.orderNumber)">
                {{getLanguageData.orderText.immediatelyEvaluate}}
              </Button>
              <Button v-if="item.orderState===4" class="pay" style="margin-top: 10px" @click="confirmRecevice(item.orderNumber)">
                {{getLanguageData.orderText.confirmReceipt}}
              </Button>
              <Button v-if="item.orderState===4 || item.orderState===5 || item.orderState===6" class="eva" style="margin-top: 10px" @click="seachLogisticsHandle(item.orderNumber)">
                {{getLanguageData.orderText.queryLogistics}}
              </Button>
              <Button v-if="item.orderState===3" class="refund" @click="refundHandle">
                {{getLanguageData.cencelText.returnGood}}
              </Button>
              <section class="apply" style="display: none" @click="applyServiceHandle">
                {{getLanguageData.orderText.afterSale}}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagebox">
      <Page :total="total" :current="currentPage" style="float: right" @on-change="currentPageChange" />
    </div>
    <Modal class="logisticsModal" v-model="logisticsModal" title="物流信息" :footer-hide="true" width="698px">
      <div style="font-size: 14px;color: #333333;padding-left: 20px;">{{getLanguageData.orderText.expressName}}： {{expressInfo.expressName}}</div>
      <div style="font-size: 14px;color: #333333;padding-left: 20px;margin-top: 20px">{{getLanguageData.orderText.expressNumber}}： {{expressInfo.expressNumber}}</div>
      <div style="padding-left: 20px;margin-top: 20px" v-if="expressInfo.state!=='notfound'">
        <Timeline>
          <TimelineItem v-for="(item, index) in trackInfo" :key="index">
            <p class="time" style="font-size: 14px;font-weight: bold">{{item.date}}</p>
            <p class="content" style="padding-left: 5px">{{item.statusDescription}}</p>
            <p class="content" style="padding-left: 5px">{{item.details}}</p>
          </TimelineItem>
        </Timeline>
      </div>
      <div v-else style="font-size: 14px;color: #333333;padding-left: 20px;margin-top: 20px">
        {{getLanguageData.orderText.noLogisticsDynamic}}
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Orderlist',
  props: ['orderListData', 'orderState', 'total', 'currentPage'],
  data () {
    return {
      cancelOrderModal: false,
      logisticsModal: false,
      expressInfo: {
        expressName: '',
        expressNumber: '',
        state: ''
      },
      trackInfo: []
    }
  },
  methods: {
    ...mapActions({
      handleCheckCounter: 'handleCheckCounter'
    }),
    toPayHandle (item) {
      const orderObj = {
        orderMap: [],
        totalPayAmount: item.amount,
        tradeNumber: item.tradeNumber
      }
      this.handleCheckCounter(orderObj)
      this.$router.push('/placeorder/checkoutcounter/' + item.tradeNumber)
    },
    cancelOrderHandle (orderNo, payType) {
      const _this = this
      this.$Modal.confirm({
        title: _this.getLanguageData.orderText.warmPrompt,
        content: '<p>' + this.getLanguageData.orderText.sureCancelOrder + '？</p>',
        loading: true,
        onOk: () => {
          if (payType && payType === 2) {
            _this.$axios.post('starday-order/myOrder/cancelCodOrder/' + orderNo).then((res) => {
              if (res.code === 200) {
                _this.$Message.success(_this.getLanguageData.orderList.canclesuccess)
                _this.$emit('refreshHandle')
                _this.$Modal.remove()
              }
            })
            return
          }
          _this.$axios.post('starday-order/myOrder/cancelOrder/' + orderNo).then((res) => {
            if (res.code === 200) {
              _this.$Message.success(_this.getLanguageData.orderList.canclesuccess)
              _this.$emit('refreshHandle')
              _this.$Modal.remove()
            }
          })
        }
      })
    },
    applyServiceHandle () {
      this.$Modal.confirm({
        title: this.getLanguageData.receiptText.tips,
        content: '<p>' + this.getLanguageData.orderText.operatedWithinAPP + '</p>',
        onOk: () => {}
      })
    },
    refundHandle () {
      this.$Modal.confirm({
        title: this.getLanguageData.receiptText.tips,
        content: '<p>' + this.getLanguageData.cencelText.applyReturnGood + '</p>',
        onOk: () => {}
      })
    },
    currentPageChange (pageNo) {
      this.$emit('currentPageChange', pageNo)
    },
    // 确认收货
    confirmRecevice (orderNo) {
      this.$axios.put('starday-order/myOrder/confirmReceiving', { orderNumber: orderNo }).then((res) => {
        if (res.code === 200) {
          this.$Message.success(this.getLanguageData.storeText.sureShipSuccess)
          this.$emit('refreshHandle', '4')
        }
      })
    },
    // 物流动态
    seachLogisticsHandle (orderNo) {
      this.expressName = ''
      this.expressNumber = ''
      this.trackInfo = []
      this.$axios.get('starday-order/myOrder/getLogisticsMsg/' + orderNo).then((res) => {
        if (res.code === 200) {
          this.logisticsModal = true
          this.expressInfo.expressName = res.data.expressName
          this.expressInfo.expressNumber = res.data.expressNumber
          this.expressInfo.state = res.data.state
          this.trackInfo = res.data.trackinfo
        }
      })
    },
    // 待确认-停止支付
    stopPayHandle (tradeNo) {
      const _this = this
      _this.$Modal.confirm({
        title: _this.getLanguageData.orderText.warmPrompt,
        content: '<p>' + this.getLanguageData.orderText.stopPayComment + '？</p>',
        loading: true,
        onOk: () => {
          this.$axios.post('starday-order/myOrder/stopPaying/' + tradeNo).then((res) => {
            if (res.code === 200) {
              _this.$Modal.remove()
              _this.$Message.success(this.getLanguageData.orderText.operateSuccess)
              _this.$emit('refreshHandle')
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLanguageData: 'getLanguageData'
    })
  }
}
</script>

<style scoped lang="scss">
.order_container {
  .head {
    height: 46px;
    display: flex;
    background: #e0e0e0;
    margin-top: 20px;
    .title {
      width: 202px;
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
    border: 1px solid #e0e0e0;
    .des1,.des2,.des3 {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      text-align: center;
    }
    .des2,.des3 {
      text-decoration: underline;
      margin-top: 10px;
    }
    .des2,.des3:hover {
      cursor: pointer;
    }
    .des3 {
      color: #ff5d19;
      font-weight: bold;
    }
    .storename {
      height: 46px;
      line-height: 46px;
      padding-left: 20px;
      div {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #666666;
      }
    }
    .info_content {
      display: flex;
      .info_box {
        display: flex;
        .store_info {
          display: flex;
          .store_detail{
            border-right: 1px solid #e0e0e0;
          }
          &.storeinfo {
            border-bottom: none!important;
          }
        }
        .store_info:not(:first-child) {
          border-top: 1px solid #e0e0e0;;
        }
        .store_info:first-child {
          border-bottom: 1px solid #e0e0e0;
        }
        .store_status {
          width: 190px;
          display: flex;
          border-right: 1px solid #e0e0e0;
          justify-content: center;
          align-items: center;
          div {
            display: flex;
            flex-flow: column;
            justify-content: center;
          }
        }
        .store_item2 {
          width: 190px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          Button {
            height: 34px;
            font-size: 12px;
            border-radius: 4px;
            padding: 0 20px;
          }
          .confirm, .eva {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
          }
          .pay, .refund {
            color: #FFFFFF;
            background: #ff5d19;
            border-radius: 4px;
          }
          .apply {
            font-size: 12px;
            font-weight: 400;
            color: #333333;
          }
          section {
            text-decoration: underline;
            margin-top: 10px;
          }
          section:hover {
            cursor: pointer;
            color: #ff5d19;
          }
        }
      }
      .goods_info {
        /*width: 938px;*/
        height: 140px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        .info {
          width: 190px;
          border-right: 1px solid #e0e0e0;
        }
        .info:hover {
          cursor: pointer;
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
              margin-top: 14px;
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
        .info:nth-of-type(2),.info:nth-of-type(3),.info:nth-of-type(4),.info:nth-of-type(5) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info:nth-of-type(2){
          font-size: 12px;
          font-weight: 400;
          color: #333333;
        }
        .info:nth-of-type(3) {
          font-size: 18px;
          font-weight: 700;
          color: #ff5d19;
          border-right: none;
        }
        .info:nth-of-type(4) {
          flex-flow: column;
        }
        .buttonbox {
          width: 190px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          Button {
            height: 34px;
            font-size: 12px;
            border-radius: 4px;
            padding: 0 20px;
          }
          .confirm, .eva {
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
          }
          .pay, .refund {
            color: #FFFFFF;
            background: #ff5d19;
            border-radius: 4px;
          }
          .apply {
            font-size: 12px;
            font-weight: 400;
            color: #333333;
          }
          section {
            text-decoration: underline;
            margin-top: 10px;
          }
          section:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .orderinfo:not(:first-child) {
    border-top: none;
  }
  .pagebox {
    height: 40px;
    margin-top: 40px;
  }
  /deep/.ivu-modal .express {
    font-size: 14px;
    color: #333;
    padding-left: 50px;
    margin-top: 20px;
  }
}
</style>
