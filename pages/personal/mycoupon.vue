<template>
  <div class="mycoupon">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{getLanguageData.emailText.personalInfo}}
        </BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.cencelText.myCoupon}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="personal_container">
      <section class="personal_title">
        {{getLanguageData.cencelText.myCoupon}}
      </section>
      <div class="couponbox">
        <Tabs v-model="type" value="name1" @on-click="handleTabsChange">
          <TabPane :label="getLanguageData.myCouponText.canUseCoupon" name="0">
            <div v-if="couponData.length" class="coupon">
              <couponItem
                v-for="(item, index) in couponData"
                :key="index"
                :item="item"
                :index="index"
                :type="type"
                :mouseActiveIndex="mouseActiveIndex"
                @immediateUseHandle="immediateUseHandle"
                @mouseEnterHandle="mouseEnterHandle"
                @mouseLeaveHandle="mouseLeaveHandle"
              />
            </div>
            <div v-else class="coupon_no">
              <div>
                <img src="@/assets/images/common/nocoupon.png" alt="">
                <div class="txt">
                  {{getLanguageData.myCouponText.noUseCoupon}}
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane :label="getLanguageData.myCouponText.alreadyUseCoupon" name="1">
            <div v-if="couponData.length" class="coupon">
              <couponItem
                v-for="(item, index) in couponData"
                :key="index"
                :item="item"
                :index="index"
                :type="type"
                :mouseActiveIndex="mouseActiveIndex"
              />
            </div>
            <div v-else class="coupon_no">
              <div>
                <img src="@/assets/images/common/nocoupon.png" alt="">
                <div class="txt">
                  {{getLanguageData.myCouponText.noUseCoupon}}
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane :label="getLanguageData.myCouponText.failureCoupon" name="2">
            <div v-if="couponData.length" class="coupon">
              <couponItem
                v-for="(item, index) in couponData"
                :key="index"
                :item="item"
                :index="index"
                :type="type"
                :mouseActiveIndex="mouseActiveIndex"
              />
            </div>
            <div v-else class="coupon_no">
              <div>
                <img src="@/assets/images/common/nocoupon.png" alt="">
                <div class="txt">
                  {{getLanguageData.myCouponText.noUseCoupon}}
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import couponItem from '@/components/coupon/couponitem'
export default {
  name: 'MyCoupon',
  middleware: 'auth',
  components: { couponItem },
  data () {
    return {
      type: '0',
      couponData: [],
      mouseActiveIndex: -1
    }
  },
  mounted () {
    this.requestCouponData()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  methods: {
    handleTabsChange (val) {
      this.type = val
      this.requestCouponData()
    },
    requestCouponData () {
      const _this = this
      _this.$axios.get('starday-activity/user/user_coupon/list/?type=' + this.type).then((res) => {
        if (res.code === 200) {
          _this.couponData = res.data
        }
      })
    },
    immediateUseHandle (item) {
      if (item.couponActivityDto.useScene === 0) {
        this.$router.push('/')
      }
      if (item.couponActivityDto.useScene === 1) {
        this.$router.push('/cate/' + item.couponActivityDto.cateDetail)
      }
    },
    mouseEnterHandle (index) {
      this.mouseActiveIndex = index
    },
    mouseLeaveHandle (index) {
      this.mouseActiveIndex = index
    }
  }
}
</script>

<style scoped lang="scss">
  .mycoupon {
    .personal_container {
      .couponbox {
        margin-top: 40px;
        .coupon {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-top: 4px;
          .coupon_info  {
            width: 240px;
            height: 194px;
            border: 1px solid #e2e2e2;
            margin: 0 6px 20px 18px;
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
                .span1_no {
                  color: #ffffff;
                }
                .span2,.span2_no {
                  font-size: 16px;
                  font-weight: 400;
                }
                .span2 {
                  color: #CF4642;
                }
                .span2_no {
                  color: #ffffff;
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
        }
        .coupon_no {
          height: 432px;
          display: flex;
          align-items: center;
          justify-content: center;
          >div {
            img {
              vertical-align: middle;
            }
            .txt {
              height: 28px;
              font-size: 20px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: center;
              color: #999999;
              line-height: 28px;
            }
          }
        }
      }
    }
  }
</style>
