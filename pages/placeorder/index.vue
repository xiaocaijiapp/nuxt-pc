<template>
  <div class="placeorder">
    <div class="breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{ getLanguageData.placeOrder.submitOrder }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="adressbox">
      <p class="pagetitle">
        {{ getLanguageData.placeOrder.submitOrder }}
      </p>
      <div class="adresscontent">
        <div class="adresstitle">
          <span class="itemtitle">{{ getLanguageData.placeOrder.receiveAdress }}</span>
          <span @click="adressShow=true"> + {{ getLanguageData.placeOrder.addAdress }}</span>
        </div>
        <div class="adresslist">
          <div v-for="(item,index) in adressData" :key="index">
            <adress
              v-if="lookMoreShow?true:(index<4)"
              :item="item"
              :use-adress-id="useAdressId"
              @refreshAdressHandle="requestAdressList"
              @refreshUseId="refreshUseIdHandle"
              @editAdressHandle="editAdressHandle"
            />
          </div>
        </div>
        <p style="text-align: right;cursor: pointer">
          <span @click="lookMoreShow=!lookMoreShow">{{ lookMoreShow ? getLanguageData.goodsText.putAway :getLanguageData.placeOrder.lookmore }}</span>
        </p>
        <div v-if="!adressData.length" class="nonebox">
          <img src="@/assets/images/none/asress.png" alt="">
          <p>{{ getLanguageData.placeOrder.nodeAdressTip }}</p>
        </div>
      </div>
    </div>
    <div class="dealbox">
      <p class="itemtitle">
        {{ getLanguageData.placeOrder.shopdeal }}
      </p>
      <div class="tablebox">
        <Table :columns="columns1" :data="tableData" :span-method="handleSpan" />
      </div>
    </div>
    <div class="marketbox">
      <p class="itemtitle">
        {{ getLanguageData.placeOrder.market }}
      </p>
      <div class="marketboxcontent">
        <div class="marketboxtitle">
          <p :class="activeMarket==='0'?'activep':''" @click="activeMarket='0'">
            {{ getLanguageData.placeOrder.coupon }}
          </p>
          <p :class="activeMarket==='1'?'activep':''" @click="activeMarket='1'">
            {{ getLanguageData.placeOrder.integral }}
          </p>
        </div>
        <div class="marketlistbox">
          <div v-if="activeMarket==='0'" class="couponlistbox">
            <div v-if="couponList.length" class="couponlist">
              <coupon
                v-for="(item,index) in couponList"
                :key="index+'coupon'"
                :item="item.couponActivityDto"
                :usercoupon="item"
                :data-price="dataPrice"
                :cate-arr-pro="cateArrPro"
                :select-coupon-id="selectCouponId"
                @selectCouponHandle="selectCouponHandle"
              />
            </div>
            <div v-else class="nonebox">
              <img src="@/assets/images/none/coupon.png" alt="">
              <p>{{ getLanguageData.placeOrder.nonecoupon }}</p>
            </div>
          </div>
          <div v-if="activeMarket==='1'" class="intrgalbox">
            <img src="@/assets/images/placeorder/integal.png" alt="">
            <div class="intrgaldetail">
              <p>{{ getLanguageData.placeOrder.integraltotal.replace('M',integralTotal) }}</p>
              <div class="usebox">
                <span>{{ getLanguageData.placeOrder.nowuse }}</span>
                <InputNumber v-model="useIntegralNum" :max="integralTotal" :min="0" />
                <span>{{ getLanguageData.placeOrder.deduction.replace('N', (useIntegralNum || 0) ) }}</span>
              </div>
            </div>
          </div>
          <!--          <div class="calctotalbox">-->
          <!--            <span>{{ getLanguageData.placeOrder.usemarkettotal }}</span>-->
          <!--            <span>{{ getLanguageData.placeOrder.usecoupontotal }}</span>-->
          <!--            <span>{{ getLanguageData.placeOrder.useintegraltotal }}</span>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="paytypebox">
        <h5 class="itemtitle">
          {{ getLanguageData.placeOrder.payType }}
        </h5>
        <RadioGroup v-model="payType">
          <Radio :label="1" style="margin-right: 50px">
            <span>{{ getLanguageData.placeOrder.online }}</span>
          </Radio>
          <Radio v-if="isShowPODStore && showPOD" :label="2">
            <span>{{ getLanguageData.placeOrder.cod }}</span>
            <span
              v-if="PODvalue"
              style="color: #999999"
            >{{ getLanguageData.placeOrder.codefee.replace('M',PODvalue) }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="ordertotalcalc">
        <ul>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.goodsTotal }}:</span>
            <span class="labelcontent">{{ dataPrice.totalAmount }} <span style="font-size:12px;">円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.coupondedu }}:</span>
            <span class="labelcontent">{{ calcPrice.couponTotalAmount || 0 }} <span
              style="font-size:12px;"
            >円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.fullreduction }}:</span>
            <span class="labelcontent">{{ calcPrice.discountsTotalAmount || 0 }} <span style="font-size:12px;">円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.integraldedu }}:</span>
            <span class="labelcontent">{{ useIntegralNum || 0 }} <span style="font-size:12px;">円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.freight }}:</span>
            <span class="labelcontent">{{ calcPrice.freightTotalAmount || 0 }} <span
              style="font-size:12px;"
            >円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.codNum }}:</span>
            <span class="labelcontent">{{ calcPrice.codAmount || 0 }} <span style="font-size:12px;">円</span></span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.placeOrder.needpay }}:</span>
            <span class="labelcontent maincolor">{{ calcPrice.payTotalAmount || 0 }} <span
              style="font-size:12px;"
            >円</span></span>
          </li>
        </ul>
      </div>
      <div class="sendadress">
        <span>{{ getLanguageData.placeOrder.sendadress }} {{ 'adress' | filterAdress(useAdressId,adressData) }}</span>
        <span>{{ getLanguageData.placeOrder.receive }} {{ 'receive' | filterAdress(useAdressId,adressData) }}</span>
      </div>
      <div class="btnbox">
        <p @click="sureSubmitOrderHandle">
          {{ getLanguageData.placeOrder.summitorder }}
        </p>
      </div>
    </div>
    <Modal
      v-model="adressShow"
      :title="getLanguageData.placeOrder.addAdress"
      :width="660"
      @on-cancel="adressShow=false"
    >
      <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="95">
        <FormItem :label="getLanguageData.adressPage.area" prop="areaIds">
          <Cascader
            v-model="formItem.areaIds"
            :data="areaData"
            :placeholder="getLanguageData.adressPage.selectarea"
            @on-change="changeSelectArea"
          />
        </FormItem>
        <FormItem :label="getLanguageData.adressPage.adressDetail" prop="deliveryAddress">
          <Input
            v-model="formItem.deliveryAddress"
            :placeholder="getLanguageData.adressPage.wradressDetail"
            maxlength="30"
          />
        </FormItem>
        <FormItem :label="getLanguageData.adressPage.receive" prop="realName">
          <Input v-model="formItem.realName" :placeholder="getLanguageData.adressPage.wrreceive" maxlength="30" />
        </FormItem>
        <FormItem :label="getLanguageData.adressPage.phone" prop="mobile">
          <Input v-model="formItem.mobile" :placeholder="getLanguageData.adressPage.wrphone" />
        </FormItem>
        <FormItem :label="getLanguageData.adressPage.emailcode" prop="postcode">
          <Input v-model="formItem.postcode" :placeholder="getLanguageData.adressPage.wremailcode" />
        </FormItem>
        <FormItem prop="name">
          <CheckboxGroup v-model="formItem.def">
            <Checkbox label="0">
              {{ getLanguageData.adressPage.setleaf }}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="adressShow=false">
          {{ getLanguageData.operate.cancle }}
        </Button>
        <Button type="primary" @click="sureAddAdressHandle">
          {{ getLanguageData.operate.sure }}
        </Button>
      </div>
    </Modal>
    <addemail v-if="addemailShow" @closeAddEmailModal="addemailShow=false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { filterArea } from '@/assets/js/util'
