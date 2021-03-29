<template>
  <div class="personalcenter">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">{{getLanguageData.storeText.indexPage}}</BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.emailText.personalInfo}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="personal_center">
      <section class="title">{{getLanguageData.cencelText.personCencel}}</section>
      <div class="detail_info">
        <div class="userinfo">
          <div class="user_title">{{getLanguageData.cencelText.userInfo}}</div>
          <div class="user_info">
            <div class="user_top">
              <div class="left_img">
                <img :src="getImageBasePath + personalInfo.headImage + '?x-oss-process=image/resize,w_1000/format,webp'" alt="" v-if="personalInfo.headImage">
                <img src="@/assets/images/personal/defaultimg.png" alt="" v-else>
              </div>
              <div class="right_info">
                <div>
                    <span class="span_1">{{getLanguageData.cencelText.helloText}}，{{personalInfo.username}}</span>
                </div>
                <div style="margin-top: 10px;display: flex;align-items: center">
                    <span class="span_2">{{getLanguageData.cencelText.ordinaryMember}}</span>
                    <span class="span_4">{{getLanguageData.cencelText.memberCount}}</span>
                    <span class="span_5">{{personalInfo.integral}}</span>
                    <span class="span_6">
                      <img src="../../assets/images/personal/guize.png" alt="">
                    </span>
                </div>
                <div>
                    <span class="span_3" @click="$router.push('/personal/membermodify')">{{getLanguageData.cencelText.editMemberInfo}}</span>
                </div>
              </div>
            </div>
            <div class="user_bottom">
              <div class="left">
                <div @click="$router.push('/personal/transactiondetail')">
                  <section class="num">{{personalInfo.cardBalance || 0}}</section>
                  <section class="text">{{getLanguageData.cencelText.memeberBalance}}</section>
                </div>
<!--                <div @click="$router.push('/personal/attentiongoods?active=' + '1')">-->
<!--                  <section class="num">1000</section>-->
<!--                  <section class="text">喜欢的商品</section>-->
<!--                </div>-->
<!--                <div @click="$router.push('/personal/attentiongoods?active=' + '2')">-->
<!--                  <section class="num">1000</section>-->
<!--                  <section class="text">关注的店铺</section>-->
<!--                </div>-->
              </div>
              <div class="right">
