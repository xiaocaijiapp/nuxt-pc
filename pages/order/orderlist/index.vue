<template>
  <div class="orderlist">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{getLanguageData.emailText.personalInfo}}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{getLanguageData.cencelText.myOrder}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="orderlist_container">
      <section class="orderlist_title">
        {{getLanguageData.cencelText.myOrder}}
      </section>
      <div class="ordertab">
        <Tabs v-model="searchForm.tab" @on-click="handleTabsChange">
          <TabPane :label="getLanguageData.evaluateText.all" name="1" />
          <TabPane :label="getLanguageData.evaluateText.waitPay" name="2" />
          <TabPane :label="getLanguageData.evaluateText.waitShip" name="3" />
          <TabPane :label="getLanguageData.evaluateText.waitReceiptGood" name="4" />
          <TabPane :label="getLanguageData.evaluateText.waitComment" name="5" />
        </Tabs>
      </div>
      <!--      <div class="order_search">-->
      <!--        <Row>-->
      <!--          <Col span="8">-->
      <!--            <Input v-model="searchForm.orderNo" placeholder="请输入订单号" style="width: 378px" />-->
      <!--          </Col>-->
      <!--          <Col span="12">-->
      <!--            <DatePicker-->
      <!--              type="date"-->
      <!--              :options='startTimeOptions'-->
      <!--              placeholder="请选择开始时间"-->
      <!--              v-model="searchForm.startTime"-->
      <!--              @on-change="startTimeChange"-->
      <!--            ></DatePicker> - -->
      <!--            <DatePicker-->
      <!--              type="date"-->
      <!--              :options='endTimeOptions'-->
      <!--              placeholder="请选择结束时间"-->
      <!--              v-model="searchForm.endTime"-->
      <!--              @on-change="endTimeChange"-->
      <!--            ></DatePicker>-->
      <!--          </Col>-->
      <!--          <Col span="4">-->
      <!--            <Button @click="searchOrderHandle">查询</Button>-->
      <!--          </Col>-->
      <!--        </Row>-->
      <!--      </div>-->
      <div class="list_info">
        <orderlist
          v-if="orderListData.length"
          :order-list-data="orderListData"
          :total="total"
          :current-page="searchForm.pageNo"
          :order-state="searchForm.orderState"
          @currentPageChange="currentPageChange"
          @refreshHandle="refreshHandle"
        />
        <div v-else class="no_data">
          <div>
            <img src="@/assets/images/common/nodata.png" alt="">
            <div class="txt">
              {{getLanguageData.attentiongoodsText.noData}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import orderlist from '@/components/order/orderlist'
export default {
  name: 'Index',
  middleware: 'auth',
  components: { orderlist },
  data () {
    return {
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        // orderNo: '',
        // startTime: '',
        // endTime: '',
        orderState: '',
        payState: '',
        tab: '1'
      },
      total: 0,
      currentPage: 1,
      startTimeOptions: {},
      endTimeOptions: {},
      activeStatus: 'all',
      orderListData: []
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  mounted () {
    this.searchForm.tab = this.$route.query.activeTab || '1'
    this.requestOrderList()
  },
  methods: {
    refreshHandle (val) {
      if (val === '4') {
        this.searchForm.tab = '5'
        this.searchForm.orderState = '5'
        this.requestOrderListOther()
      } else {
        this.requestOrderList()
      }
    },
    startTimeChange (e) {
      // 设置开始时间
      this.searchForm.startTime = e
      this.endTimeOptions = {
        disabledDate: (date) => {
          const startTime = this.searchForm.startTime ? new Date(this.searchForm.startTime).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endTimeChange (e) {
      this.searchForm.endTime = e
      const endTime = this.searchForm.endTime ? new Date(this.searchForm.endTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.startTimeOptions = {
        disabledDate: (date) => {
          return date && (date.valueOf() > endTime)
        }
      }
    },
    currentPageChange (pageNo) {
      this.searchForm.pageNo = pageNo
      if (this.searchForm.tab === '1' || this.searchForm.tab === '2') {
        this.requestOrderList()
      } else {
        this.requestOrderListOther()
      }
      document.querySelector('.appbox').scrollTop = 0
    },
    handleTabsChange (val) {
      this.searchForm.pageNo = 1
      this.searchForm.orderState = val * 1
      if (val === '1') {
        this.searchForm.orderState = ''
        this.searchForm.payState = ''
        this.requestOrderList()
      } else if (val === '2') {
        this.searchForm.orderState = ''
        this.searchForm.payState = 0
        this.requestOrderList()
      } else {
        this.searchForm.payState = ''
        this.requestOrderListOther()
      }
    },
    requestOrderList () {
      const _this = this
      _this.orderListData = []
      _this.$axios.post('starday-order/myOrder/listAll', _this.searchForm).then((res) => {
        if (res.code === 200) {
          _this.orderListData = res.data.rows
          _this.total = res.data.totalRows
          _this.searchForm.pageNo = res.data.page
        }
      })
    },
    requestOrderListOther () {
      const _this = this
      _this.orderListData = []
      _this.$axios.post('starday-order/myOrder/listOther', _this.searchForm).then((res) => {
        if (res.code === 200) {
          _this.orderListData = res.data.rows
          _this.total = res.data.totalRows
          _this.searchForm.pageNo = res.data.page
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orderlist {
  .orderlist_container {
    .ordertab {
      margin-top: 40px;
    }
    .no_data {
      height: 432px;
      display: flex;
      align-items: center;
      justify-content: center;
      >div {
        img {
          vertical-align: middle;
        }
        .txt {
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #999999;
          line-height: 28px;
        }
      }
    }
    .order_search {
      Button {
        width: 100px;
        height: 36px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        background: #ff5d19;
        border-radius: 2px;
      }
    }
  }
}
</style>
