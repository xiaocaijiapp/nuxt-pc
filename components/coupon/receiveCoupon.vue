<template>
  <div v-if="couponShow && couponList.length > 0" class="receiveCoupon">
    <div class="module">
      <div class="closebox">
        <img src="@/assets/images/common/guanbi.png" alt="" @click="closeModel">
      </div>
      <div class="bodybox">
        <div class="title">
          {{ getLanguageData.myCouponText.couponLess }}
        </div>
        <div class="yhbox">
          <div v-for="(item, index) in couponList" :key="index" class="boxItem">
            <div class="leftitem">
              <div class="itemfirst">
                <span>{{ item.denomination }}</span>
                <span>円</span>
              </div>
              <div class="itemtwo">
                {{ getLanguageData.placeOrder.couponcondition.replace('N',item.fullbuyPrice||0) }}
                <!-- {{getLanguageData.myCouponText.fill}}{{item.fullbuyPrice}}{{getLanguageData.myCouponText.canUse}} -->
              </div>
            </div>
            <div class="rightitem">
              <div class="itemthree">
                {{ item.couponType === 0? getLanguageData.receivecoupon.allplat : getLanguageData.receivecoupon.alltypeuse }}
              </div>
              <div class="itemfour">
                {{ getLanguageData.myCouponText.periodTime }}{{ item.effectiveStartTime.split(' ')[0] }} - {{ item.effectiveEndTime.split(' ')[0] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footbox">
        <div class="btn" @click="closeModel">
          {{ getLanguageData.myCouponText.immediateUse }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReceiveCoupon',
  props: ['couponShow', 'couponList'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    closeModel () {
      this.$emit('closeCoupon')
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
<style lang="scss" scoped>
.receiveCoupon{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .module{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .closebox{
            text-align: right;
            margin-bottom: 20px;
            img{
                cursor: pointer;
                width: 40px;
                height: 40px;
            }
        }
        .bodybox{
            width: 517px;
            height: 604px;
            overflow: hidden;
            background: url('../../assets/images/common/body.png') no-repeat;
            .title{
                text-align: center;
                font-size: 22px;
                font-weight: 600;
                color: #a76e2e;
                line-height: 70px;
            }
            .yhbox{
                position:relative;
                overflow-y: auto;
                height: 400px;
                .boxItem{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 448px;
                    height: 129px;
                    margin: 0 auto 10px;
                    padding: 0 17px;
                    background: url('../../assets/images/common/yhq.png') no-repeat;
                    .leftitem{
                        width: 130px;
                        .itemfirst{
                            span:nth-of-type(1){
                                font-size: 38px;
                                color: #ffffff;
                            }
                            span:nth-of-type(2){
                                font-size: 19px;
                                font-weight: 500;
                                color: #ffffff;
                            }
                        }
                        .itemtwo{
                            font-size: 14px;
                            color: #ffffff;
                        }
                    }
                    .rightitem{
                        flex: 1;
                        margin-left: 46px;
                        .itemthree{
                            height: 58px;
                            line-height: 58px;
                            font-size: 20px;
                            font-weight: 600;
                            color: #ffffff;
                        }
                        .itemfour{
                            font-size: 14px;
                            color: #f2cdcd;
                        }
                    }
                }
            }
            .yhbox::-webkit-scrollbar{
                display: none;
            }
            .yhbox {
                overflow: -moz-scrollbars-none;
            }

            .yhbox {
                -ms-overflow-style: none;
            }
        }
        .footbox{
            position:relative;
            width: 517px;
            height: 181px;
            margin-top: -180px;
            background: url('../../assets/images/common/foot.png') no-repeat;
            z-index: 99999;
            .btn{
                position: absolute;
                bottom: 48px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 26px;
                font-weight: 600;
                color: #c61f0a;
                cursor: pointer;
            }
        }
    }
}
</style>
