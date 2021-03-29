<template>
    <div class="shipInfo">
        <div class="breadbox">
            <Breadcrumb separator=">">
                <BreadcrumbItem :to="getLOCATIONORIGIN">
                {{ getLanguageData.indexPage.page }}
                </BreadcrumbItem>
                <BreadcrumbItem>
                {{ getLanguageData.storeText.shipInfo1 }}
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="bodybox">
            <p>
                {{ getLanguageData.storeText.intShipInfo }}
            </p>
            <div class="formbox">
                <Form ref="shipFormRef" :model="shipForm" :rules="shipFormRules" :label-width="300">
                    <FormItem :label="getLanguageData.adressPage.area" prop="areaIds">
                        <Cascader
                            style="width:300px;"
                            v-model="shipForm.areaIds"
                            :data="areaData"
                            :placeholder="getLanguageData.adressPage.selectarea"
                            @on-change="changeSelectArea"
                        />
                    </FormItem>

                     <FormItem :label="getLanguageData.receiptText.detialAdress" prop="adress">
                        <Input v-model="shipForm.adress" maxlength="50" :placeholder="getLanguageData.storeText.plaIntNum" style="width:300px;"></Input>
                    </FormItem>

                    <FormItem :label="getLanguageData.orderText.consignee" prop="shipName">
                        <Input v-model="shipForm.shipName" maxlength="20" :placeholder="getLanguageData.adressPage.wrreceive" style="width:300px;"></Input>
                    </FormItem>

                    <FormItem :label="getLanguageData.receiptText.phoneNumber" prop="phone">
                        <Input v-model="shipForm.phone" :placeholder="getLanguageData.adressPage.wrphone" maxlength="11" style="width:300px;"></Input>
                    </FormItem>

                    <FormItem :label="getLanguageData.receiptText.postcode" prop="emailCode">
                        <Input v-model="shipForm.emailCode" maxlength="7" :placeholder="getLanguageData.adressPage.wremailcode" style="width:300px;"></Input>
                    </FormItem>

                    <FormItem :label="getLanguageData.storeText.email" prop="email">
                        <Input v-model="shipForm.email" :placeholder="getLanguageData.lineau.wremail" style="width:300px;"></Input>
                    </FormItem>

                    <FormItem :label="getLanguageData.loginpage.valicode" prop="sendCode">
                        <Input v-model="shipForm.sendCode" :placeholder="getLanguageData.loginpage.wrvalicode" style="width:196px;"></Input>
                        <Button v-if="showBtn" @click="sendCodeClick">{{getLanguageData.lineau.sendCode}}</Button>
                        <Button v-if="!showBtn">{{getLanguageData.storeText.argenSend.replace('M', timer)}}</Button>
                    </FormItem>

                    <FormItem style="margin-top:40px;">
                        <Button @click="goDetial">{{getLanguageData.receiptText.cancelBtn}}</Button>
                        <Button type="primary" style="margin-left:50px;" @click="submit">{{getLanguageData.emailText.sureButton}}</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { filterArea } from '@/assets/js/util'