import adress from '@/components/placeorder/adress'
import coupon from '@/components/placeorder/couponcanuse'
import addemail from '@/components/login/addemail'

export default {
  name: 'Index',
  data () {
    return {
      adressData: [],
      adressShow: false,
      areaData: [],
      lookMoreShow: false,
      formItem: {
        address: '',
        areaIds: [],
        provinceId: '',
        cityId: '',
        areaId: '',
        country: 'jp',
        deliveryAddress: '',
        realName: '',
        mobile: '',
        postcode: '',
        def: []
      },
      useAdressId: '',
      dataPrice: {},
      tableData: [],
      activeMarket: '0',
      couponList: [],
      selectCouponId: '',
      commonCodeId: '',
      integralTotal: 0,
      useIntegralNum: 0,
      payType: 1,
      showPOD: false,
      isShowPODStore: false,
      PODvalue: 0,
      calcPrice: {
        codAmount: 0,
        couponTotalAmount: 0,
        discountsTotalAmount: 0,
        freightTotalAmount: 0,
        payTotalAmount: 0,
        storesFreight: []
      },
      addemailShow: false,
      cateArrPro: []
    }
  },
  mounted () {
    const vm = this
    if (localStorage.getItem('areaData')) {
      this.areaData = JSON.parse(localStorage.getItem('areaData'))
    } else {
      this.requestAreaList()
    }
    this.requestUserIntegral()
    if (this.getPlaceData === 'shoppingcart') {
      this.requestShopCartApi()
      return
    }
    this.dataPrice = this.getPlaceData
    const _tableData = this.getPlaceData.groups || []
    const _outputData = []
    const _cateArrPro = []
    const _storeType = []
    _tableData.forEach(function (item) {
      item.tradeItems.forEach(function (tradeitem) {
        tradeitem.storeId = item.storeId
        tradeitem.storeName = item.storeName
        tradeitem.buyerRemark = ''
        _storeType.push(item.storeType)
        _outputData.push({ isStore: true, ...tradeitem })
        _outputData.push(tradeitem)
        _cateArrPro.push(tradeitem.item.categoryId)
        if (tradeitem.item.goodsCashOnDelivery === 1) {
          vm.showPOD = true
          vm.requestCodeFee()
        } else {
          vm.showPOD = false
        }
      })
    })
    vm.requestCodeStore(_storeType)
    vm.cateArrPro = _cateArrPro
    this.tableData = _outputData
    this.requestAdressList()
    this.requestUserCoupon()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getPlaceData: 'getPlaceData',
      getImageBasePath: 'getImageBasePath',
      getLoginData: 'getLoginData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    ruleValidate () {
      const vm = this
      const _data = {
        areaIds: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: vm.getLanguageData.adressPage.selectarea,
            trigger: 'change'
          }
        ],
        deliveryAddress: [
          {
            required: true,
            message: vm.getLanguageData.adressPage.wradressDetail,
            trigger: 'blur'
          }
        ],
        realName: [
          {
            required: true,
            message: vm.getLanguageData.adressPage.wrreceive,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: vm.getLanguageData.adressPage.wrphone,
            trigger: 'blur'
          },
          {
            pattern: /^\d{6,16}$/,
            message: vm.getLanguageData.adressPage.regwrphone,
            trigger: 'blur'
          }
        ],
        postcode: [
          {
            required: true,
            message: vm.getLanguageData.adressPage.wremailcode,
            trigger: 'blur'
          },
          {
            pattern: /^\d{7}$/,
            message: vm.getLanguageData.adressPage.regwremailcode,
            trigger: 'blur'
          }
        ]
      }
      return _data
    },
    columns1 () {
      const vm = this
      const _dataCol = [
        {
          title: vm.getLanguageData.placeOrder.orderinfo,
          key: 'name',
          align: 'center',
          width: 370,
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  display: params.row.isStore ? '' : 'none',
                  textAlign: 'left'
                }
              }, [
                h('span', params.row.storeName)
              ]),
              h('div', { style: { display: params.row.isStore ? 'none' : 'flex' } }, [
                h('img', {
                  attrs: { src: vm.getImageBasePath + params.row.item.skuImg },
                  style: 'width:100px;height:100px;padding:5px'
                }),
                h('div', [
                  h('p', { style: 'padding:5px;text-align:left;font-size:12px;line-height:26px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;line-clamp: 2; -webkit-box-orient: vertical;' }, params.row.item.goodsTitle),
                  h('p', { style: 'text-align:left;' }, [h('p', { style: 'text-align:left;display:inline-block;padding:3px 12px;background: #f4f4f4;font-size:12px;color:#666666;margin-top:5px' }, params.row.item.goodsSkuVal)])
                ])
              ])
            ])
          }
        },
        {
          title: vm.getLanguageData.placeOrder.unitprice,
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : ''
              }
            }, params.row.item.skuMarketPrice)
          }
        },
        {
          title: vm.getLanguageData.placeOrder.num,
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : ''
              }
            }, params.row.item.number)
          }
        },
        {
          title: vm.getLanguageData.placeOrder.totalprice,
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : ''
              }
            }, params.row.item.skuTotalPrice)
          }
        },
        {
          title: vm.getLanguageData.placeOrder.leavemessage,
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : ''
              }
            }, [
              h('Input', {
                props: { value: params.row.buyerRemark },
                on: {
                  'on-change': (el) => {
                    const _index = vm.tableData.findIndex((item) => {
                      return item.storeId === params.row.storeId
                    })
                    if (_index > -1) {
                      vm.tableData[_index].buyerRemark = el.currentTarget.value
                      vm.tableData = JSON.parse(JSON.stringify(vm.tableData))
                    }
                  }
                }
              })
            ])
          }
        }
      ]
      return _dataCol
    }
  },
  methods: {
    ...mapActions({
      handleCheckCounter: 'handleCheckCounter'
    }),
    requestCodeStore (arr) {
      const vm = this
      let _show = true
      vm.$axios.get('starday-system/dict/getValue?groupCode=PAY_SETTING&code=COD_STORE').then((res) => {
        if (res.code === 200) {
          switch (res.data) {
            case '0':
              if (arr.includes(1)) {
                _show = false
              }
              break
            case '1':
              if (arr.includes(0)) {
                _show = false
              }
              break
            case '2':
              break
            default:
              _show = false
          }
          vm.isShowPODStore = _show
        }
      })
    },
    requestShopCartApi () {
      const vm = this
      vm.$axios.post('starday-order/order/shopCartPurchase').then((res) => {
        if (res.code === 200) {
          vm.dataPrice = res.data
          const _tableData = res.data.groups || []
          const _outputData = []
          const _cateArrPro = []
          const _storeType = []
          let _showPOD = true
          _tableData.forEach(function (item) {
            _outputData.push({
              ...item.tradeItems[0],
              storeId: item.storeId,
              storeName: item.storeName,
              isStore: true
            })
            item.tradeItems.forEach(function (tradeitem, index) {
              tradeitem.storeId = item.storeId
              tradeitem.storeName = item.storeName
              tradeitem.buyerRemark = ''
              _storeType.push(item.storeType)
              _cateArrPro.push(tradeitem.item.categoryId)
              if (index === 0) {
                tradeitem.spanCol = item.tradeItems.length
              }
              if (tradeitem.item.goodsCashOnDelivery === 0) {
                _showPOD = false
              }
              _outputData.push(tradeitem)
            })
          })
          vm.showPOD = _showPOD
          if (vm.showPOD) {
            vm.requestCodeFee()
          }
          vm.requestCodeStore(_storeType)
          vm.cateArrPro = _cateArrPro
          vm.tableData = _outputData
          vm.requestAdressList(_storeType)
          vm.requestUserCoupon()
        }
      })
    },
    requestAreaList () {
      const vm = this
      vm.$axios.get('starday-system/areacode/all/0').then((res) => {
        if (res.code === 200) {
          localStorage.setItem('areaData', JSON.stringify(filterArea(res.data)))
          vm.areaData = JSON.parse(localStorage.getItem('areaData'))
        }
      })
    },
    requestAdressList () {
      const vm = this
      vm.$axios.post('starday-user/user/address/list').then((res) => {
        if (res.code === 200) {
          vm.adressData = res.data || []
          const _index = vm.adressData.findIndex(function (item) {
            return item.def === 0
          })
          if (_index > -1) {
            vm.useAdressId = vm.adressData[_index].id
            vm.requestCalcDetailApi()
          }
        }
      })
    },
    requestUserCoupon () {
      const vm = this
      vm.$axios.get('starday-activity/user/user_coupon/list?type=0').then((res) => {
        if (res.code === 200) {
          const _canuseData = []
          const _canotuseData = []
          const _data = res.data || []
          _data.forEach((item) => {
            if ((item.cateDetail && (!vm.cateArrPro.includes(item.cateDetail))) || (item.fullbuyType === 1 && (vm.dataPrice.totalAmount < item.fullbuyPrice))) {
              _canotuseData.push(item)
            } else {
              _canuseData.push(item)
            }
          })
          vm.couponList = [..._canuseData, ..._canotuseData]
        }
      })
    },
    requestUserIntegral () {
      const vm = this
      vm.$axios.get('starday-integral/integral/user/integralNum').then((res) => {
        if (res.code === 200) {
          vm.integralTotal = res.data || 0
        }
      })
    },
    changeSelectArea (val, data) {
      if (data && data.length) {
        this.formItem.address = data[0].name + data[1].name + data[2].name
      } else {
        this.formItem.address = ''
      }
    },
    refreshUseIdHandle (id) {
      this.useAdressId = id
      this.requestCalcDetailApi()
    },
    editAdressHandle (item) {
      this.formItem = {
        address: item.address,
        areaIds: [item.provinceId + '', item.cityId + '', item.areaId + ''],
        provinceId: item.provinceId,
        cityId: item.cityId,
        areaId: item.areaId,
        country: 'jp',
        deliveryAddress: item.deliveryAddress,
        realName: item.realName,
        mobile: item.mobile,
        postcode: item.postcode,
        def: [item.def + ''],
        id: item.id
      }
      this.adressShow = true
    },
    selectCouponHandle (id, codeid) {
      this.selectCouponId = id
      this.commonCodeId = codeid
      this.requestCalcDetailApi()
    },
    sureAddAdressHandle () {
      const vm = this
      vm.$refs.formValidate.validate((valid) => {
        if (valid) {
          const _params = { ...vm.formItem }
          _params.provinceId = _params.areaIds[0]
          _params.cityId = _params.areaIds[1]
          _params.areaId = _params.areaIds[2]
          _params.def = _params.def[0]
          if (_params.id) {
            vm.$axios.put('starday-user/user/address/' + _params.id, _params).then((res) => {
              if (res.code === 200) {
                vm.$Message.success(vm.getLanguageData.operate.editsuccess)
                vm.adressShow = false
                vm.requestAdressList()
              }
            })
            return
          }
          vm.$axios.post('starday-user/user/address/add', _params).then((res) => {
            if (res.code === 200) {
              vm.$Message.success(vm.getLanguageData.operate.addsucess)
              vm.adressShow = false
              vm.requestAdressList()
            }
          })
        }
      })
    },
    sureSubmitOrderHandle () {
      const vm = this
      // 验证是否有邮箱
      if (!vm.getLoginData.email && !vm.getLoginData.mobile) {
        vm.addemailShow = true
        return
      }
      const _params = {
        buyReqList: [],
        consigneeId: vm.useAdressId,
        couponPaymentId: vm.selectCouponId,
        commonCodeId: vm.commonCodeId,
        integral: vm.useIntegralNum || 0,
        payType: vm.payType,
        shopType: this.getPlaceData === 'shoppingcart' ? 1 : 2,
        source: 0,
        storeCommitInfoList: []
      }
      if (!vm.useAdressId) {
        vm.$Message.warning(vm.getLanguageData.placeOrder.nodeAdressTip)
        return
      }
      vm.dataPrice.groups.forEach(function (item) {
        const _index = vm.tableData.findIndex(function (tableitem) {
          return tableitem.storeId === item.storeId
        })
        _params.storeCommitInfoList.push({
          buyerRemark: ((_index > -1) ? (vm.tableData[_index].buyerRemark || '') : ''),
          storeId: item.storeId
        })
        item.tradeItems.forEach((goositem) => {
          _params.buyReqList.push({
            buyCount: goositem.item.number,
            skuId: goositem.item.skuId
          })
        })
      })
      vm.$axios.post('starday-order/order/commit', _params).then((res) => {
        if (res.code === 200) {
          vm.handleCheckCounter(res.data)
          if (_params.payType * 1 === 2) {
            vm.$router.push('/placeorder/payresult?type=success&codefee=' + vm.PODvalue)
            return
          }
          vm.$router.push('/placeorder/checkoutcounter/' + res.data.tradeNumber)
        }
      })
    },
    requestCalcDetailApi () {
      const vm = this
      const _params = {
        buyReqList: [],
        commonCodeId: vm.commonCodeId,
        consigneeId: vm.useAdressId,
        couponPaymentId: vm.selectCouponId,
        integral: vm.useIntegralNum || 0,
        payType: vm.payType,
        shopType: this.getPlaceData === 'shoppingcart' ? 1 : 2,
        source: 0,
        storeCommitInfoList: []
      }
      if (!vm.useAdressId) {
        vm.$Message.warning(vm.getLanguageData.placeOrder.nodeAdressTip)
        return
      }
      vm.dataPrice.groups.forEach(function (item) {
        _params.storeCommitInfoList.push({
          buyerRemark: '',
          storeId: item.storeId
        })
        item.tradeItems.forEach((goositem) => {
          _params.buyReqList.push({
            buyCount: goositem.item.number,
            skuId: goositem.item.skuId
          })
        })
      })
      vm.$axios.post('starday-order/order/detailsCalculate', _params).then((res) => {
        if (res.code === 200) {
          vm.calcPrice = res.data
        }
      })
    },
    handleSpan ({ row, column, rowIndex, columnIndex }) {
      if (row.isStore && columnIndex === 0) {
        return {
          colspan: 3
        }
      }
      if (row.spanCol && row.spanCol > 1 && columnIndex === 4) {
        return {
          rowspan: row.spanCol
        }
      }
    },
    requestCodeFee () {
      const vm = this
      vm.$axios.get('/starday-system/dict/getValue?groupCode=PAY_SETTING&code=COD_FEE').then((res) => {
        if (res.code === 200) {
          vm.PODvalue = res.data
        }
      })
    }
    // requestPayType () {
    //   const vm = this
    //   vm.$axios.get('starday-pay/CasherdeskPaytype/getValidPaytypePage').then((res) => {
    //     debugger
    //   })
    // }
  },
  filters: {
    filterAdress (str, id, data) {
      if (!id) {
        return ''
      }
      if (str === 'adress') {
        const _index = data.findIndex(function (item) {
          return item.id === id
        })
        if (_index > -1) {
          return data[_index].address + data[_index].deliveryAddress
        } else {
          return ''
        }
      } else {
        const _index = data.findIndex(function (item) {
          return item.id === id
        })
        if (_index > -1) {
          return data[_index].realName + data[_index].mobile
        } else {
          return ''
        }
      }
    }
  },
  components: {
    adress,
    coupon,
    addemail
  },
  watch: {
    adressShow (newValue) {
      if (!newValue) {
        this.formItem = {
          address: '',
          areaIds: [],
          provinceId: '',
          cityId: '',
          areaId: '',
          country: 'jp',
          deliveryAddress: '',
          realName: '',
          mobile: '',
          postcode: '',
          def: []
        }
        this.$refs.formValidate.resetFields()
      }
    },
    useIntegralNum () {
      this.requestCalcDetailApi()
    },
    payType (newValue) {
      this.requestCalcDetailApi()
    }
  }
}
</script>

