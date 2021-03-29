<template>
  <div class="address">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{getLanguageData.emailText.personalInfo}}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.receiptText.receiptAdress }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="address_container">
      <section class="address_title">
        {{ getLanguageData.receiptText.receiptAdress }}
      </section>
      <div class="adressbox">
        <div v-for="(item,index) in adressList" :key="index" class="list">
          <adresstem :item="item" @editHandle="editHandle" @upDefAdressHandle="upDefAdressHandle" @deleteHandle="deleteHandle" />
        </div>
      </div>
      <p class="btnpro" @click="adressShow=true,addressType='add'">
        + {{ getLanguageData.receiptText.addAdress }}
      </p>
    </div>

    <!--    修改地址卡-->
    <Modal v-model="adressShow" :title="addressType==='add' ? getLanguageData.receiptText.addAdress: getLanguageData.receiptText.editAdress" width="600px" :scrollable="true" @on-visible-change="modelHidde">
      <div class="giftbox">
        <Form ref="formadd" label-position="right" :rules="ruleValidate" :model="formItem">
          <FormItem prop="postcode" style="margin-bottom: 0px">
            <div style="color: #333;font-size: 14px;font-weight: 600;margin: 0px 0 8px">{{getLanguageData.receiptText.postcode}}</div>
            <Input
              v-model="formItem.postcode"
              class="inputnumber"
              :placeholder="getLanguageData.receiptText.suchAs"
              type="text"
              :maxlength="7"
              style="width: 560px"
            ></Input>
          </FormItem>
          <FormItem prop="provinceId" style="margin-bottom: 0px">
            <div style="color: #333;font-size: 14px;font-weight: 600;margin: 8px 0">{{getLanguageData.receiptText.locationArea}}</div>
            <Cascader v-model="formItem.area" :data="areaArrData" :placeholder="getLanguageData.receiptText.locationArea" style="width: 560px" @on-change="changeAreaselect" />
          </FormItem>
          <FormItem prop="deliveryAddress" style="margin-bottom: 0px">
            <div style="color: #333;font-size: 14px;font-weight: 600;margin: 8px 0">{{getLanguageData.receiptText.detialAdress}}</div>
            <Input v-model="formItem.deliveryAddress" :placeholder="getLanguageData.receiptText.intStreet" :maxlength="120" style="width: 560px"></Input>
          </FormItem>
          <FormItem prop="realName" style="margin-bottom: 0px">
            <div style="color: #333;font-size: 14px;font-weight: 600;margin: 8px 0">{{getLanguageData.receiptText.receiverName}}</div>
            <Input v-model="formItem.realName" :placeholder="getLanguageData.receiptText.receiverName" :maxlength="32" style="width: 560px"></Input>
          </FormItem>
          <FormItem prop="mobile" style="margin-bottom: 0px">
            <div style="color: #333;font-size: 14px;font-weight: 600;margin: 8px 0">{{getLanguageData.receiptText.receiverPhone}}</div>
            <Input
              v-model="formItem.mobile"
              class="inputnumber"
              :placeholder="getLanguageData.receiptText.receiverPhone"
              type="number"
              :maxlength="16"
              style="width: 560px"
            ></Input>
          </FormItem>
          <FormItem style="margin-top: 10px; margin-bottom: 0px">
            <Checkbox v-model="formItem.checked" :label="getLanguageData.receiptText.setDefultAdress" />{{ getLanguageData.receiptText.setDefultAdress }}
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="adressShow=false">
          {{ getLanguageData.receiptText.cancelBtn }}
        </Button>
        <Button type="primary" @click="submitHandle('formadd')">
          {{ getLanguageData.receiptText.saveAdressBtn }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adresstem from '@/components/address/adresstem'
import { filterArea } from '@/assets/js/util'
import REG from '@/assets/js/REG'
export default {
  name: 'Index',
  components: { adresstem },
  data () {
    return {
      adressList: [],
      showTipDelete: false,
      adressShow: false,
      areaArrData: [],
      addressType: 'add',
      formItem: {
        address: '',
        id: '',
        realName: '',
        mobile: '',
        area: [],
        deliveryAddress: '',
        checked: false,
        def: 1,
        postcode: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        country: 'jp'
      }
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    ruleValidate () {
      const vm = this
      const _data = {
        realName: [
          { required: true, message: vm.getLanguageData.goodsText.mustInt, trigger: 'blur' },
          { type: 'string', min: 2, max: 32, message: vm.getLanguageData.receiptText.stringLength, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: vm.getLanguageData.goodsText.mustInt, trigger: 'blur' },
          { type: 'string', max: 18, message: vm.getLanguageData.receiptText.maxLength, trigger: 'blur' },
          { type: 'string', min: 10, message: vm.getLanguageData.receiptText.minLength, trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: vm.getLanguageData.goodsText.mustInt, trigger: 'change' }
        ],
        deliveryAddress: [
          { required: true, message: vm.getLanguageData.goodsText.mustInt, trigger: 'blur' },
          { type: 'string', min: 5, max: 120, message: vm.getLanguageData.receiptText.maxMinLength, trigger: 'blur' }
        ],
        postcode: [
          { required: true, message: vm.getLanguageData.goodsText.mustInt, trigger: 'blur' },
          { pattern: REG.post, message: vm.getLanguageData.receiptText.intPostCodeLength, trigger: 'blur' }
        ]
      }
      return _data
    }
  },
  mounted () {
    if (localStorage.getItem('areaData')) {
      this.areaArrData = JSON.parse(localStorage.getItem('areaData'))
    } else {
      this.requestAreaList()
    }
    this.requestAddressList()
  },
  methods: {
    requestAddressList () {
      const _this = this
      _this.$axios.post('starday-user/user/address/list').then((res) => {
        if (res.code === 200) {
          _this.adressList = res.data || []
        }
      })
    },
    requestAreaList () {
      const vm = this
      vm.$axios.get('starday-system/areacode/all/0').then((res) => {
        if (res.code === 200) {
          localStorage.setItem('areaData', JSON.stringify(filterArea(res.data)))
          vm.areaArrData = JSON.parse(localStorage.getItem('areaData'))
        }
      })
    },
    // 编辑
    editHandle (item) {
      this.addressType = 'edit'
      this.formItem = item
      this.formItem.provinceId = item.provinceId + ''
      this.formItem.cityId = item.cityId + ''
      this.formItem.areaId = item.areaId + ''
      this.formItem.area = [item.provinceId + '', item.cityId + '', item.areaId + '']
      this.formItem.postcode = item.postcode
      this.formItem.def = item.def
      if (item.def === 0) {
        this.formItem.checked = true
      } else {
        this.formItem.checked = false
      }
      this.adressShow = true
    },
    // 设置默认地址
    upDefAdressHandle (item) {
      this.$axios.put('starday-user/user/address/def/' + item.id).then((res) => {
        if (res.code === 200) {
          this.$Message.success(this.getLanguageData.receiptText.setAdressSuccess)
          this.requestAddressList()
        }
      })
    },
    deleteHandle (item) {
      const _this = this
      this.$Modal.confirm({
        title: this.getLanguageData.receiptText.tips,
        content: '<p>' + this.getLanguageData.receiptText.sureDelete + '？</p>',
        onOk: () => {
          _this.$axios.delete('starday-user/user/address/' + item.id).then((res) => {
            if (res.code === 200) {
              _this.$Message.success(this.getLanguageData.emailText.deleteSuccess)
              _this.requestAddressList()
            }
          })
        }
      })
    },
    submitHandle (name) {
      const _this = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (_this.formItem.checked) {
            _this.formItem.def = 0
          } else {
            _this.formItem.def = 1
          }
          if (_this.addressType === 'add') {
            _this.$axios.post('starday-user/user/address/add', _this.formItem).then((res) => {
              if (res.code === 200) {
                _this.$Message.success(this.getLanguageData.receiptText.addSuccess)
                _this.adressShow = false
                _this.requestAddressList()
              }
            })
          } else {
            _this.$axios.put('starday-user/user/address/' + _this.formItem.id, _this.formItem).then((res) => {
              if (res.code === 200) {
                _this.$Message.success(this.getLanguageData.receiptText.editSuccess)
                _this.adressShow = false
                _this.requestAddressList()
              }
            })
          }
        }
      })
    },
    changeAreaselect (a, b) {
      this.formItem.provinceId = a[0]
      let str = ''
      b.forEach(function (item) {
        str += item.label
      })
      this.formItem.address = str
      this.formItem.cityId = a[1]
      this.formItem.areaId = a[2]
    },
    modelHidde (str) {
      if (str) { return }
      this.formItem = {
        address: '',
        id: '',
        realName: '',
        mobile: '',
        area: [],
        deliveryAddress: '',
        checked: false,
        def: 1,
        postcode: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        country: 'jp'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .address {
    .address_container {
      .adressbox {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
        .list {
          padding: 10px;
        }
      }
      .btnpro {
        display: inline-block;
        width: 230px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #E0E0E0;
        cursor: pointer;
        margin: 20px 0;
      }
    }
  }
</style>