<!--                <div @click="$router.push('/personal/transactiondetail')">-->
<!--                  <section class="num">{{personalInfo.cardBalance}}</section>-->
<!--                  <section class="text">会员余额</section>-->
<!--                </div>-->
                <div @click="$router.push('/order/orderlist?activeTab=' + '2')">
                  <section class="num">{{personalInfo.balance || 0}}</section>
                  <section class="text">{{getLanguageData.cencelText.processing}}</section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list_box">
        <nuxt-link to="/order/orderlist">
          <div>
            <img src="@/assets/images/personal/dingdan.png" alt="">
            <span>{{getLanguageData.cencelText.myOrder}}</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/personal/mycoupon">
          <div>
            <img src="@/assets/images/personal/youhuiquan.png" alt="">
            <span>{{getLanguageData.cencelText.myCoupon}}</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/address">
          <div>
            <img src="@/assets/images/personal/dizhi.png" alt="">
            <span>{{getLanguageData.receiptText.receiptAdress}}</span>
          </div>
        </nuxt-link>
        <div @click="boundCouponHandle">
          <img src="@/assets/images/personal/lipinka.png" alt="">
          <span>{{getLanguageData.cencelText.certificate}}</span>
        </div>
        <div @click="refundHandle">
          <img src="@/assets/images/personal/refund.png" alt="">
          <span>{{getLanguageData.cencelText.returnGood}}</span>
        </div>
        <nuxt-link to="/personal/emailList">
          <div>
            <img src="@/assets/images/personal/email.png" alt="">
            <span>{{getLanguageData.emailText.viewEmail}}</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/personal/attentiongoods/?active=1">
          <div>
            <img src="@/assets/images/personal/likegood.png" alt="">
            <span>{{getLanguageData.attentiongoodsText.loveGoods}}</span>
          </div>
        </nuxt-link>
        <nuxt-link to="/personal/attentiongoods/?active=2">
          <div>
            <img src="@/assets/images/personal/attstore.png" alt="">
            <span>{{getLanguageData.attentiongoodsText.attentionStore}}</span>
          </div>
        </nuxt-link>

        <nuxt-link to="/personal/nextpay">
          <div>
            <img src="@/assets/images/personal/nextpay.png" alt="">
            <span>{{getLanguageData.nextText.nextPay}}</span>
          </div>
        </nuxt-link>
      </div>
      <div class="logout" @click="logoutHandle">{{getLanguageData.cencelText.logout}}</div>
      <div class="recommend" style="display: none">
        <section class="rec_title">{{getLanguageData.cencelText.recommendedTo}}</section>
        <personalrecom />
      </div>
    </div>
    <Modal class="boundCouponModal" v-model="boundCouponModal" :title="getLanguageData.cencelText.bindCoupon" :footer-hide="true" width="700px">
      <div>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" class="password-form">
          <FormItem :label="getLanguageData.cencelText.couponNum" prop="cardNo" :label-width="180">
            <Input v-model="formCustom.cardNo" type="text" :placeholder="getLanguageData.cencelText.intCouponNum" style="width: 400px"/>
          </FormItem>
          <FormItem :label="getLanguageData.cencelText.couponPwd" prop="cardPass" :label-width="180">
            <Input v-model="formCustom.cardPass" type="text" :placeholder="getLanguageData.cencelText.intCouponPwd" style="width: 400px"/>
          </FormItem>
          <FormItem>
            <Button class="pass_button" type="primary" @click="handleSubmit('formCustom')">{{getLanguageData.cencelText.bindBtn}}</Button>
            <div style="color: #999999; margin-top: 10px">{{getLanguageData.cencelText.bindCarryOut}}</div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import personalrecom from '@/components/index/personalrecom'
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'Index',
  middleware: 'auth',
  components: {
    personalrecom
  },
  data () {
    return {
      boundCouponModal: false,
      personalInfo: {},
      formCustom: {
        cardNo: '',
        cardPass: ''
      }
    }
  },
  mounted () {
    this.requestPersonalInfo()
  },
  methods: {
    boundCouponHandle () {
      this.boundCouponModal = true
    },
    requestPersonalInfo () {
      const _this = this
      _this.$axios.get('starday-user/user/myInfo').then((res) => {
        if (res.code === 200) {
          _this.personalInfo = res.data
          _this.personalInfo.balance = res.data.waitDeliver + res.data.waitEvaluate + res.data.waitPay + res.data.waitRecipient
        }
      })
    },
    handleSubmit (name) {
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$axios.post('starday-system/user/giftCard/bandCard', _this.formCustom).then((res) => {
            if (res.code === 200) {
              _this.boundCouponModal = false
              _this.$Message.success(_this.getLanguageData.cencelText.bindSuccess)
            }
          })
        }
      })
    },
    refundHandle () {
      this.$Modal.confirm({
        title: this.getLanguageData.receiptText.tips,
        content: '<p>' + this.getLanguageData.cencelText.applyReturnGood + '</p>',
        onOk: () => {}
      })
    },
    // 注销
    logoutHandle () {
      this.$axios.get('starday-auth/login/login/out').then((res) => {
        if (res.code === 200) {
          Cookie.remove('token')
          this.$router.push('/login')
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLoginData: 'getLoginData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    ruleCustom () {
      const vm = this
      const ruleCustom = {
        cardNo: [
          { required: true, message: vm.getLanguageData.cencelText.noEmpty, trigger: 'blur' }
        ],
        cardPass: [
          { required: true, message: vm.getLanguageData.cencelText.noEmpty, trigger: 'blur' }
        ]
      }
      return ruleCustom
    }
  }
}
</script>

<style scoped lang="scss">
.personalcenter{
  .breadbox{
    margin : 12px 0;
  }
  .personal_center {
    padding: 20px 25px;
    background: #FFFFFF;
    .title {
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
    }
    .detail_info {
      /*display: flex;*/
      /*justify-content: space-between;*/
      margin-top: 41px;
      .userinfo {
        /*width: 960px;*/
        /*height: 437px;*/
        border: 1px solid #E0E0E0;
        .user_title {
          height: 40px;
          font-size: 14px;
          color: #333333;
          line-height: 40px;
          background: #F4F4F4;
          border-radius: 2px 2px 0px 0px;
          border-bottom: 1px solid #E0E0E0;
          padding-left: 20px;
        }
        .user_info {
          padding: 20px;
          display: flex;
          .user_top {
            width: 674px;
            display: flex;
            align-items: center;
            .left_img {
              width: 130px;
              height: 130px;
              border-radius: 50%;
              background: #e2e2e2;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .right_info {
              padding: 10px 10px 10px 53px;
              span {
                display: inline-block;
              }
              .span_1 {
                height: 37px;
                font-size: 26px;
                font-weight: 400;
                color: #333333;
                line-height: 37px;
              }
              .span_2, .span_3, .span_4 {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                margin-right: 10px;
              }
              .span_2 {
                height: 20px;
                color: #333333;
                line-height: 20px;
                margin-right: 24px;
              }
              .span_3 {
                color: #3897E0;
                border-bottom: 1px solid #3897E0;
                padding-top: 10px;
              }
              .span_3:hover {
                cursor: pointer;
              }
              .span_5 {
                font-size: 18px;
                font-weight: bold;
                color: #E76636;
                margin-right: 8px;
              }
              .span_6 {
                width: 16px;
                height: 16px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .user_bottom {
            height: 182px;
            display: flex;
            align-items: center;
            .left {
              border-right: 1px dashed #dbdbdb;
              border-left: 1px dashed #dbdbdb;
            }
            .left,.right {
              width: 337px;
              height: 86px;
              display: flex;
              align-items: center;
              justify-content: center;
              >div {
                width: 50%;
              }
              >div:hover {
                cursor: pointer;
              }
              .num {
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                color: #E76636;
              }
              .text {
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #333333;
              }
            }
          }
        }
      }
    }
    .list_box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 80px;
      div {
        width: 270px;
        height: 80px;
        border-radius: 4px;
        border: 1px solid #E0E0E0;
        margin-right: 40px;
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-right: 12px;
        }
        span {
          font-size: 18px;
          font-weight: 400;
          color: #333333;
          line-height: 25px;
        }
      }
      div:nth-of-type(4),>div:nth-of-type(8) {
        margin-right: 0;
      }
      div:hover {
        cursor: pointer;
      }
    }
    .logout {
      width: 280px;
      height: 47px;
      color: #333333;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 47px;
      border-radius: 6px;
      border: 1px solid #333333;
      margin: 0 auto;
    }
    .logout:hover {
      cursor: pointer;
    }
    .recommend {
      margin-top: 100px;
      .rec_title {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        line-height: 28px;
      }
    }
  }
}
/deep/.ivu-modal .ivu-modal-body {
  padding: 30px;
}
/deep/.ivu-form {
  text-align: center;
  Button {
    width: 240px;
    height: 40px;
    margin-top: 80px;
  }
}
/deep/.ivu-form .ivu-form-item-error-tip {
    margin-left: 30px;
  }
</style>