<style scoped lang="scss">
  .placeorder {
    .breadcrumb {
      height: 64px;
      line-height: 64px;

      a {
        color: #333333;
      }
    }

    .adressbox {
      padding: 20px;
      background-color: #fff;

      .pagetitle {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
      }

      .adresscontent {
        padding: 32px 20px 0 20px;

        .adresstitle {
          span:nth-of-type(2) {
            margin-left: 26px;
            color: #FF5D19;
            cursor: pointer;
          }
        }

        .adresslist {
          margin-top: 24px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          margin: 0 -10px;
        }

        .nonebox {
          text-align: center;
          margin-top: 45px;

          img {
            width: 242px;
            height: 242px;
          }

          p {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            margin-top: 44px;
          }
        }
      }
    }

    .dealbox {
      padding: 20px 40px;
      background-color: #fff;
      margin-top: 20px;

      .tablebox {
        margin-top: 21px;
      }
    }

    .marketbox {
      padding: 20px 40px;
      background-color: #fff;
      margin-top: 20px;

      .marketboxcontent {
        min-height: 30px;
        margin-top: 27px;
        border: 1px solid #E0E0E0;

        .marketboxtitle {
          height: 40px;
          line-height: 40px;
          background-color: #F4F4F4;

          p {
            display: inline-block;
            width: 132px;
            text-align: center;
            cursor: pointer;
          }

          .activep {
            background-color: #fff;
            color: #FF5D19;
          }
        }

        .marketlistbox {
          .couponlistbox {
            .couponlist {
              padding: 8px;
            }

            .nonebox {
              text-align: center;
              font-size: 14px;
              color: #999999;
              margin: 20px 0;

              img {
                width: 242px;
                height: 242px;
              }
            }
          }

          .intrgalbox {
            display: flex;
            margin: 30px 30px;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            color: #333333;

            .usebox {
              margin-top: 5px;
            }

            img {
              width: 70px;
              height: 70px;
              margin-right: 25px;
            }
          }

          .calctotalbox {
            width: 1280px;
            margin: 30px auto;
            height: 34px;
            line-height: 34px;
            background: #f7f7f7;
            font-size: 14px;
            color: #ff5d19;

            span {
              margin: 0 15px;
            }
          }
        }
      }

      .paytypebox {
        padding: 25px 0;

        h5 {
          margin-bottom: 20px;
        }
      }

      .ordertotalcalc {
        width: 1320px;
        margin: 30px auto;
        height: 240px;
        background: #f7f7f7;
        border: 1px solid #e0e0e0;
        text-align: right;
        font-size: 14px;
        padding: 10px 40px;
        line-height: 28px;

        .label {
          display: inline-block;
          vertical-align: middle;
        }

        .labelcontent {
          display: inline-block;
          vertical-align: middle;
          width: 160px;
        }

        .maincolor {
          font-size: 20px;
          color: #E76636;
        }

      }

      .sendadress {
        text-align: right;

        span:nth-of-type(2) {
          margin-left: 20px;
        }
      }

      .btnbox {
        text-align: right;
        margin: 20px 0 36px 0;

        p {
          display: inline-block;
          width: 260px;
          height: 54px;
          line-height: 54px;
          color: #FFFFFF;
          cursor: pointer;
          text-align: center;
          background: #e76636;
          border-radius: 2px;
        }
      }
    }

    .paytype {
      padding: 20px 40px;
      background-color: #fff;
      margin-top: 20px;
    }

    .itemtitle {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      color: #333333;
    }
  }
</style>
