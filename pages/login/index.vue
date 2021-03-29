<template>
  <div class="login">
    <section class="loginbox">
      <div class="loginboxleft">
        <div class="title">
          {{ getLanguageData.login.allogin }}
        </div>
        <Form ref="ruleform" :model="formItem" :label-width="130" :rules="ruleValidate">
          <FormItem :label="getLanguageData.loginpage.accountNum" prop="username">
            <Input v-model="formItem.username" :placeholder="getLanguageData.loginpage.wremailphone" />
          </FormItem>
          <FormItem :label="getLanguageData.loginpage.password" prop="password">
            <Input
              v-model="formItem.password"
              type="password"
              password
              :placeholder="getLanguageData.loginpage.wrpassword"
              @on-enter="loginHandle"
            />
          </FormItem>
        </Form>
        <strong class="tip">
          {{ getLanguageData.login.askEmail }}：cs01@starday.jp/cs02@starday.jp
        </strong>
        <div class="btnbox">
          <p class="btn" @click="loginHandle">
            {{ getLanguageData.login.login }}
          </p>
        </div>
        <div class="forgetbox">
          <nuxt-link to="/login/forget">
            {{ getLanguageData.login.forgetpassword }}
          </nuxt-link>
        </div>
      </div>
      <div class="loginboxright">
        <div class="title">
          {{ getLanguageData.login.noregiter }}
        </div>
        <section class="registertip">
          {{ getLanguageData.login.registerhere }}
        </section>
        <div class="btnbox">
          <p class="btn">
            <nuxt-link to="login/register">
              {{ getLanguageData.login.register }}
            </nuxt-link>
          </p>
        </div>
        <!--        第三方登录-->
        <div class="linebox">
          <span>{{ getLanguageData.lineau.oulogin }}</span>
          <div>
            <img src="@/assets/images/login/linebtn.png" alt="" style="margin-right: 10px" @click="showAuthLineModal=true">
            <img src="@/assets/images/login/google.png" alt="" @click="googleSureAuthHandle">
          </div>
        </div>
      </div>
    </section>
    <lineAuth v-if="showAuthLineModal" @hideAuthModal="showAuthLineModal=false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import lineAuth from '@/components/login/lineAuth'
export default {
  name: 'Index',
  middleware: 'auth',
  data () {
    return {
      loginData: {},
      formItem: {
        username: '',
        password: ''
      },
      showAuthLineModal: false
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getAddBuyCart: 'getAddBuyCart'
    }),
    ruleValidate () {
      const vm = this
      const _valid = {
        username: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wremailphone,
            trigger: 'blur'
          }
          // {
          //   type: 'email',
          //   message: vm.getLanguageData.loginpage.emailreg,
          //   trigger: 'blur'
          // }
        ],
        password: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          }
        ]
      }
      return _valid
    }
  },
  methods: {
    ...mapActions({
      handleAddBuyCart: 'handleAddBuyCart'
    }),
    // 处理游客购物车数据
    editBuyCart () {
      const vm = this
      const _arr = []
      const _dataArr = vm.getAddBuyCart
      _dataArr.forEach((item, index) => {
        item.shopItems.forEach((chItem) => {
          _arr.push({
            num: chItem.num,
            skuId: chItem.skuId,
            spuId: chItem.spuId,
            storeId: item.storeId,
            skuValue: chItem.skuValue
          })
        })
      })
      return _arr
      // console.log('_arr----', _arr)
    },
    loginHandle () {
      const vm = this
      vm.$refs.ruleform.validate((valid) => {
        if (valid) {
          vm.$axios.post('starday-auth/login/user/account/login.do', {
            password: vm.formItem.password,
            username: vm.formItem.username
          }).then((res) => {
            if (res.code === 200) {
              vm.$store.dispatch('handleLogin', res.data)
              Cookie.set('token', res.data.token)
              if (vm.getAddBuyCart && vm.getAddBuyCart.length > 0) {
                vm.$axios({
                  url: 'starday-order/shopCart/mergeShopCart',
                  method: 'post',
                  data: vm.editBuyCart()
                }).then((res) => {
                  if (res.code === 200) {
                    vm.handleAddBuyCart([])
                  }
                })
              }
              let _path = vm.$route.query.ref ? encodeURI(vm.$route.query.ref) : '/'
              if (_path.includes('/login?ref=')) {
                _path = _path.replace('/login?ref=', '')
              }
              setTimeout(function () {
                vm.$router.push(_path)
              })
            }
          })
        }
      })
    },
    googleSureAuthHandle () {
      const _url = location.origin + '/login/thirdparty'
      location.href = 'https://accounts.google.com/o/oauth2/v2/auth?&response_type=code&client_id=137570187799-516jsj1d29gmcch00ekrkq7mm0i2qcmj.apps.googleusercontent.com&redirect_uri=' + _url + '&state=state&access_type=offline&scope=openid+email+profile&prompt=select_account'
    },
    shareHandle () {
      const _params = {
        title: '标题',
        desc: 'desc',
        link: 'http://wx.stardaymart.com/login',
        imgUrl: 'https://image.stardaymart.com//goods/2020/09/04/1599191157680/1301728179877601281.png'
      }
      this.wxShare(_params, 'http://wx.stardaymart.com/login')
    },
    shareWXHandle () {
      this.$wechat.updateAppMessageShareData({
        title: '标题',
        desc: 'desc',
        link: 'http://wx.stardaymart.com/login',
        imgUrl: 'https://image.stardaymart.com//goods/2020/09/04/1599191157680/1301728179877601281.png',
        success () {
          alert('设置成功')
        },
        cancel () {
          alert('分享取消')
        }
      })
    }
  },
  components: {
    lineAuth
  }
}
</script>

<style scoped lang="scss">
  .login {
    margin-top: 20px;

    .loginbox {
      width: 100%;
      height: 420px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        line-height: 33px;
        margin-bottom: 40px;
        text-align: center;
      }

      .btn {
        display: inline-block;
        width: 288px;
        height: 54px;
        background: #e76636;
        border-radius: 2px;
        line-height: 54px;
        font-size: 16px;
        color: #fff;
        margin: 40px auto 0;
        cursor: pointer;
        a{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .loginboxleft {
        width: 50%;
        padding: 42px;
        text-align: center;

        strong {
          color: #999;
          font-size: 12px;
          font-weight: normal;
        }
        .forgetbox{
          margin-top: 20px;
          font-size: 12px;
          a{
            color: #666666;
            cursor: pointer;
          }
        }
      }

      .loginboxright {
        width: 50%;
        padding: 42px;
        text-align: center;
        a:hover{
          color: #FFFFFF;
        }
        .linebox{
          margin-top: 40px;
          span{
            font-size:12px;
            display: inline-block;
            color:#666666;
            position: relative;
            margin-bottom: 20px;
          }
          span::before{
            content: '';
            position: absolute;
            height: 1px;
            width: 105px;
            background-color: #D7D7D7;
            left: -120px;
            top: 8px;
          }
          span::after{
            content: '';
            position: absolute;
            height: 1px;
            width: 105px;
            background-color: #D7D7D7;
            right: -120px;
            top: 8px;
          }
          img{
            width: 40px;
            height: 40px;
            cursor: pointer;
          }
        }

      }
    }
  }
</style>
