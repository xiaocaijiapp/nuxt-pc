<template>
  <div class="coupon" @click="selectCouponHandle">
    <img v-show="selectCouponId===usercoupon.id" src="@/assets/images/placeorder/selectcoupon.png" alt="" class="selectbox">
    <img v-if="(item.cateDetail && (cateArrPro.indexOf(item.cateDetail)===-1)) || (item.fullbuyType===1 && (dataPrice.totalAmount < item.fullbuyPrice))" class="bgitem" src="@/assets/images/placeorder/coupondis.png" alt="">
    <img v-else class="bgitem" src="@/assets/images/placeorder/coupon.png" alt="">
    <div class="couponcontent">
      <div :class="((item.cateDetail && (cateArrPro.indexOf(item.cateDetail)===-1)) || (item.fullbuyType===1 && (dataPrice.totalAmount < item.fullbuyPrice)))?'discouponcontenttop':'couponcontenttop'">
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
            <span>{{ item.useScene===0?getLanguageData.receivecoupon.allplat:(getLanguage==='zh'?item.couponName:item.couponNameJp) }}</span>
            <!--            <span class="label">{{ getLanguageData.placeOrder.limittype }}:</span>-->
<!--            <span>{{ item.useScene===0?getLanguageData.receivecoupon.allplat:getLanguageData.receivecoupon.alltypeuse }}</span>-->
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.limittime }}:</span>
            <span>{{ item.effectiveType===0?(item.effectiveStartTime.slice(0,10).replace(/\-/g,'.') + '-' + item.effectiveEndTime.slice(0,10).replace(/\-/g,'.')):(getLanguageData.receivecoupon.receiveTime.replace('N',item.effectiveDays)) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Coupon',
  props: ['item', 'selectCouponId', 'usercoupon', 'cateArrPro', 'dataPrice'],
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
    selectCouponHandle () {
      if ((this.item.cateDetail && (!this.cateArrPro.includes(this.item.cateDetail))) || (this.item.fullbuyType === 1 && (this.dataPrice.totalAmount < this.item.fullbuyPrice))) {
        return
      }
      this.$emit('selectCouponHandle', (this.usercoupon.id === this.selectCouponId ? '' : this.usercoupon.id), this.item.id)
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
    cursor: pointer;
    .selectbox{
      position: absolute;
      left: 0;
      top: 0;
      width: 240px;
      height: 194px;
      z-index: 999;
    }
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
          font-size: 12px;
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
          color: #FFFFFF;
          span{
            font-size: 30px;
          }
        }
        .contidion{
          font-size: 12px;
          font-weight: 600;
          color: #FFFFFF;
        }
      }

      .couponcontentbottom {
        width: 240px;
        height: 81px;
        font-size: 12px;
        color: #666666;
        padding: 16px 20px;
        li{
          font-size: 12px;
          padding: 5px 0;
        }
      }

    }
  }
</style>
