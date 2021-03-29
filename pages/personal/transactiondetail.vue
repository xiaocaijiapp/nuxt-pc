<template>
  <div class="transactiondetail">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{getLanguageData.emailText.personalInfo}}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{getLanguageData.cencelText.memeberBalance}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="personal_container">
      <section class="personal_title">
        {{getLanguageData.myCouponText.tranDetial}}
      </section>
      <Table :columns="dataColumns" :data="balanceData" style="margin-top: 40px" />
      <div class="pagebox">
        <Page :total="total" :current="currentPage" style="float: right" @on-change="currentPageChange"/>
      </div>
    </div>
    <Modal
      v-model="transactModal"
      @on-cancel="closeModal">
      <div>
        <Table :columns="orderNoColumns" :data="orderNoList" style="margin-top: 40px" />
      </div>
      <div slot="footer" class="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TransactionDetail',
  middleware: 'auth',
  data () {
    return {
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        email: ''
      },
      total: 0,
      currentPage: 1,
      balanceData: [],
      transactModal: false,
      orderNoList: []
    }
  },
  mounted () {
    this.searchForm.email = this.getLoginData.email
    this.requestBalanceList()
  },
  methods: {
    currentPageChange (val) {
      this.searchForm.pageNo = val
      this.requestBalanceList()
    },
    requestBalanceList () {
      const _this = this
      _this.$axios.post('starday-user/user/cardBalance/pageList/' + _this.searchForm.pageSize + '/' + this.searchForm.pageNo, {
        email: _this.searchForm.email
      }).then((res) => {
        if (res.code === 200) {
          _this.balanceData = res.data.rows
          _this.currentPage = res.data.page
          _this.total = res.data.totalRows
        }
      })
    },
    getTradeItemResDTO (cardOrderNo) {
      this.orderNoList = []
      this.$axios.get('starday-order/myOrder/getTradeItemResDTO?tradeNumber=' + cardOrderNo).then((res) => {
        if (res.code === 200) {
          this.orderNoList = res.data || []
          this.transactModal = true
        }
      })
    },
    closeModal () {
      this.transactModal = false
    }
  },
  computed: {
    ...mapGetters({
      getLoginData: 'getLoginData',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    dataColumns () {
      const vm = this
      const dataColumns = [
        {
          title: vm.getLanguageData.myCouponText.tranNum,
          key: 'cardOrderNo',
          align: 'center',
          render: (h, params) => {
            if (params.row.type !== 1 && params.row.cardOrderNo.indexOf('T') === 0) {
              return h('span', {
                style: {
                  color: '#1491FF',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.getTradeItemResDTO(params.row.cardOrderNo)
                  }
                }
              }, params.row.cardOrderNo)
            } else {
              return h('span', params.row.cardOrderNo)
            }
          }
        },
        {
          title: vm.getLanguageData.myCouponText.tranPrice,
          key: 'price',
          align: 'center'
        },
        {
          title: vm.getLanguageData.myCouponText.tranTime,
          key: 'createTime',
          align: 'center'
        },
        {
          title: vm.getLanguageData.myCouponText.opctingInfo,
          key: 'des',
          align: 'center',
          render: (h, params) => {
            const _index = params.row.des.indexOf('|')
            if (_index > -1) {
              const desc = params.row.des.substring(0, _index)
              return h('span', desc)
            } else {
              return h('span', params.row.des)
            }
          }
        },
        {
          title: vm.getLanguageData.myCouponText.opctingType,
          key: 'type',
          align: 'center',
          render: (h, params) => {
            switch (params.row.type) {
              case 1:
                return h('span', vm.getLanguageData.myCouponText.cardRecharge)
              case 2:
                return h('span', vm.getLanguageData.myCouponText.payText)
              case 3:
                return h('span', vm.getLanguageData.myCouponText.returnPrice)
              case 4:
                return h('span', vm.getLanguageData.myCouponText.exchangePrice)
              default:
                return h('span', '-')
            }
          }
        }
      ]
      return dataColumns
    },
    orderNoColumns () {
      const orderNoColumns = [
        {
          title: this.getLanguageData.evaluateText.orderNumber,
          key: 'orderNumber',
          align: 'center'
        },
        {
          title: this.getLanguageData.evaluateText.orderAmount,
          key: 'totalPayPrice',
          align: 'center'
        }
      ]
      return orderNoColumns
    }
  }
}
</script>

<style scoped lang="scss">
.transactiondetail {
  /deep/.ivu-modal .ivu-modal-footer {
    display: none;
    border-top: none;
  }
  .pagebox {
    height: 40px;
    margin: 40px 0 0;
  }
}
</style>
