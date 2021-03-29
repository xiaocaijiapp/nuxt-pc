<template>
  <div class="forget">
    <div class="forgetbox">
      <Form ref="ruleform" v-show="activeTab==='0'" :model="formItem" :label-width="220" :rules="ruleValidate">
        <FormItem :label="getLanguageData.lineau.email" prop="email">
          <Input v-model="formItem.email" :placeholder="getLanguageData.loginpage.wremail" />
        </FormItem>
        <FormItem prop="emailCode" :label="getLanguageData.lineau.mobileCode">
          <Input v-model.trim="formItem.emailCode" type="text" :placeholder="getLanguageData.lineau.wrmobileCode" style="width: 500px;" />
          <Button type="primary" style="width: 172px;" @click="sendCodeHandle">
            {{ sendCode?searchNumContent:getLanguageData.login.sendCode }}
          </Button>
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.password" prop="password">
          <Input
            v-model="formItem.password"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrpassword"
          />
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.surepass" prop="confirmPassword">
          <Input
            v-model="formItem.confirmPassword"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrsurepass"
          />
        </FormItem>
      </Form>
      <Form ref="ruleMobileform" v-show="activeTab==='1'" :model="formMobileItem" :label-width="220" :rules="ruleMobileValidate">
        <FormItem :label="getLanguageData.loginpage.phoneNum" prop="mobile">
          <Input v-model="formMobileItem.mobile" :placeholder="getLanguageData.loginpage.wrphoneNum" maxlength="11">
            <Select slot="prepend" v-model="formMobileItem.country" style="width: 80px">
              <Option value="+81">
                +81
              </Option>
              <Option value="+86">
                +86
              </Option>
            </Select>
          </Input>
        </FormItem>
        <FormItem prop="mobileCode" :label="getLanguageData.loginpage.valicode">
          <Input v-model.trim="formMobileItem.mobileCode" type="text" :placeholder="getLanguageData.loginpage.wrvalicode" style="width: 500px;" />
          <Button type="primary" style="width: 172px;" @click="sendMobileCodeHandle">
            {{ sendMobileCode?searchMobileNumContent:getLanguageData.lineau.sendCode }}
          </Button>
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.password" prop="password">
          <Input
            v-model="formMobileItem.password"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrpassword"
          />
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.surepass" prop="confirmPassword">
          <Input
            v-model="formMobileItem.confirmPassword"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrsurepass"
          />
        </FormItem>
      </Form>
      <div class="btnbox">
        <p class="btn" @click="sureHandle">
          {{ getLanguageData.operate.sure }}
        </p>
      </div>
      <p class="togglespan"><span @click="changeActiveTabHandle(activeTab==='0'?'1':'0')">{{activeTab==='0'? getLanguageData.loginpage.resetMobile : getLanguageData.loginpage.resetEmail}}</span></p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Forget',
  data () {
    return {
      formItem: {
        email: '',
        emailCode: '',
        password: '',
        confirmPassword: ''
      },
      formMobileItem: {
        mobile: '',
        country: '+81',
        mobileCode: '',
        password: '',
        confirmPassword: ''
      },
      sendMobileCode: false,
      searchMobileNumContent: 600,
      activeTab: '0',
      sendCode: false,
      searchNumContent: 600
    }
  },
  methods: {
    changeActiveTabHandle (str) {
      this.activeTab = str
      if (str === '0') {
        this.formItem = {
          email: '',
          emailCode: '',
          password: '',
          confirmPassword: ''
        }
        this.$refs.ruleform.resetFields()
      } else {
        this.formMobileItem = {
          mobile: '',
          country: '+81',
          mobileCode: '',
          password: '',
          confirmPassword: ''
        }
        this.$refs.ruleMobileform.resetFields()
      }
    },
    sendCodeHandle () {
      const vm = this
      if (vm.sendCode) {
        return
      }
      this.$refs.ruleform.validateField('email', (error) => {
        if (!error) {
          vm.$axios.post('starday-user/forget/password/email/send/' + vm.formItem.email).then((res) => {
            if (res.code === 200) {
              vm.sendCode = true
              vm.searchNumContent = 600
              vm.$Message.success(res.message || vm.getLanguageData.lineau.sendSuccess)
              const _timeIn = setInterval(function () {
                if (vm.searchNumContent <= 0) {
                  clearInterval(_timeIn)
                  vm.sendCode = false
                  return
                }
                vm.searchNumContent--
              }, 1000)
            }
          })
        }
      })
    },
    sendMobileCodeHandle () {
      const vm = this
      if (vm.sendMobileCode) {
        return
      }
      this.$refs.ruleMobileform.validateField('mobile', (error) => {
        if (!error) {
          vm.$axios.post('starday-user/forget/password/mobile/send/' + vm.formMobileItem.mobile + '/' + vm.formMobileItem.country).then((res) => {
            if (res.code === 200) {
              vm.sendMobileCode = true
              vm.searchMobileNumContent = 600
              vm.$Message.success(res.message || vm.getLanguageData.lineau.sendSuccess)
              const _timeIn = setInterval(function () {
                if (vm.searchMobileNumContent <= 0) {
                  clearInterval(_timeIn)
                  vm.sendMobileCode = false
                  return
                }
                vm.searchMobileNumContent--
              }, 1000)
            }
          })
        }
      })
    },
    sureHandle () {
      const vm = this
      if (vm.activeTab === '1') {
        vm.$refs.ruleMobileform.validate((valid) => {
          if (valid) {
            vm.$axios.post('starday-user/forget/password/mobile/reset/password', vm.formMobileItem).then((res) => {
              if (res.code === 200) {
                vm.$Message.success(vm.getLanguageData.login.resetPassSuccess)
                this.$router.push('/login')
              }
            })
          }
        })
        return
      }
      vm.$refs.ruleform.validate((valid) => {
        if (valid) {
          vm.$axios.post('starday-user/forget/password/email/reset/password', vm.formItem).then((res) => {
            if (res.code === 200) {
              vm.$Message.success(vm.getLanguageData.login.resetPassSuccess)
              this.$router.push('/login')
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    }),
    ruleValidate () {
      const vm = this
      const validatePass = (rule, value, callback) => {
        if (value !== vm.formItem.password) {
          callback(new Error(vm.getLanguageData.loginpage.passwordEqual))
        } else {
          callback()
        }
      }
      const _valid = {
        email: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wremail,
            trigger: 'blur'
          },
          {
            type: 'email',
            message: vm.getLanguageData.loginpage.emailreg,
            trigger: 'blur'
          }
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
        ],
        emailCode: [
          { required: true, message: vm.getLanguageData.lineau.wrmobileCode, trigger: 'blur' }
        ],
        confirmPassword: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }

        ]
      }
      return _valid
    },
    ruleMobileValidate () {
      const vm = this
      const validatePass = (rule, value, callback) => {
        if (value !== vm.formMobileItem.password) {
          callback(new Error(vm.getLanguageData.loginpage.passwordEqual))
        } else {
          callback()
        }
      }
      const _valid = {
        mobile: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrphoneNum,
            trigger: 'blur'
          },
          {
            pattern: vm.formMobileItem.country === '+81' ? /^[0][0-9]{10}$/ : /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: vm.getLanguageData.loginpage.phonereg,
            trigger: 'blur'
          }
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
        ],
        mobileCode: [
          { required: true, message: vm.getLanguageData.loginpage.wrvalicode, trigger: 'blur' }
        ],
        confirmPassword: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }

        ]
      }
      return _valid
    }
  }

}
</script>

<style scoped lang="scss">
.forget{
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  text-align: center;
  .forgetbox{
    display: inline-block;
    width: 900px;
    .btnbox{
      text-align: center;
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
      }
    }
    .togglespan{
      margin: 20px 0;
      span{
        cursor: pointer;
        color: #666666;
        font-size: 12px;
      }
    }

  }
}
</style>
