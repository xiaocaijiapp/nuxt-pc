<template>
  <div class="coupon_info" :class="type==='2' ? 'bg_no' : 'bg_use'">
    <section class="info_top">
      <div class="des1">
        <span :class="type==='2' ? 'span1_no' : 'span1'">{{ item.denomination }}</span>
        <span :class="type==='2' ? 'span2_no' : 'span2'" style="font-size:12px;">円</span>
      </div>
      <section v-if="item.fullbuyType===0" class="des2" :class="type==='2' ? 'des2_no' : 'des2_use'">
        {{ getLanguageData.myCouponText.noThreshold }}
      </section>
      <section v-else class="des2" :class="type==='2' ? 'des2_no' : 'des2_use'">
        {{ getLanguageData.placeOrder.couponcondition.replace('N',item.fullbuyPrice||0) }}
      </section>
    </section>
    <section class="info_bottom">
      <div>
        <!--          {{getLanguageData.myCouponText.limitCategory}}：-->
        {{ item.couponActivityDto.useScene===0 ? getLanguageData.myCouponText.wholePlatform : (item.couponActivityDto.useScene===1 ? (getLanguage==='zh'?item.couponName:item.couponNameJp) : (item.couponActivityDto.useScene===2 ? getLanguageData.myCouponText.goods : '-')) }}
      </div>
      <div>{{ getLanguageData.myCouponText.deadline }}：{{ item.effectiveStartTime.substring(0, 11) }} - {{ item.effectiveEndTime.substring(0, 11) }}</div>
      <div v-if="type==='0'" :class="{'btn_bg': mouseActiveIndex===index}" @mouseenter="enter(index)" @mouseleave="leave(index)" @click="immediateUseHandle(item)">
        {{ getLanguageData.myCouponText.immediateUse }}
      </div>
      <Button v-if="type==='1'" disabled>
        {{ getLanguageData.myCouponText.used }}
      </Button>
      <Button v-if="type==='2'" disabled>
        {{ getLanguageData.myCouponText.lostEfficacy }}
      </Button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Couponitem',
  props: ['item', 'index', 'type', 'mouseActiveIndex'],
  data () {
    return {}
  },
  methods: {
    enter (index) {
      // this.mouseActiveIndex = index
      this.$emit('mouseEnterHandle', index)
    },
    leave (index) {
      // this.mouseActiveIndex = -1
      this.$emit('mouseLeaveHandle', -1)
    },
    immediateUseHandle (item) {
      this.$emit('immediateUseHandle', item)
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLanguage: 'getLanguage'
    })
  }
}
</script>

<style scoped lang="scss">
    .coupon_info  {
      width: 240px;
      height: 194px;
      border: 1px solid #e2e2e2;
      margin: 0 16px 20px 18px;
      .info_top {
        width: 240px;
        height: 103px;
        padding-top: 15px;
        span {
          display: inline-block;
        }
        .des1 {
          text-align: center;
          .span1, .span1_no {
            font-size: 30px;
            font-weight: 600;
          }
          .span1 {
            background-image:-webkit-linear-gradient(#FF7F46,#CF120B);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }
          .span1_no, .span2_no {
            color: #ffffff;
          }
          .span2,.span2_no {
            font-size: 16px;
            font-weight: 400;
          }
          .span2 {
            color: #CF4642;
          }
        }
        .des2 {
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }
        .des2_use {
          color: #A15324;
        }
        .des2_no {
          color: #ffffff;
          font-weight: 400;
        }
      }
      .info_bottom {
        padding: 10px 28px 0 28px;
        text-align: center;
        div:nth-of-type(1), div:nth-of-type(2) {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #666666;
        }
        div:nth-of-type(2){
          margin: 8px 0 8px;
        }
        div:nth-of-type(3) {
          width: 80px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #E76636;
          text-align: center;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid #E76636;
          margin: 0 auto;
          &.btn_bg {
            background: #E76636;
            color: #FFFFFF;
          }
        }
        div:nth-of-type(3):hover {
          cursor: pointer;
        }
        button {
          width: 80px;
          height: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          vertical-align: middle;
        }
      }
      &.bg_use {
        background-image: url("../../assets/images/personal/youhuiquan-bg.png");
      }
      &.bg_no {
        background-image: url("../../assets/images/personal/guoqi.png");
      }
    }
</style>
