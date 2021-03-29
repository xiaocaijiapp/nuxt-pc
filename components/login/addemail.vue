<template>
  <div class="addemail">
    <div class="emailcontent">
      <div class="emailaddtitle">
        {{ getLanguageData.lineau.addemail }}
      </div>
      <div class="formbox">
        <Form ref="formInline" :model="formItem" :rules="ruleValid" :label-width="130">
          <FormItem>
            <span style="font-size:12px;color: #FF1010;margin: 10px 0;line-height: 10px">{{ getLanguageData.lineau.addemailtip }}</span>
          </FormItem>
          <FormItem prop="email" :label="getLanguageData.lineau.email">
            <Input v-model="formItem.email" type="text" :placeholder="getLanguageData.lineau.wremail" style="width: 405px;" ></Input>
          </FormItem>
          <FormItem prop="valiCode" :label="getLanguageData.lineau.mobileCode">
            <Input v-model.trim="formItem.valiCode" type="text" :placeholder="getLanguageData.lineau.wrmobileCode" style="width: 230px;" ></Input>
            <Button type="primary" style="width: 172px;" @click="sendCodeHandle">
              {{ sendCode?searchNumContent:getLanguageData.lineau.sendCode }}
            </Button>
          </FormItem>
        </Form>
        <div class="btnbox">
          <p @click="closeAddEmailModal">
            {{ getLanguageData.lineau.close }}
          </p>
          <p @click="saveEmailHandle">
            {{ getLanguageData.lineau.add }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Addemail',
  data () {
    return {
      formItem: {
        email: '',
        valiCode: ''
      },
      sendCode: false,
      searchNumContent: 600
    }
  },
  methods: {
    ...mapActions({
      handleSetLoginData: 'handleLogin',
      handleLogOut: 'handleLogout'
    }),
    saveEmailHandle () {
      const vm = this
      vm.$refs.formInline.validate((valid) => {
        if (valid) {
          vm.$axios.post('/starday-user/user/add/email/' + vm.formItem.email + '/' + vm.formItem.valiCode).then((res) => {
            if (res.code === 200) {
              if (res.context * 1 === 1) {
                const _obj = vm.getLoginData
                _obj.email = vm.formItem.email
                vm.handleSetLoginData(_obj)
                vm.closeAddEmailModal()
                vm.$Message.success(vm.getLanguageData.lineau.bindSuccess)
              } else if (res.context * 1 === 2) {
                vm.handleLogOut()
                setTimeout(() => {
                  vm.$Message.success(vm.getLanguageData.lineau.bindSuccesslogin)
                  vm.$router.push('/login')
                })
              } else if (res.context * 1 === 3) {
                vm.$Message.success(vm.getLanguageData.lineau.bindSuccessre)
              }
            } else {
              vm.$Message.error(vm.getLanguageData.lineau.bindError)
            }
          })
        }
      })
    },
    closeAddEmailModal () {
      this.$emit('closeAddEmailModal')
    },
    sendCodeHandle () {
      const vm = this
      if (vm.sendCode) {
        return
      }
      this.$refs.formInline.validateField('email', (error) => {
        if (!error) {
          vm.$axios.post('starday-user/user/add/email/send/' + vm.formItem.email).then((res) => {
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
    }
  },
  computed: {
    ...mapGetters({
      getLoginData: 'getLoginData',
      getLanguageData: 'getLanguageData'
    }),
    ruleValid () {
      const vm = this
      const ruleValidObj = {
        email: [
          { required: true, message: vm.getLanguageData.lineau.wremail, trigger: 'blur' },
          { type: 'email', message: vm.getLanguageData.lineau.emailtypeerr, trigger: 'blur' }
        ],
        valiCode: [
          { required: true, message: vm.getLanguageData.lineau.wrmobileCode, trigger: 'blur' }
        ]
      }
      return ruleValidObj
    }
  }
}
</script>

<style scoped lang="scss">
.addemail{
  position: fixed;
  z-index: 1010;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  text-align: center;
  .emailcontent{
    display: inline-block;
    width: 698px;
    height: 365px;
    background-color: #fff;
    margin-top: 180px;
    padding: 30px 40px;
    text-align: left;
    .emailaddtitle{
      font-size:18px;
      font-weight:400;
      color:#333333;
      margin-bottom: 10px;
    }
    .btnbox{
      text-align: center;
      margin-top:50px;
      p{
        display: inline-block;
        width:180px;
        height:40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
      p:nth-of-type(1){
        background:rgba(235,235,235,1);
        color: #666666;
      }
      p:nth-of-type(2){
        background:rgba(231,102,54,1);
        color: #ffffff;
      }
    }
  }
}
</style>
