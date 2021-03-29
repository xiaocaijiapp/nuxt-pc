<template>
  <div>
    <div class="receivepage">
      <div class="error" v-if="!errorFlag">
        <img :src="require('assets/images/receivecoupon/wushuju.png')" alt="">
        <p>リンクが切れている！</p>
      </div>
      <div class="container" v-else>
        <div class="couponbox">
          <div class="coupontype">
            <span>{{ couponInfo.couponType===0 ? '全商品クーポン' : '商品指定クーポン' }}</span>
            <span>{{ couponInfo.couponType===0 ? '全商品対象' : couponInfo.cateDetalName }}</span>
          </div>
          <div class="pricebox">
            <div>{{ couponInfo.denomination }}<span>円</span></div>
            <div>{{ couponInfo.fullbuyType===0 ? '条件なし' : `${couponInfo.fullbuyPrice}円以上購入の際ご利用可能` }}</div>
          </div>
        </div>
        <div class="loginform">
          <Form :model="ruleFormData" :rules="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <FormItem label="" prop="userName">
              <Input class="username" v-model="ruleFormData.userName" placeholder="メールアドレスを入力してください">
                <img slot="prefix" :src="require(`assets/images/login/emile.png`)" alt="">
              </Input>
            </FormItem>
            <FormItem label="" prop="code">
              <Input class="code" v-model="ruleFormData.code" placeholder="認証コードを入力してください">
                <img slot="prefix" :src="require(`assets/images/login/password.png`)" alt="">
                <span class="sendCode" slot="suffix" @click="sendCode">{{loadtext}}</span>
              </Input>
            </FormItem>
          </Form>
          <div class="login_button">
            <Button round @click="onSubmit">今すぐもらう</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
// import Reg from '@/assets/js/REG'
export default {
  name: 'Index',
  layout: 'couponLayout',
  data () {
    return {
      ruleFormData: {
        userName: '',
        code: ''
      },
      errormsg: '',
      isSendCode: true,
      loadtext: '認証コードを送信',
      isCanLogin: true,
      // 是否发送验证码
      sendStatus: false,
      time: 300,
      couponInfo: {},
      ruleForm: {
        userName: [
          {
            required: true,
            message: 'メールアドレスを入力してください',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'ご利用いただけないメールアドレス！',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '認証コードを入力してください', trigger: ['blur', 'change'] }
        ]
      },
      errorFlag: false
    }
  },
  mounted () {
    this.requestCouponInfo()
  },
  methods: {
    requestCouponInfo () {
      const couponId = this.$route.query.couponId
      this.$axios.get('/starday-activity/coupon/getDetail', { params: { couponId } }).then((res) => {
        if (res.code === 200) {
          this.couponInfo = res.data || {}
          this.errorFlag = true
        }
      })
    },
    sendCode () {
      if (this.ruleFormData.userName) {
        this.$axios.post('/starday-user/user/coupon/send/' + this.ruleFormData.userName).then((res) => {
          if (res.code === 200) {
            this.$Message.success('送信しました!')
            this.sendStatus = true
            this.timer()
          }
        })
      } else {
        this.$Message.warning('メールアドレスを入力してください')
      }
    },
    timer () {
      const _this = this
      if (_this.time > 0) {
        _this.time--
        _this.loadtext = _this.time.toString() + 's秒後に再取得します'
        setTimeout(_this.timer, 1000)
      } else {
        _this.time = 300
        _this.loadtext = '認証コードを送信'
        _this.isSendCode = false
      }
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/starday-user/user/coupon/verify/email/code', { couponId: this.$route.query.couponId, email: this.ruleFormData.userName, emailCode: this.ruleFormData.code }).then((res) => {
            if (res.code === 200) {
              window.location.href = '/receiveCoupon/receiveResult?statusType=1'
            } else {
              window.location.href = '/receiveCoupon/receiveResult?statusType=0'
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('./index');
</style>
