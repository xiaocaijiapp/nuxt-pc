<template>
  <div class="store">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.storeText.indexPage }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal/attentiongoods/?active=2'">
          {{ getLanguageData.attentiongoodsText.attentionStore }}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{ getLanguageData.storeText.myStore }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <section class="storecontent">
      <section class="headbox">
        <img v-if="storeInfo.sign" :src="getImageBasePath + storeInfo.sign" alt="">
        <img v-else src="@/assets/images/store/storeposter.png" alt="">
        <div class="imgbox">
          <div class="storeimg">
            <img v-if="storeInfo.logo" :src="getImageBasePath + storeInfo.logo + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
            <img v-else src="@/assets/images/store/headimg.png" alt="">
          </div>
        </div>
        <div v-if="storeInfo.follow===1" class="collected" @click="collectHandle(false)">
          <span>{{ getLanguageData.storeText.alreadyCollected }}</span>
        </div>
        <div v-else class="collect" @click="collectHandle(true)">
          <span style="font-size: 20px">+</span>
          <span>{{ getLanguageData.storeText.collection }}</span>
        </div>
        <div class="namebox">
          <span>{{ storeInfo.storeName }}</span>
          <span>{{ storeInfo.storeType===0 ? getLanguageData.storeText.selfSupport : getLanguageData.storeText.thirdParty }}</span>
        </div>
        <div class="starbox">
          <span>
            {{getLanguageData.storeText.starLevel}}：
            <img v-for="i in Math.floor(storeInfo.evaluate || 0)" :key="i" src="@/assets/images/goods/star.png" alt="">
            <img v-if="Math.floor(storeInfo.evaluate || 0) !== (storeInfo.evaluate * 1 || 0)" src="@/assets/images/goods/half.png" alt="">
            <img v-for="i in (5 - Math.ceil(storeInfo.evaluate || 0))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
          </span>
          <span>{{ getLanguageData.storeText.sell }}：{{ storeInfo.salesCount || 0 }}{{ getLanguageData.storeText.piece }}</span>
          <span>{{ getLanguageData.storeText.evaluate }}：{{ storeInfo.commentCount || 0 }}{{ getLanguageData.storeText.strip }}</span>
        </div>
        <div class="butnbox">
          <div class="contact" @click="showMaile">
            <img src="@/assets/images/store/email.png" alt="">
            <span>{{ getLanguageData.storeText.contact }}</span>
          </div>
          <Poptip trigger="hover" title="" placement="bottom-start">
            <div class="storeinfo">
              {{ getLanguageData.storeText.storeInfo }}
            </div>
            <div slot="content" class="storeinfotip">
              <div>{{ getLanguageData.storeText.storeName }}：{{ storeInfo.storeName }} </div>
              <!--              <div>{{getLanguageData.storeText.name}}：</div>-->
              <div>{{ getLanguageData.storeText.email }}：{{ storeInfo.email }}</div>
              <div v-if="sotreSpuId === '1303148932246859781'">
                {{ getLanguageData.storeText.concatMobile }}：07012556621
              </div>
            </div>
          </Poptip>
        </div>
      </section>
      <section class="store-contaniner">
        <div class="tabbox">
          <div />
          <div :class="activeTab==='1' ? 'active' : ''" @click="tabChangeHandle('1', 1)">
            {{ getLanguageData.storeText.indexPage }}
          </div>
          <div :class="activeTab==='2' ? 'active' : ''" @click="tabChangeHandle('2', 1)">
            {{ getLanguageData.storeText.allGoods }}
          </div>
          <div :class="activeTab==='3' ? 'active' : ''" @click="tabChangeHandle('3', 1)">
            {{ getLanguageData.storeText.myCollect }}
          </div>
          <div>
            <Input search :enter-button="getLanguageData.storeText.search" :placeholder="getLanguageData.storeText.enterKeyWords" @on-search="searchHandle" />
          </div>
        </div>
        <div class="contentbox">
          <div class="left">
            <Card class="storetype">
              <div slot="title" class="title" style="text-align: center">
                {{ getLanguageData.storeText.storeCategory }}
              </div>
              <div class="categoryone">
                &lt;{{ getLanguageData.storeText.firstLevelCategory }}
              </div>
              <div v-if="categoryData.length > 10 && showBtn">
                <h3 v-for="(item, index) in categoryData.slice(0, 10)" :key="'i' + index" class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''">
                  <a :href="getLOCATIONORIGIN + 'store/' + sotreSpuId + '?storeCateId=' + item.id + '&activeCategory=' + index" :title="item.category" class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''">{{ item.category }}</a>
                </h3>
                <!-- <div class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''" v-for="(item, index) in categoryData.slice(0, 10)" :key="'i' + index" @click="storeCateHandle(item, index, 1)">{{item.category}}</div> -->
              </div>
              <div v-else>
                <h3 v-for="(item, index) in categoryData" :key="'j' + index" class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''">
                  <a :href="getLOCATIONORIGIN + 'store/' + sotreSpuId + '?storeCateId=' + item.id + '&activeCategory=' + index" :title="item.category" class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''">{{ item.category }}</a>
                </h3>
                <!-- <div class="category" :class="activeCategory===index || storeCateId===item.id ? 'active' : ''" v-for="(item, index) in categoryData" :key="'j' + index" @click="storeCateHandle(item, index, 1)">{{item.category}}</div> -->
              </div>
              <div v-if="categoryData.length > 10" class="showbtn">
                <span @click="showHandle">{{ showBtn ? getLanguageData.storeText.viewMore : getLanguageData.storeText.putAway }}</span>
              </div>
            </Card>
            <Card class="rank">
              <div slot="title" class="title" style="text-align: center">
                {{ getLanguageData.storeText.hotSaleRank }}
              </div>
              <div v-for="(item, index) in hotSaleData.slice(0, 5)" :key="'m' + index" class="flashgood" @click="$router.push('/product/' + item.id)">
                <img :src="getImageBasePath + item.goodsSearchImage + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="item.goodsTitle">
                <h3><a :href="getLOCATIONORIGIN + 'product/' + item.id" :title="item.goodsTitle"><strong>{{ item.goodsTitle }}</strong></a></h3>
                <section class="price">
                  <span>{{ item.activityPrice }}円</span>
                  <span v-show="item.activityPrice!=item.marketPrice">{{ item.marketPrice }}円</span>
                </section>
              </div>
            </Card>
          </div>
          <div class="right">
            <div v-if="activeTab==='2' && goodsData && goodsData.length" class="querybox">
              <div :class="sorted===-1 ? 'active' : ''" @click="queryHandle('desc', -1, '2')">
                {{ getLanguageData.storeText.comprehensiveRank }}
              </div>
              <div :class="sorted===0 ? 'active' : ''" @click="queryHandle('desc', 0, '2')">
                {{ getLanguageData.storeText.salesVolume }}
              </div>
              <div>
                <div class="price" :class="sorted===1 ? 'active' : ''" @click="queryHandle('asc', 1, '2')">
                  {{ getLanguageData.storeText.price }}
                </div>
                <div class="icon">
                  <div><Icon type="md-arrow-dropup" :class="sortOrder==='asc' && sorted===1 ? 'active' : ''" @click="priceHandle(1, 'asc', '2', '3')" /></div>
                  <div><Icon type="md-arrow-dropdown" :class="sortOrder==='desc'&& sorted===1 ? 'active' : ''" @click="priceHandle(1, 'desc', '2', '3')" /></div>
                </div>
              </div>
            </div>
            <div v-if="goodsData && goodsData.length" class="goodscontent" :class="activeTab==='2' ? 'goodscont' : ''">
              <likegood v-for="(item, index) in goodsData" :key="index" :goods-item="item" :is-border="1" @refreshHandle="refreshHandle" />
            </div>
            <div v-else class="no_data">
              <div>
                <img src="@/assets/images/common/nodata.png" alt="">
                <div class="txt">
                  {{ getLanguageData.storeText.noData }}
                </div>
              </div>
            </div>
            <div v-if="goodsData && goodsData.length" class="pagebox">
               <Page :total="total" :current="pageNo" :page-size="pageSize" style="float: right" @on-change="currentPageChange"/>
