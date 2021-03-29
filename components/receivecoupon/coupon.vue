<template>
  <div class="coupon">
    <img v-if="item.couponTotalNum-item.couponAmount>0 && item.ceiling !== 1" class="bgitem" src="@/assets/images/placeorder/coupon.png" alt="">
    <img v-if="item.couponTotalNum-item.couponAmount<=0 || item.ceiling === 1" class="bgitem" src="@/assets/images/placeorder/coupondis.png" alt="">
    <div class="couponcontent">
      <div :class="item.couponTotalNum-item.couponAmount<=0?'discouponcontenttop':'couponcontenttop'">
        <div class="amountbox">
          <span>{{ item.denomination }}</span><span style="font-size:12px;">円</span>
        </div>
        <div v-show="item.fullbuyType===1" class="contidion">
          {{ getLanguageData.placeOrder.couponcondition.replace('N',item.fullbuyPrice) }}
        </div>
      </div>
      <div class="couponcontentbottom">
        <ul>
          <li>
<!--            <span class="label">{{ getLanguageData.placeOrder.limittype }}:</span>-->
            <span>{{ item.useScene===0?getLanguageData.receivecoupon.allplat:(getLanguage==='zh'?item.couponName:item.couponNameJp) }}</span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.limittime }}:</span>
            <span>{{ item.effectiveType===0?(item.effectiveStartTime.slice(0,10).replace(/\-/g,'.') + '-' + item.effectiveEndTime.slice(0,10).replace(/\-/g,'.')):(getLanguageData.receivecoupon.receiveTime.replace('N',item.effectiveDays)) }}</span>
          </li>
        </ul>
        <div class="btnbox">
          <p class="receive" @click="receiveHandle" v-if="item.couponTotalNum-item.couponAmount>0 && item.ceiling !== 1">
            {{ getLanguageData.receivecoupon.receivecoupon }}
          </p>
          <p class="receiveall" v-if="item.couponTotalNum-item.couponAmount<=0 || item.ceiling === 1">
            {{ getLanguageData.receivecoupon.receiveall }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Coupon',
  props: ['item'],
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLanguage: 'getLanguage'
    })
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    receiveHandle () {
      this.$emit('receiveHandle', this.item.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .coupon {
    display: inline-block;
    width: 240px;
    height: 194px;
    position: relative;
    margin: 10px;

    .bgitem {
      width: 240px;
      height: 194px;
      position: absolute;
      left: 0;
      top: 0;
    }

    .couponcontent {
      width: 240px;
      height: 194px;
      position: absolute;
      left: 0;
      top: 0;

      .couponcontenttop {
        width: 240px;
        height: 103px;
        text-align: center;
        padding-top: 25px;
        .amountbox{
          font-size: 16px;
          color: #cf4642;
          span{
            font-size: 30px;
            background-image: -webkit-linear-gradient(180deg, rgba(255, 127, 70, 1) 0%, rgba(196, 59, 54, 1) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bolder;
          }
        }
        .contidion{
          font-size: 14px;
          font-weight: 600;
          color: #a15324;
        }
      }
      .discouponcontenttop{
        width: 240px;
        height: 103px;
        text-align: center;
        padding-top: 25px;
        .amountbox{
          font-size: 16px;
          span{
            font-size: 30px;
            color: #FFFFFF;
            font-weight: bolder;
          }
        }
        .contidion{
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
        }
      }

      .couponcontentbottom {
        width: 240px;
        height: 81px;
        font-size: 12px;
        color: #666666;
        padding: 5px 20px;
        li{
          padding: 3px 0;
          font-size: 10px;
        }
        .btnbox{
          text-align: center;
          .receive{
            display: inline-block;
            padding: 0 22px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            border: 1px solid #ff5d19;
            font-size: 10px;
            cursor: pointer;
            color: #ff5d19;
          }
          .receiveall{
            display: inline-block;
            padding: 0 22px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            border: 1px solid #666666;
            font-size: 12px;
            color: #666666;
          }
        }
      }

    }
  }
</style>
