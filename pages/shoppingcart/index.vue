<template>
  <div class="shoppingcart">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.storeText.indexPage }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.shoppingcart.shoppingcart }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="contentbox">
      <div class="pagetitle">
        {{ getLanguageData.shoppingcart.shoppingcart }}
      </div>
      <div v-if="dataList.length" class="tablebox">
        <Table
          :columns="columnsTable"
          :data="dataList"
          :row-class-name="rowClassName"
          @on-select="selectHandle"
          @on-select-cancel="selectCancleHandle"
          @on-select-all="selectAllHandle"
          @on-select-all-cancel="selectCancleAllHandle"
        />
        <div class="totalbox">
          <div class="left">
            <span
              class="spanbtn"
              @click="clearHandle('clearshoppcar')"
            >{{ getLanguageData.shoppingcart.clearshoppcar }}</span>
            <span class="spanbtn" @click="clearHandle('clearexpiredGoods')">{{ getLanguageData.shoppingcart.clearexpiredGoods }}</span>
          </div>
          <div class="right">
            {{ getLanguageData.shoppingcart.selectGoods.replace('N',totalNum) }}
            <span>{{ getLanguageData.shoppingcart.total }}</span>
            <span>{{ totalAmount }} 円</span>
          </div>
        </div>
        <div class="btnbox">
          <p @click="goPayHandle">
            {{ getLanguageData.shoppingcart.gopay }}
          </p>
        </div>
      </div>
      <div v-if="!dataList.length" class="nonebox">
        <img src="@/assets/images/shopcar/none.png" alt="">
        <p>{{ getLanguageData.shoppingcart.noneshop }} </p>
      </div>
      <div v-if="InvalidationData.length" class="tablebox">
        <Table
          :columns="columnsValiTable"
          :data="InvalidationData"
          :row-class-name="rowClassName"
          @on-select="selectHandle"
          @on-select-cancel="selectCancleHandle"
          @on-select-all="selectAllHandle"
          @on-select-all-cancel="selectCancleAllHandle"
        />
        <div class="totalbox">
          <div class="left" />
          <div class="right">
            <span class="spanbtn" @click="clearHandle('clearexpiredGoods')">{{ getLanguageData.shoppingcart.clearexpiredGoods }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      storeDataList: [],
      InvalidationData: [],
      dataList: [],
      totalNum: 0,
      totalAmount: 0,
      isPODStore: ''
    }
  },
  mounted () {
    this.requestList()
    this.requestTotalAmount()
    this.requestCodeFee()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    columnsTable () {
      const vm = this
      const _colTable = [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: vm.getLanguageData.shoppingcart.goodsName,
          width: 460,
          render: (h, params) => {
            let _showpod = false
            if (!params.row.isStore) {
              if (vm.isPODStore === '2') {
                _showpod = true
              } else {
                _showpod = (params.row.storeType * 1 === vm.isPODStore * 1)
              }
            }
            return h('div', [
              h('div', { style: 'font-size:14px;font-weight:600' }, params.row.isStore ? params.row.storeName : ''),
              h('div', {
                style: {
                  display: params.row.isStore ? 'none' : '',
                  padding: '15px 0',
                  width: '430px'
                }
              }, [
                h('div', { style: 'display:flex;' }, [
                  h('img', {
                    attrs: { src: vm.getImageBasePath + params.row.skuImage },
                    style: 'width:100px;height:100px;padding:5px'
                  }),
                  h('div', { style: 'width:330px' }, [
                    h('p', { style: 'padding:5px;text-align:left;font-size:12px;line-height:26px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;line-clamp: 2; -webkit-box-orient: vertical;' }, params.row.goodsTitle),
                    h('p', { style: 'text-align:left;display:inline-block;padding:3px 12px;background: #f4f4f4;font-size:12px;color:#666666;margin-top:5px' }, params.row.skuValue),
                    h('div', { style: { display: (_showpod && params.row.goodsCashOnDelivery === 1) ? 'block' : 'none' } }, [
                      h('p', { style: { fontSize: '12px', color: '#ff1f1f', border: '1px solid #ff1f1f', display: 'inline-block', padding: '0px 5px', marginTop: '5px' } }, vm.getLanguageData.shoppingcart.podtip)

                    ])
                  ])
                ])
              ])

            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.rule,
          render: (h, params) => {
            return h('div', params.row.isStore ? '' : params.row.skuValue)
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.price,
          render: (h, params) => {
            const _oldPrice = params.row.price
            let _disPrice = 0
            if (params.row.flashSaleActivityDto) {
              // _disPrice = params.row.price - Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.price)
              _disPrice = Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.price)
            } else if (params.row.discountActivityToDetailDto) {
              // _disPrice = params.row.amount - Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
              _disPrice = Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
            } else {
              _disPrice = _oldPrice
            }
            return h('div', [
              h('div', { style: { display: params.row.isStore ? 'none' : '' } }, [
                h('p', {
                  style: {
                    fontSize: '18px',
                    fontWeight: 700
                  }
                }, _disPrice + '円'),
                h('p', {
                  style: {
                    display: _disPrice === _oldPrice ? 'none' : '',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#999999',
                    textDecoration: 'line-through'
                  }
                }, params.row.price + '円')
              ])
            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.num,
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                style: { display: params.row.isStore ? 'none' : '' },
                props: {
                  min: 1,
                  disabled: !params.row.invalid,
                  value: params.row.num,
                  max: params.row.skuInventory
                },
                on: {
                  'on-change': (val) => {
                    vm.$axios.put('starday-order/shopCart/number', {
                      num: val,
                      skuId: params.row.skuId,
                      spuId: params.row.spuId,
                      storeId: params.row.storeId
                    }).then((res) => {
                      if (res.code === 200) {
                        vm.requestList()
                        vm.requestTotalAmount()
                      }
                    })
                  }
                }
              })
            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.smalltotal,
          render: (h, params) => {
            const _oldPrice = params.row.amount
            let _disPrice = 0
            if (params.row.flashSaleActivityDto) {
              // _disPrice = params.row.amount - Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.amount)
              _disPrice = Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.amount)
            } else if (params.row.discountActivityToDetailDto) {
              // _disPrice = params.row.amount - Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
              _disPrice = Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
            } else {
              _disPrice = _oldPrice
            }
            return h('div', [
              h('div', { style: { display: params.row.isStore ? 'none' : '' } }, [
                h('p', {
                  style: {
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F26936'
                  }
                }, _disPrice + '円')
              ])
            ])
          }
        },
        {
          title: vm.getLanguageData.operate.operate,
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : '',
                textAlign: 'center',
                fontSize: '14px'
              }
            }, [
              h('p', { style: { display: params.row.invalid ? '' : 'none' } }, [h('span', {
                class: 'spanbtn',
                on: {
                  click: () => {
                    vm.$axios.post('starday-order/shopCart/moveToFavorites', {
                      skuIdList: [params.row.skuId],
                      spuIdList: [params.row.spuId]
                    }).then((res) => {
                      if (res.code === 200) {
                        vm.$Message.success(vm.getLanguageData.shoppingcart.movesuccess)
                        vm.requestList()
                        vm.requestTotalAmount()
                      }
                    })
                  }
                }
              }, vm.getLanguageData.shoppingcart.movecollect)]),
              h('p', { style: { display: params.row.invalid ? '' : 'none' } }, [h('span', {
                class: 'spanbtn',
                on: {
                  click: () => {
                    vm.deleteHandle(params.row.spuId, [params.row.skuId], params.row.storeId)
                  }
                }
              }, vm.getLanguageData.operate.delete)]),
              h('p', { style: { display: params.row.invalid ? 'none' : '' } }, vm.getLanguageData.shoppingcart.expired)
            ])
          }
        }
      ]
      return _colTable
    },
    columnsValiTable () {
      const vm = this
      const _colTable = [
        {
          title: vm.getLanguageData.shoppingcart.goodsName,
          width: 460,
          render: (h, params) => {
            return h('div', [
              h('div', { style: 'font-size:14px;font-weight:600' }, params.row.isStore ? params.row.storeName : ''),
              h('div', {
                style: {
                  display: params.row.isStore ? 'none' : '',
                  padding: '15px 0',
                  width: '430px'
                }
              }, [
                h('div', { style: 'display:flex;' }, [
                  h('img', {
                    attrs: { src: vm.getImageBasePath + params.row.skuImage },
                    style: 'width:100px;height:100px;padding:5px'
                  }),
                  h('div', { style: 'width:330px' }, [
                    h('p', { style: 'padding:5px;text-align:left;font-size:12px;line-height:26px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;line-clamp: 2; -webkit-box-orient: vertical;' }, params.row.goodsTitle),
                    h('p', { style: 'text-align:left;display:inline-block;padding:3px 12px;background: #f4f4f4;font-size:12px;color:#666666;margin-top:5px' }, params.row.skuValue)
                  ])
                ])
              ])

            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.rule,
          render: (h, params) => {
            return h('div', params.row.isStore ? '' : params.row.skuValue)
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.price,
          render: (h, params) => {
            const _oldPrice = params.row.price
            let _disPrice = 0
            if (params.row.flashSaleActivityDto) {
              _disPrice = params.row.price - Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.price)
            } else if (params.row.discountActivityToDetailDto) {
              _disPrice = params.row.amount - Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
            } else {
              _disPrice = _oldPrice
            }
            return h('div', [
              h('div', { style: { display: params.row.isStore ? 'none' : '' } }, [
                h('p', {
                  style: {
                    fontSize: '18px',
                    fontWeight: 700
                  }
                }, _disPrice + '円'),
                h('p', {
                  style: {
                    display: _disPrice === _oldPrice ? 'none' : '',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#999999',
                    textDecoration: 'line-through'
                  }
                }, params.row.price + '円')
              ])
            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.num,
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                style: { display: params.row.isStore ? 'none' : '' },
                props: {
                  min: 1,
                  disabled: !params.row.invalid,
                  value: params.row.num,
                  max: params.row.skuInventory
                },
                on: {
                  'on-change': (val) => {
                    vm.$axios.put('starday-order/shopCart/number', {
                      num: val,
                      skuId: params.row.skuId,
                      spuId: params.row.spuId,
                      storeId: params.row.storeId
                    }).then((res) => {
                      if (res.code === 200) {
                        vm.requestList()
                        vm.requestTotalAmount()
                      }
                    })
                  }
                }
              })
            ])
          }
        },
        {
          title: vm.getLanguageData.shoppingcart.smalltotal,
          render: (h, params) => {
            const _oldPrice = params.row.amount
            let _disPrice = 0
            if (params.row.flashSaleActivityDto) {
              _disPrice = params.row.amount - Math.round(((100 - params.row.flashSaleActivityDto.discount) / 100) * params.row.amount)
            } else if (params.row.discountActivityToDetailDto) {
              _disPrice = params.row.amount - Math.round(((params.row.discountActivityToDetailDto.rate) / 100) * params.row.amount)
            } else {
              _disPrice = _oldPrice
            }
            return h('div', [
              h('div', { style: { display: params.row.isStore ? 'none' : '' } }, [
                h('p', {
                  style: {
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#F26936'
                  }
                }, _disPrice + '円')
              ])
            ])
          }
        },
        {
          title: vm.getLanguageData.operate.operate,
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: params.row.isStore ? 'none' : '',
                textAlign: 'center',
                fontSize: '14px'
              }
            }, [
              h('p', { style: { display: params.row.invalid ? '' : 'none' } }, [h('span', {
                class: 'spanbtn',
                on: {
                  click: () => {
                    vm.$axios.post('starday-order/shopCart/moveToFavorites', {
                      skuIdList: [params.row.skuId],
                      spuIdList: [params.row.spuId]
                    }).then((res) => {
                      if (res.code === 200) {
                        vm.$Message.success(vm.getLanguageData.shoppingcart.movesuccess)
                        vm.requestList()
                        vm.requestTotalAmount()
                      }
                    })
                  }
                }
              }, vm.getLanguageData.shoppingcart.movecollect)]),
              h('p', { style: { display: params.row.invalid ? '' : 'none' } }, [h('span', {
                class: 'spanbtn',
                on: {
                  click: () => {
                    vm.deleteHandle(params.row.spuId, [params.row.skuId], params.row.storeId)
                  }
                }
              }, vm.getLanguageData.operate.delete)]),
              h('p', { style: { display: params.row.invalid ? 'none' : '' } }, vm.getLanguageData.shoppingcart.expired)
            ])
          }
        }
      ]
      return _colTable
    }
  },
  methods: {
    ...mapActions({
      handlePlaceData: 'handlePlaceData'
    }),
    requestCodeFee () {
      const vm = this
      vm.$axios.get('starday-system/dict/getValue?groupCode=PAY_SETTING&code=COD_STORE').then((res) => {
        if (res.code === 200) {
          vm.isPODStore = res.data
        }
      })
    },
    requestList () {
      const vm = this
      vm.$axios.get('starday-order/shopCart/list').then((res) => {
        if (res.code === 200) {
          vm.storeDataList = res.data
          const _arrData = []
          const _invaliData = []
          let _num = 0
          res.data.forEach(function (item) {
            const _obj = { ...item }
            _obj.isStore = true
            const _index = item.shopItems.findIndex(function (item) {
              return !item.checked && item.invalid
            })
            if (_index === -1) {
              _obj._checked = true
            } else {
              _obj._checked = false
            }
            const _arrindex = item.shopItems.findIndex(function (_arritem) {
              return _arritem.invalid
            })
            const _invaliindex = item.shopItems.findIndex(function (_arritem) {
              return !_arritem.invalid
            })
            if (_arrindex > -1) {
              _arrData.push(_obj)
            }
            if (_invaliindex > -1) {
              _invaliData.push(_obj)
            }
            item.shopItems.forEach(function (shopitem) {
              shopitem.storeId = item.storeId
              shopitem.storeType = item.storeType
              if (shopitem.invalid) {
                shopitem._checked = shopitem.checked
              } else {
                shopitem._checked = false
              }

              if (shopitem.checked && shopitem.invalid) {
                _num += shopitem.num
              }
              if (shopitem.invalid) {
                _arrData.push(shopitem)
              } else {
                _invaliData.push(shopitem)
              }
            })
          })
          vm.dataList = _arrData
          vm.InvalidationData = _invaliData
          vm.totalNum = _num
        }
      })
    },
    deleteHandle (spuId, skuIdarr, storeId) {
      const vm = this
      this.$Modal.confirm({
        scrollable: true,
        render: (h) => {
          return h(
            'div',
            {
              props: {
                type: 'text'
              }
            },
            [
              h('Icon', {
                props: {
                  type: 'ios-alert',
                  size: '18',
                  color: '#f90'
                }
              }),
              h('span', this.getLanguageData.operate.sureDelete)
            ]
          )
        },
        onOk: () => {
          vm.$axios.post('starday-order/shopCart/delete', [{
            skuIdList: skuIdarr,
            storeId
          }]).then((res) => {
            if (res.code === 200) {
              vm.$Message.success(vm.getLanguageData.operate.deletesuccess)
              vm.requestList()
              vm.requestTotalAmount()
            }
          })
        }
      })
    },
    selectHandle (section, row) {
      if (row.isStore) {
        const _index = this.storeDataList.findIndex(function (item) {
          return item.storeId === row.storeId
        })
        if (_index > -1) {
          const _arr = []
          this.storeDataList[_index].shopItems.forEach(function (shopitem) {
            if (shopitem.invalid) {
              _arr.push({
                skuId: shopitem.skuId,
                checked: true
              })
            }
          })
          this.checkShopApi(_arr, row.storeId)
        }
      } else {
        this.checkShopApi([{
          checked: true,
          skuId: row.skuId
        }], row.storeId)
      }
    },
    selectCancleHandle (section, row) {
      if (row.isStore) {
        const _index = this.storeDataList.findIndex(function (item) {
          return item.storeId === row.storeId
        })
        if (_index > -1) {
          const _arr = []
          this.storeDataList[_index].shopItems.forEach(function (shopitem) {
            _arr.push({
              skuId: shopitem.skuId,
              checked: false
            })
          })
          this.checkShopApi(_arr, row.storeId)
        }
      } else {
        this.checkShopApi([{
          checked: false,
          skuId: row.skuId
        }], row.storeId)
      }
    },
    selectAllHandle () {
      const vm = this
      const _arr = []
      this.storeDataList.forEach(function (item) {
        const _obj = {
          skuCheckedList: [],
          storeId: item.storeId
        }
        item.shopItems.forEach(function (itemlist) {
          if (itemlist.invalid) {
            _obj.skuCheckedList.push({
              skuId: itemlist.skuId,
              checked: true
            })
          }
        })
        _arr.push(_obj)
      })
      vm.$axios.put('starday-order/shopCart/checked', _arr).then((res) => {
        if (res.code === 200) {
          vm.requestList()
          vm.requestTotalAmount()
        }
      })
    },
    selectCancleAllHandle () {
      const vm = this
      const _arr = []
      this.storeDataList.forEach(function (item) {
        const _obj = {
          skuCheckedList: [],
          storeId: item.storeId
        }
        item.shopItems.forEach(function (itemlist) {
          _obj.skuCheckedList.push({
            skuId: itemlist.skuId,
            checked: false
          })
        })
        _arr.push(_obj)
      })
      vm.$axios.put('starday-order/shopCart/checked', _arr).then((res) => {
        if (res.code === 200) {
          vm.requestList()
          vm.requestTotalAmount()
        }
      })
    },
    checkShopApi (skuIdarr, storeId) {
      const vm = this
      vm.$axios.put('starday-order/shopCart/checked', [{
        skuCheckedList: skuIdarr,
        storeId
      }]).then((res) => {
        if (res.code === 200) {
          vm.requestList()
          vm.requestTotalAmount()
        }
      })
    },
    requestTotalAmount () {
      this.$axios.get('starday-order/order/shopCartCheckCalc').then((res) => {
        if (res.code === 200) {
          this.totalAmount = res.data.totalAmount
        }
      })
    },
    rowClassName (row, index) {
      if (!row.isStore && !row.invalid) {
        return 'disablecol'
      } else {
        return ''
      }
    },
    clearHandle (str) {
      const vm = this
      if (str === 'clearshoppcar') {
        this.$Modal.confirm({
          scrollable: true,
          render: (h) => {
            return h(
              'div',
              {
                props: {
                  type: 'text'
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'ios-alert',
                    size: '18',
                    color: '#f90'
                  }
                }),
                h('span', this.getLanguageData.shoppingcart.sureclearshoppcar)
              ]
            )
          },
          onOk: () => {
            vm.$axios.delete('starday-order/shopCart/clear').then((res) => {
              if (res.code === 200) {
                vm.$Message.success(vm.getLanguageData.shoppingcart.clearsuccess)
                vm.requestList()
                vm.requestTotalAmount()
              }
            })
          }
        })
      } else {
        this.$Modal.confirm({
          scrollable: true,
          render: (h) => {
            return h(
              'div',
              {
                props: {
                  type: 'text'
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'ios-alert',
                    size: '18',
                    color: '#f90'
                  }
                }),
                h('span', this.getLanguageData.shoppingcart.sureclearexpiredGoods)
              ]
            )
          },
          onOk: () => {
            vm.$axios.delete('starday-order/shopCart/clearInvalidItem').then((res) => {
              if (res.code === 200) {
                vm.$Message.success(vm.getLanguageData.shoppingcart.clearsuccess)
                vm.requestList()
                vm.requestTotalAmount()
              }
            })
          }
        })
      }
    },
    goPayHandle () {
      const vm = this
      if (!this.totalNum) {
        this.$Message.warning(this.getLanguageData.shoppingcart.selectGoodNOne)
        return
      }
      let _showPODTip = false
      const _hasIndex = vm.dataList.findIndex((item) => {
        return !item.isStore && item.checked && ((vm.isPODStore === '2' || (item.storeType * 1 === vm.isPODStore * 1)) && item.goodsCashOnDelivery === 1)
      })
      const _hasNoIndex = vm.dataList.findIndex((item) => {
        return !item.isStore && item.checked && ((vm.isPODStore !== '2' && (item.storeType * 1 !== vm.isPODStore * 1)) || item.goodsCashOnDelivery !== 1)
      })
      _showPODTip = (_hasIndex > -1) && (_hasNoIndex > -1)
      if (_showPODTip) {
        this.$Modal.confirm({
          title: '',
          cancelText: vm.getLanguageData.operate.cancle,
          okText: vm.getLanguageData.shoppingcart.gobuynow,
          content: '<p style="margin-left: -40px">' + vm.getLanguageData.shoppingcart.podbuytip + '</p>',
          onOk: () => {
            this.$axios.post('starday-order/order/shopCartPurchase').then((res) => {
              if (res.code === 200) {
                vm.$Modal.remove()
                this.handlePlaceData('shoppingcart')
                this.$router.push('/placeorder')
              }
            })
          },
          onCancel: () => {
            vm.$Modal.remove()
          }
        })
        return
      }
      this.$axios.post('starday-order/order/shopCartPurchase').then((res) => {
        if (res.code === 200) {
          this.handlePlaceData('shoppingcart')
          this.$router.push('/placeorder')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .shoppingcart {
    .breadcrumb {
      height: 46px;
      line-height: 46px;
    }

    .contentbox {
      background-color: #fff;
      padding: 20px 28px;

      .pagetitle {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 28px;
      }

      .totalbox {
        height: 60px;
        line-height: 60px;
        background-color: #E0E0E0;
        text-align: right;
        padding: 0 50px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          span {
            margin-right: 15px;
          }
        }

        .right {
          span:nth-of-type(1) {
            margin: 0 22px 0 5px;
          }

          span:nth-of-type(2) {
            color: #F26936;
          }
        }

      }

      .nonebox {
        text-align: center;
        font-size: 20px;
        color: #999999;

        img {
          width: 200px;
          height: 200px;
        }

      }

      .btnbox {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;

        p {
          display: inline-block;
          width: 416px;
          height: 54px;
          line-height: 54px;
          background: #e76636;
          border-radius: 2px;
          margin: 40px 0 50px 0;
          cursor: pointer;
        }
      }
    }
  }
</style>
