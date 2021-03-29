<template>
  <div class="verification">
    <div v-if="!flag" class="breadbox">
      <!-- {{ listData }} -->
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{ getLanguageData.emailText.personalInfo }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal/nextpay'">{{getLanguageData.nextText.nextPay}}</BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.nextText.validNextPay}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div :class="!flag ? 'content' : 'content1'">
      <p class="title" v-if="!flag">
        {{getLanguageData.nextText.validNextPay}}
      </p>
      <div class="formbox">
        <div class="centerbox">
          <Form
            style="margin-bottom:40px;"
            ref="formValRef"
            inline
            :model="formVal"
            :rules="formValRules"
            label-position="top"
            :hide-required-mark="true">
            <FormItem :label="getLanguageData.nextText.phoneNum" prop="mobile">
              <Input v-model="formVal.mobile" style="width:300px;" maxlength="11" :placeholder="getLanguageData.loginpage.wrphoneNum">
                <span slot="prepend">+81</span>
              </Input>
            </FormItem>
            <FormItem v-if="btnshow" :label="getLanguageData.nextText.mobileCode" prop="mobileCode">
              <Input v-model="formVal.mobileCode" style="width:146px;">
              </Input>
              <Button v-if="sendflag" type="primary" style="margin-left:20px;" @click="sendCode">{{getLanguageData.nextText.getCode}}</Button>
              <Button v-else type="primary" style="margin-left:20px;">{{times}}s</Button>
            </FormItem>

            <FormItem :label="getLanguageData.nextText.name" prop="name">
              <Input v-model="formVal.name" style="width:600px;" :placeholder="getLanguageData.nextText.plaIntName">
              </Input>
            </FormItem>
            <FormItem :label="getLanguageData.nextText.email" prop="email">
              <Input v-model="formVal.email" style="width:600px;" :placeholder="getLanguageData.nextText.plaIntEmail">
              </Input>
            </FormItem>

            <FormItem :label="getLanguageData.nextText.postcode" prop="postcode">
              <Input v-model="formVal.postcode" @on-change="changeVal" maxlength="7" style="width:600px;" :placeholder="getLanguageData.nextText.plaIntPostcode">
              </Input>
            </FormItem>

            <FormItem :label="getLanguageData.nextText.accountAddress" prop="deliveryAddress">
              <Cascader
                v-model="formVal.areaIds"
                :data="areaData"
                :placeholder="getLanguageData.adressPage.selectarea"
                @on-change="changeSelectArea"
              />
              <Input v-model="formVal.deliveryAddress" style="width:600px;margin-top:10px;" :placeholder="getLanguageData.nextText.plaIntNumber">
              </Input>
            </FormItem>

            <FormItem :label="getLanguageData.nextText.notifyType" prop="notifyType">
              <Select v-model="formVal.notifyType" :placeholder="getLanguageData.nextText.plaSeleteType" style="width:600px;">
                <Option value="1">{{getLanguageData.nextText.smsText}}</Option>
                <Option value="2">{{getLanguageData.nextText.emailtext}}</Option>
              </Select>
            </FormItem>
          </Form>
          <div class="btnbox" v-if="!flag" @click="submit">
            {{infoState ? getLanguageData.nextText.sureModify : getLanguageData.nextText.goValid}}
          </div>
          <div v-if="flag" class="modelbtn">
            <div v-if="JSON.stringify(formVal) !== '{}'">
              <Button @click="clostModel">{{getLanguageData.goodsText.clostBtn}}</Button>
              <Button type="primary" style="margin-left:20px;" @click="submit">{{getLanguageData.nextText.goValid}}</Button>
            </div>
            <div v-else class="btnbox" @click="submit">
              {{getLanguageData.nextText.sureModify}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { filterArea } from '@/assets/js/util'
export default {
  name: 'verification',
  middleware: 'auth',
  props: ['flag'],
  data () {
    return {
      formVal: {
        mobile: '',
        mobileAreaCode: '+81',
        mobileCode: '',
        name: '',
        email: '',
        postcode: '',
        areaIds: [],
        provinceId: '',
        cityId: '',
        areaId: '',
        address: '',
        deliveryAddress: '',
        notifyType: ''
      },
      areaData: [],
      times: 60,
      timer: null,
      sendflag: true,
      btnshow: true,
      resData: {},
      infoState: false
    }
  },
  mounted () {
    this.requestAreaList()
    setTimeout(() => {
      this.getPayInfo()
    }, 300)
  },
  watch: {
    'formVal.mobile': {
      handler (val) {
        if (val !== this.resData.mobile) {
          this.btnshow = true
        } else {
          this.btnshow = false
        }
      }
    }
  },
  methods: {
    changeVal (val) {
      const vm = this
      const _arr = []
      if (val.target.value.length >= 7) {
        vm.$axios({
          url: 'starday-user/sys/postcode/' + val.target.value,
          method: 'get'
        }).then((res) => {
          if (res.code === 200) {
            // console.log('res---', res)
            if (res.data) {
              vm.formVal.deliveryAddress = res.data.detail || ''
              vm.areaData.forEach((item) => {
                if (item.label === res.data.province) {
                  _arr.push(item.code)
                  vm.formVal.address = '' + item.label
                  item.children.forEach((e) => {
                    if (res.data.district.includes(e.label)) {
                      _arr.push(e.code)
                      vm.formVal.address += e.label
                      e.children.forEach((v) => {
                        if (res.data.district.includes(v.label)) {
                          _arr.push(v.code)
                          vm.formVal.address += v.label
                        }
                      })
                    }
                  })
                }
              })
              vm.formVal.areaIds = [..._arr]
            } else {
              vm.formVal.deliveryAddress = ''
              vm.formVal.areaIds = []
            }
            // console.log('vm.formVal.areaIds---', vm.formVal.areaIds)
          }
        })
      }
    },
    clostModel () {
      this.$emit('clostModel')
      this.getPayInfo()
    },
    getPayInfo () {
      const vm = this
      const _arr = []
      vm.$axios({
        url: 'starday-user/user/monthly/pay/info',
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          // console.log('vm.areaData----', vm.areaData)
          vm.areaData.forEach((item) => {
            if (res.data.address.includes(item.label)) {
              _arr.push(item.code)
              item.children.forEach((e) => {
                if (res.data.address.includes(e.label)) {
                  _arr.push(e.code)
                  e.children.forEach((v) => {
                    if (res.data.address.includes(v.label)) {
                      _arr.push(v.code)
                    }
                  })
                }
              })
            }
          })
          vm.resData = res.data || {}
          const _data = JSON.parse(JSON.stringify(res.data))
          if (_data) {
            _data.notifyType = (_data.notifyType + '') || ''
            // _data.areaIds = [_data.provinceId + '', _data.cityId + '', _data.areaId + ''] || []
          }
          vm.formVal = _data || {}
          vm.formVal.areaIds = [..._arr]
          if (vm.formVal.mobile) {
            vm.btnshow = false
            vm.infoState = true
          }
        }
      })
    },
    sendCode () {
      const vm = this
      if (vm.formVal.mobile && vm.formVal.mobile.length === 11) {
        vm.$axios({
          url: 'starday-user/user/monthly/pay/mobile/send/' + vm.formVal.mobile + '/+81',
          method: 'post'
        }).then((res) => {
          if (res.code === 200) {
            vm.$Message.success(res.message)
            vm.sendflag = false
            vm.timer = setInterval(() => {
              if (vm.times <= 0) {
                clearInterval(vm.timer)
                vm.times = 60
                vm.sendflag = true
                return
              }
              vm.times--
            }, 1000)
          }
        })
      } else {
        vm.$Message.warning(vm.getLanguageData.nextText.plaIntCorrectPhone)
      }
    },
    changeSelectArea (val, data) {
      if (data && data.length) {
        this.formVal.address = data[0].name + data[1].name + data[2].name
      } else {
        this.formVal.address = ''
      }
    },
    requestAreaList () {
      const vm = this
      vm.$axios.get('starday-system/areacode/all/0').then((res) => {
        if (res.code === 200) {
          vm.areaData = filterArea(res.data)
        }
      })
    },
    submit () {
      const vm = this
      this.$refs.formValRef.validate((valid) => {
        if (valid) {
          vm.formVal.provinceId = vm.formVal.areaIds[0]
          vm.formVal.cityId = vm.formVal.areaIds[1]
          vm.formVal.areaId = vm.formVal.areaIds[2]
          vm.formVal.mobileAreaCode = '+81'
          vm.$axios({
            url: 'starday-user/user/monthly/pay/update',
            method: 'post',
            data: vm.formVal
          }).then((res) => {
            if (res.code === 200) {
              if (vm.infoState) {
                vm.$Message.success(vm.getLanguageData.nextText.modifyInfoSuccess)
              } else {
                vm.$Message.success(vm.getLanguageData.nextText.openSuccess)
              }
              this.$emit('clostModel')
              if (!vm.flag) {
                vm.$router.push('/personal/nextpay')
              }
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    formValRules () {
      const vm = this
      const formValRules = {
        mobile: [
          { required: true, message: vm.getLanguageData.loginpage.wrphoneNum, trigger: 'blur' }
        ],
        mobileCode: [
          { required: true, message: vm.getLanguageData.loginpage.wrvalicode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: vm.getLanguageData.nextText.plaIntName, trigger: 'blur' }
        ],
        email: [
          { required: true, message: vm.getLanguageData.nextText.plaIntEmail, trigger: 'blur' }
        ],
        areaIds: [
          { required: true, type: 'array', message: vm.getLanguageData.nextText.plaSelectAera, trigger: 'change' }
        ],
        postcode: [
          { required: true, message: vm.getLanguageData.nextText.plaIntPostcode, trigger: 'blur' }
        ],
        deliveryAddress: [
          { required: true, message: vm.getLanguageData.nextText.plaIntNumber, trigger: 'blur' }
        ],
        notifyType: [
          { required: true, message: vm.getLanguageData.nextText.plaSeleteType, trigger: 'change' }
        ]
      }
      return formValRules
    }
  }
}
</script>
<style lang="scss" scoped>
  .verification {
    /deep/.ivu-form-item-label{
      color:#333!important;
      font-weight: 500;
    }
    .modelbtn{
      margin-top: 36px;
      text-align: center;
    }
    /deep/.modelbtn .ivu-btn{
      width: 140px;
      height: 50px;
    }
    .content{
      padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      .formbox{
        margin-top: 24px;
        padding: 40px 0;
        border: 1px solid #e0e0e0;
        .centerbox{
          width: 620px;
          margin: 0 auto;
          .btnbox{
            width: 416px;
            height: 54px;
            margin:0 auto;
            background: #e76636;
            border-radius: 2px;
            color: #ffffff;
            text-align: center;
            line-height: 54px;
            cursor: pointer;
          }
        }
      }
    }
    .content1{
      // padding: 24px 40px;
      background-color: #fff;
      .title{
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      .formbox{
        // margin-top: 24px;
        // padding: 40px 0;
        // border: 1px solid #e0e0e0;
        .centerbox{
          width: 620px;
          margin: 0 auto;
          .btnbox{
            width: 416px;
            height: 54px;
            margin:0 auto;
            background: #e76636;
            border-radius: 2px;
            color: #ffffff;
            text-align: center;
            line-height: 54px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