export default {
  name: 'shipInfo',
  data () {
    return {
      areaData: [],
      shipForm: {
        address: '',
        areaIds: [],
        shipName: '',
        phone: '',
        emailCode: '',
        email: '',
        sendCode: '',
        areaIdsName: ''
      },
      timer: 300,
      timerId: null,
      showBtn: true,
      newType: ''
    }
  },
  mounted () {
    if (this.$route.query.type) {
      this.newType = this.$route.query.type
    }
    // console.log('this.newType------', this.newType)
    if (localStorage.getItem('areaData')) {
      this.areaData = JSON.parse(localStorage.getItem('areaData'))
    } else {
      this.requestAreaList()
    }
    // console.log('getBuyNowGood----', this.getBuyNowGood)
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getBuyNowGood: 'getBuyNowGood',
      getAddBuyCart: 'getAddBuyCart'
    }),
    shipFormRules () {
      const vm = this
      const shipFormRules = {
        adress: [
          { required: true, message: vm.getLanguageData.storeText.plaIntShipAdree, trigger: 'blur' }
        ],
        areaIds: [
          { required: true, type: 'array', min: 2, message: vm.getLanguageData.storeText.plaSelectAdree, trigger: 'change' }
        ],
        shipName: [
          { required: true, message: vm.getLanguageData.adressPage.wrreceive, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: vm.getLanguageData.adressPage.wrphone, trigger: 'blur' }
        ],
        emailCode: [
          { required: true, message: vm.getLanguageData.adressPage.wremailcode, trigger: 'blur' }
        ],
        email: [
          { required: true, message: vm.getLanguageData.loginpage.wremail, trigger: 'blur' },
          { pattern: /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+[.][A-Za-z0-9_-]{2,4}$/, message: vm.getLanguageData.lineau.emailtypeerr, trigger: 'blur' }
        ],
        sendCode: [
          { required: true, message: vm.getLanguageData.loginpage.wrvalicode, trigger: 'blur' }
        ]
      }
      return shipFormRules
    }
  },
  methods: {
    ...mapActions({
      handlePlaceData: 'handlePlaceData',
      handleAddBuyCart: 'handleAddBuyCart'
    }),
    goDetial () {
      this.$router.back()
    },
    // 处理游客购物车数据
    editBuyCart () {
      const vm = this
      const _arr = []
      const _dataArr = vm.getAddBuyCart
      _dataArr.forEach((item, index) => {
        item.shopItems.forEach((chItem) => {
          if (chItem.checked) {
            _arr.push({
              num: chItem.num,
              skuId: chItem.skuId,
              spuId: chItem.spuId,
              storeId: item.storeId,
              skuValue: chItem.skuValue
            })
          }
        })
      })
      return _arr
      // console.log('_arr----', _arr)
    },
    submit () {
      const vm = this
      // vm.editBuyCart()
      const _addAress = {
        address: vm.shipForm.areaIdsName,
        country: 'JP',
        provinceId: vm.shipForm.areaIds[0],
        cityId: vm.shipForm.areaIds[1],
        areaId: vm.shipForm.areaIds[2],
        def: 1,
        deliveryAddress: vm.shipForm.adress,
        mobile: vm.shipForm.phone,
        postcode: vm.shipForm.emailCode,
        realName: vm.shipForm.shipName
      }
      const _data = {
        email: vm.shipForm.email,
        emailCode: vm.shipForm.sendCode,
        userAddressDto: _addAress
      }
      this.$refs.shipFormRef.validate((valid) => {
        if (valid) {
          vm.$axios({
            url: 'starday-auth/login/guest/email/login.do',
            method: 'post',
            data: _data
          }).then((res) => {
            if (res.code === 200) {
              vm.$store.dispatch('handleLogin', res.data)
              Cookie.set('token', res.data.token)
              if (vm.newType) {
                vm.$axios({
                  url: 'starday-order/shopCart/addVisitorCart',
                  method: 'post',
                  data: vm.editBuyCart()
                }).then((res) => {
                  if (res.code === 200) {
                    vm.handlePlaceData(res.data)
                    vm.$router.push('/shoppingcart')
                    vm.handleAddBuyCart([])
                  }
                })
              } else {
                vm.$axios.post('starday-order/order/buyImmediately', {
                  buyCount: vm.getBuyNowGood.buyCount * 1,
                  skuId: vm.getBuyNowGood.skuId
                }).then((res) => {
                  if (res.code === 200) {
                    vm.handlePlaceData(res.data)
                    vm.$router.push('/placeorder')
                  }
                })
              }
            }
          })
        }
      })
    },
    sendCodeClick () {
      const vm = this
      if (!vm.shipForm.email) {
        return vm.$Message.warning(vm.getLanguageData.lineau.wremail)
      }
      vm.$axios({
        url: 'starday-auth/login/guest/email/send/' + vm.shipForm.email,
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          vm.timerId = setInterval(() => {
            vm.showBtn = false
            vm.timer--
            if (vm.timer <= 0) {
              clearInterval(vm.timerId)
              vm.showBtn = true
              vm.timer = 300
            }
          }, 1000)
        }
      })
    },
    changeSelectArea (val, data) {
      if (data && data.length) {
        this.shipForm.areaIdsName = data[0].name + ' ' + data[1].name + ' ' + data[2].name
      } else {
        this.shipForm.areaIdsName = ''
      }
    },
    requestAreaList () {
      const vm = this
      vm.$axios.get('starday-system/areacode/all/0').then((res) => {
        if (res.code === 200) {
          localStorage.setItem('areaData', JSON.stringify(filterArea(res.data)))
          vm.areaData = JSON.parse(localStorage.getItem('areaData'))
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.shipInfo{
  .breadbox {
    margin: 12px 0;
  }
  .bodybox{
    background-color: #fff;
    width:100%;
    padding:20px 30px 50px;
    .formbox{
        margin-top:30px;
    }
  }
}
/deep/.ivu-cascader-menu{
  width:150px;
}
</style>