<!--              <pagecom-->
<!--                :total="total"-->
<!--                :and-flag="false"-->
<!--                :current-page="pageNo || 1 "-->
<!--                :page-size="pageSize"-->
<!--                :all-pages="Math.ceil(total / pageSize)"-->
<!--                :absolutepath="'store/' + sotreSpuId"-->
<!--              />-->
            </div>
          </div>
        </div>
      </section>
    </section>
    <sendStoreMail
      :mail-adress="mailAdress"
      :send-modal="sendModal"
      :user-info="userInfo"
      :is-pla="isPla"
      :modal-header="modalHeader"
      :is-reply="isReply"
      @closeMail="closeMail"
    />
    <Modal
      v-model="emailModal"
      :footer-hide="true"
    >
      <div style="text-align:center;font-size:20px;">
        {{ getLanguageData.storeText.storeService }}
      </div>
      <div v-for="(item, index) in storeInfo.mails" :key="index" style="margin:10px 0 0 20px;cursor:pointer;" @click="submit(item)">
        {{ getLanguageData.storeText.servicer }}&nbsp;{{ index + 1 }}
      </div>
    </Modal>
  </div>
</template>

<script>
import likegood from '@/components/goodscom/likegood'
import sendStoreMail from '@/components/mail/sendStoreMail.vue'
// import pagecom from '@/components/common/pagecom'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  middleware: 'auth',
  components: {
    likegood,
    sendStoreMail
    // pagecom
  },
  watchQuery: ['pageNo', 'sorted', 'sortOrder', 'activeTab', 'storeCateId', 'activeCategory', 'userId', 'keyword', 'showFavorite'],
  async asyncData ({ $axios, params, query, error }) {
    try {
      // 店铺信息
      const { data } = await $axios.get('starday-supplier/supplier/getStoreAppInfo?storeId=' + params.storeid)
      // 店铺类别
      const category = await $axios.post('starday-goods/user/store_category/list', {
        storeId: params.storeid
      })
      // 首页/全部商品/我的收藏
      const responseData = await $axios.post('starday-elasticsearch/search/goods', {
        pageNo: query.pageNo * 1 || 1,
        pageSize: 20,
        storeId: params.storeid,
        sorted: (query.sorted === '-1') ? '' : (query.sorted * 1 || 0),
        sortOrder: query.sortOrder || 'asc',
        storeCateId: query.storeCateId || query.categoryId,
        keyword: query.keyword || '',
        showFavorite: query.showFavorite * 1 || 1
      })
      // 热卖排行
      const hotSaleData = await $axios.post('starday-elasticsearch/search/goods', {
        pageNo: query.pageNo * 1 || 1,
        pageSize: 20,
        storeId: params.storeid,
        sorted: 0,
        sortOrder: 'asc',
        showFavorite: 1
      })
      return {
        categoryData: category.data,
        storeInfo: data,
        goodsData: responseData.data.rows,
        pageNo: responseData.data.pageNo,
        pageSize: responseData.data.pageSize,
        total: responseData.data.totalRows,
        hotSaleData: hotSaleData.data.rows,
        sortOrder: query.sortOrder || 'asc',
        sorted: query.sorted ? query.sorted * 1 : -1,
        activeTab: query.activeTab || '1',
        storeCateId: query.storeCateId || query.categoryId || '',
        activeCategory: query.activeCategory ? query.activeCategory * 1 : -1,
        userId: query.userId || '',
        keyword: query.keyword || '',
        showFavorite: query.showFavorite || 1,
        sotreSpuId: params.storeid
      }
    } catch (e) {
      e.reqUrl = 'starday-elasticsearch/search/goods'
      error(e)
    }
  },
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLoginData: 'getLoginData',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  data () {
    return {
      sendModal: false,
      userInfo: {},
      isPla: false,
      modalHeader: '',
      isReply: false,
      emailModal: false,
      mailAdress: '',
      showBtn: true,
      categoryData: []
    }
  },
  mounted () {},
  methods: {
    collectHandle (flag) {
      const _this = this
      _this.$axios.post('starday-goods/user/store_collection/follow', {
        state: flag,
        storeId: _this.$route.params.storeid
      }).then((res) => {
        if (res.code === 200) {
          if (flag) {
            this.storeInfo.follow = 1
            _this.$Message.success(_this.getLanguageData.storeText.collectionSuccess)
          } else {
            this.storeInfo.follow = 0
            _this.$Message.success(_this.getLanguageData.storeText.collectionFaile)
          }
        }
      })
    },
    searchHandle (val) {
      this.$router.push(location.pathname + '?keyword=' + val)
    },
    currentPageChange (pageNo) {
      this.$router.push(location.pathname + '?storeCateId=' + this.storeCateId + '&activeCategory=' + this.activeCategory + '&sortOrder=' + this.sortOrder + '&sorted=' + this.sorted + '&activeTab=' + this.activeTab + '&showFavorite=' + this.showFavorite + '&pageNo=' + pageNo)
      document.querySelector('.appbox').scrollTop = 0
    },
    // tab切换
    tabChangeHandle (str, pageNo) {
      if (str === '3') {
        this.$router.push(location.pathname + '?pageNo=' + pageNo + '&activeTab=' + str + '&showFavorite=' + str * 1)
      } else {
        this.$router.push(location.pathname + '?pageNo=' + pageNo + '&activeTab=' + str)
      }
    },
    // 综合排序/销量切换
    queryHandle (sort, sorted, activeTab) {
      this.$router.push(location.pathname + '?sortOrder=' + sort + '&sorted=' + sorted + '&activeTab=' + activeTab)
    },
    // 价格升序降序
    priceHandle (num, sort, activeTab) {
      this.$router.push(location.pathname + '?sorted=' + num + '&sortOrder=' + sort + '&activeTab=' + activeTab)
    },
    refreshHandle () {
      this.pageNo = 1
      this.$router.push(location.pathname + '?pageNo=' + this.pageNo)
    },
    showHandle () {
      this.showBtn = !this.showBtn
    },
    // 店铺类别
    storeCateHandle (obj, i, pageNo) {
      console.log('-location.pathname----', location.pathname)
      this.$router.push(location.pathname + '?storeCateId=' + obj.id + '&activeCategory=' + i + '&pageNo=' + pageNo)
    },
    submit (item) {
      this.emailModal = false
      this.sendModal = true
      this.userInfo = this.storeInfo
      this.modalHeader = this.getLanguageData.storeText.contactStore
      this.mailAdress = item
    },
    closeModal () {
      this.emailModal = false
    },
    showMaile () {
      this.emailModal = true
    },
    closeMail () {
      this.sendModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.store {
  .storecontent {
    background: #ffffff;
  }
  .headbox {
    height: 300px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #000;
    >img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
    /*background-image: url("../../assets/images/store/poster.png");*/
    .namebox,.starbox,.butnbox {
      z-index: 100;
    }
    .imgbox {
      display: flex;
      justify-content: center;
      position: relative;
      .storeimg {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 5px solid rgba(201, 201, 201, 0.5);
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .collect,.collected {
      height: 24px;
      background: #1491FF;
      border-radius: 12px;
      color: #FFFFFF;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
      position: absolute;
      bottom: 150px;
      padding: 0 15px;
      span {
        vertical-align: middle;
      }
      span:first-child {
        font-size: 20px;
      }
      span:last-child {
        font-size: 12px;
      }
    }
    .collected, .collect:hover {
      cursor: pointer;
    }
    .namebox {
      line-height: 20px;
      margin-top: 20px;
      span {
        vertical-align: middle;
      }
      span:first-child {
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        color: #ffffff;
        line-height: 22px;
      }
      span:last-child {
        display: inline-block;
        width: 40px;
        height: 20px;
        background: #ff5d19;
        border-radius: 4px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 20px;
      }
    }
    .starbox {
      margin-top: 8px;
      span:first-child {
        line-height: 16px;
      }
      span {
        vertical-align: middle;
        font-size: 14px;
        color: #fff;
        vertical-align: middle;
        margin-right: 35px;
      }
      img{
        width: 17px;
        height: 16px;
        vertical-align: middle;
      }
    }
    .butnbox {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .contact {
        margin-right: 22px;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .contact, .storeinfo {
        width: 94px;
        height: 30px;
        background: #e76636;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
      }
      .contact, .storeinfo:hover {
        cursor: pointer;
      }
      .storeinfotip {
        border-top: 1px dashed #333;
        padding-top: 10px;
        margin-top: 15px;
        div {
          height: 30px;
          font-size: 12px;
          color: #333;
          line-height: 30px;
        }
      }
    }
  }
  .store-contaniner {
    margin-top: 26px;
    .tabbox {
      display: flex;
      >div {
        height: 42px;
        font-size: 16px;
        color: #333333;
        font-weight: 400;
        font-family: PingFangSC, PingFangSC-Regular;
        text-align: center;
        line-height: 42px;
      }
      >div:nth-of-type(1) {
        width: 270px;
        border-bottom: 1px solid #e0e0e0;
      }
      div:nth-of-type(2) {
        color: #FF5D19;
        font-weight: 500;
      }
      div:nth-of-type(2), div:nth-of-type(3), div:nth-of-type(4){
        width: 162px;
        cursor: pointer;
        border-bottom: 1px solid #e0e0e0;
        &.active {
          border-top: 3px solid #FF5D19;
          border-left: 1px solid #e0e0e0;
          border-right: 1px solid #e0e0e0;
          border-bottom: none;
        }
      }
      div:nth-of-type(5) {
        width: 645px;
        border-bottom: 1px solid #e0e0e0;
        padding-right: 20px;
        .ivu-input-group {
          width: 280px;
          float: right;
        }
        /deep/.ivu-input-group-with-append .ivu-input {
          border-top-left-radius: 1000px;
          border-bottom-left-radius: 1000px;
        }
        /deep/.ivu-input-group-append {
          border-top-right-radius: 1000px;
          border-bottom-right-radius: 1000px;
        }
      }
    }
    .contentbox {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .left {
        width: 250px;
        /deep/.ivu-card {
          border: none;
          box-shadow: 0px 2px 5px 4px rgba(0,0,0,0.05);
        }
        .title {
          text-align: center;
          font-size: 16px;
          color: #333333;
          font-weight: 500;
        }
        .storetype {
          .categoryone {
            padding-left: 20px;
            font-size: 15px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 600;
            color: #333333;
            line-height: 30px;
          }
          .category, .showbtn {
            padding-left: 40px;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #333333;
            line-height: 35px;
          }
          .category {
            color: #333333;
            &.active {
              color: #FF5D19;
            }
          }
          .showbtn {
            color: #1491ff;
          }
          .category,.showbtn:hover {
            cursor: pointer;
          }
        }
        .rank {
          margin-top: 30px;
          .flashgood{
            display: inline-block;
            width: 210px;
            height: 334px;
            background-color: #fff;
            box-sizing: border-box;
            img{
              width: 210px;
              height: 210px;
            }
            strong{
              font-size: 13px;
              font-weight: 400;
              color: #333333;
              padding: 10px 0 0;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              line-height: 20px;
              height: 50px;
            }
            .price{
              padding: 10px 0;
              span:nth-of-type(1){
                height: 21px;
                font-size: 18px;
                font-weight: 700;
                color: #f26936;
                line-height: 21px;
              }
              span:nth-of-type(2){
                font-size: 13px;
                font-family: DINAlternate, DINAlternate-Bold;
                font-weight: 700;
                text-decoration:  line-through;
                color: #999999;
                line-height: 15px;
              }
            }
          }
          .flashgood:hover {
            cursor: pointer;
          }
        }
      }
      .right {
        width: 1138px;
        .querybox {
          width: 1117px;
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          margin: 0 auto;
          >div {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            margin-left: 40px;
            &.active {
              color: #FF5D19;
            }
          }
          >div:hover {
            cursor: pointer;
          }
          >div:nth-of-type(3) {
            display: flex;
            align-items: center;
            .price {
              height: 21px;
              &.active {
                color: #FF5D19;
              }
            }
            .icon {
              height: 27px;
              /deep/.ivu-icon {
                color: #bbb;
                height: 8px;
                &.active {
                  color: #000;
                }
              }
            }
            .icon {
              display: flex;
              flex-flow: column;
              justify-content: center;
              >div {
                display: flex;
                align-items: flex-start;
              }
              >div:first-child {
                height: 10px;
              }
              >div:last-child {
                height: 13px;
              }
            }
          }
        }
        .goodscontent {
          display: flex;
          flex-flow: row;
          flex-wrap: wrap;
          &.goodscont {
            margin-top: 20px;
          }
        }
        .pagebox {
          height: 40px;
          margin: 20px;
        }
      }
      .no_data {
        height: 872px;
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
}
</style>
