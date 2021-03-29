<template>
  <div class="attentiongoods">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">{{getLanguageData.storeText.indexPage}}</BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">{{getLanguageData.emailText.personalInfo}}</BreadcrumbItem>
        <BreadcrumbItem v-if="activeTab==='1'">{{getLanguageData.attentiongoodsText.loveGoods}}</BreadcrumbItem>
        <BreadcrumbItem v-if="activeTab==='2'">{{getLanguageData.attentiongoodsText.attentionStore}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="attention_container">
      <Tabs v-model="activeTab" @on-click="handleTabsChange">
        <TabPane :label="getLanguageData.attentiongoodsText.loveGoods" name="1">
          <div v-if="goodsData.length" class="goods">
            <likegood v-for="(item, index) in goodsData" :key="index" :goods-item="item" @refreshHandle="refreshHandle" />
          </div>
          <div v-else class="no_data">
            <div>
              <img src="@/assets/images/common/nodata.png" alt="">
              <div class="txt">
                {{ getLanguageData.common.noneAttention }}
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane :label="getLanguageData.attentiongoodsText.attentionStore" name="2">
          <div v-if="storeData.length" class="goods">
<!--            <boutique-->
<!--              v-for="(item, i) in storeData"-->
<!--              :key="i"-->
<!--              :item="item"-->
<!--              :store-image="item.logo"-->
<!--              :type="2"-->
<!--              :storename="item.storeName"-->
<!--              :score="item.storeScore"-->
<!--              :com-count="item.commentCount"-->
<!--              :is-attenton-store="1"-->
<!--              @getGoodStore="getGoodStoreInfo"-->
<!--            />-->
            <storetem v-for="(item, i) in storeData" :key="i" :store-item="item" />
          </div>
          <div v-else class="no_data">
            <div>
              <img src="@/assets/images/common/nodata.png" alt="">
              <div class="txt">
                {{ getLanguageData.attentiongoodsText.noData }}
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div v-if="goodsData.length || storeData.length" class="pagebox" style="margin-top: 20px">
        <Page :total="total" :current="currentPage" style="float: right" @on-change="currentPageChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import likegood from '@/components/goodscom/likegood'
// import boutique from '@/components/store/boutique'
import storetem from '@/components/search/storetem'
export default {
  name: 'Attentiongoods',
  middleware: 'auth',
  components: { likegood, storetem },
  data () {
    return {
      valueHalf: 2.5,
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        userId: ''
      },
      attentionForm: {
        spuId: '',
        state: '',
        userId: ''
      },
      total: 0,
      goodsData: [],
      storeData: [],
      activeTab: '1',
      currentPage: 1
    }
  },
  mounted () {
    this.activeTab = this.$route.query.active || '1'
    this.searchForm.userId = this.getLoginData.id
    this.attentionForm.userId = this.getLoginData.id
    this.requestGoodsList()
    this.requestStoreList()
  },
  methods: {
    handleTabsChange (val) {
      this.searchForm.pageNo = 1
      if (val === 1) {
        this.requestGoodsList()
      } else {
        this.requestStoreList()
      }
    },
    currentPageChange (pageNo) {
      this.searchForm.pageNo = pageNo
      if (this.activeTab === 1) {
        this.requestGoodsList()
      } else {
        this.requestStoreList()
      }
    },
    // 喜欢的商品
    requestGoodsList () {
      const _this = this
      _this.goodsData = []
      _this.$axios.post('starday-goods/user/goods_collection/list/v1', _this.searchForm).then((res) => {
        if (res.code === 200) {
          _this.goodsData = res.data.rows
          _this.total = res.data.totalRows
          _this.currentPage = res.data.pageNo
        }
      })
    },
    // 关注的店铺
    requestStoreList () {
      const _this = this
      _this.storeData = []
      _this.$axios.post('starday-goods/user/store_collection/list/v1', _this.searchForm).then((res) => {
        if (res.code === 200) {
          _this.storeData = res.data.rows
          _this.total = res.data.totalRows
          _this.currentPage = res.data.pageNo
        }
      })
    },
    // 取消关注
    refreshHandle () {
      this.requestGoodsList()
    },
    getGoodStoreInfo ({ item, type }) {
      this.$router.push('/store/' + item.id)
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLoginData: 'getLoginData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  }
}
</script>

<style scoped lang="scss">
.attentiongoods {
  .attention_container {
    margin-top: 20px;
    padding-bottom: 60px;
    .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 0 -10px;
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
  }
}
/deep/.ivu-tabs-nav .ivu-tabs-tab {
  font-size: 16px;
}
/deep/.ivu-tabs-nav-scroll {
  background: #fff;
}
</style>
