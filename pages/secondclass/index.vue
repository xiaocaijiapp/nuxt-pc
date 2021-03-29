<template>
  <div class="container">
    <div class="container_nav">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguage === 'zh'? catery[0] : catery[1] }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--    分类页 banner   包含分类轮播-->
    <section class="banner">
      <!--      左侧分类-->
      <div class="banner_left">
        <div
          v-for="(item,index) in cateTreeList"
          :key="index"
          class="catelist"
          @mouseenter="entryCatry(item.id, index)"
          @mouseleave="showCateId=''"
        >
          <strong>{{ getLanguage == 'zh' ? item.categoryZh : item.categoryJa }}</strong>
          <img v-if="showCateId!==index" src="~/assets/images/index/right.png">
          <img v-if="showCateId===index" src="~/assets/images/index/rightactive.png">
          <div v-if="showCateId===index" class="cateselectbox">
            <div class="selectcontent">
              <div class="selectleft">
                <section v-if="item.list && item.list.length > 0">
                  <h6 v-for="(childrenitem,childrenindex) in item.list" :key="childrenindex" @click="tocatepage(childrenitem.id)">
                    <!--                    <nuxt-link :to="'/cate/'+childrenitem.id">-->
                    <!--                      -->
                    <!--                    </nuxt-link>-->
                    {{ getLanguage == 'zh' ? childrenitem.categoryZh : childrenitem.categoryJa }}
                  </h6>
                </section>
              </div>
              <div class="selectright">
                <div v-for="item in cateImage" :key="item.id">
                  <!--                  <img :src="getImageBasePath + item.imageUrl" @click="Tonextpage(item, item.linkType)">-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="catelist" @mouseover="showCateId='more'" @mouseleave="showCateId=''" @click="toMoreCate">
          <strong>{{ getLanguageData.indexPage.morecate }}</strong>
          <img v-if="showCateId!=='more'" src="~/assets/images/index/right.png">
          <img v-if="showCateId==='more'" src="~/assets/images/index/rightactive.png">
        </div>
      </div>
      <!--      banner 轮播图-->
      <div v-if="banner" class="indexbannercarser">
        <img v-lazy="getImageBasePath + banner.imageUrl" @click="Tonextpage(banner, banner.linkType)">
      </div>
      <!--      右侧广告图-->
      <div class="indexbannermar">
        <img v-for="(item,index) in bannerRightList" :key="index" :src="getImageBasePath + item.imageUrl" alt="" @click="Tonextpage(item, item.linkType)">
      </div>
    </section>
    <!--    热门爆款-->
    <goodsreccoms :title="getLanguageData.indexPage.hotgoods" :goods-list="hotGoodsproData" @fineGoodsEmit="watchfineGoodsEmit" />
    <!--    新品到货-->
    <secondnewgoodcom :left="newgoodsleft" :right="newgoodsright" @newgoodsUpData="watchNewGoods" />
    <!--    精品店铺-->
    <boutiqueshop v-if="StoreList.length > 0" :store-list="StoreList" @fineStore="watchfineStoreEmit" />
    <!--    猜你喜欢-->
    <section class="likebox">
      <section class="comtitle">
        <img src="@/assets/images/index/tleft.png" alt="">
        <strong style="font-size:24px;">{{ getLanguageData.indexPage.mayalsolike }}</strong>
        <img src="@/assets/images/index/tright.png" alt="">
      </section>
      <section class="likecontent">
        <likegood v-for="(item,index) in likeProdata.rows" :key="index" :goods-item="item" />
      </section>
    </section>
    <!--    相关类目-->
    <section v-if="false" class="classgroup">
      <strong>{{ getLanguageData.indexPage.associatedcate }}</strong>
      <div class="classgroupitems">
        <span v-for="(item, index) in catesData" :key="index" :class="active == index ? 'actived' : ''" class="group-item" @click="tocate(index, item.introduceCategoryId)">{{ item.introduceCategoryJp }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import goodsreccoms from '@/components/index/goodsreccoms'
import secondnewgoodcom from '@/components/secondclass/secondnewgoodcom'
import boutiqueshop from '@/components/index/boutiqueshop'
import utils from '~/util/index'
export default {
  layout: 'default',
  name: 'Secondclass',
  middleware: 'auth',
  watchQuery: ['id'],
  components: {
    goodsreccoms,
    secondnewgoodcom,
    boutiqueshop
  },
  async asyncData ({ query, $axios }) {
    // 获取一级分类id
    const { id } = query
    const { data } = await $axios.get(`/starday-system/user/pc/info/getPcCateInfo/${id}`)
    const { banner, bannerRightList, cateTreeList, fineStoreList, category } = data
    const catery = category.split('|')
    // 猜你喜欢数据展示
    const likeGoods = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: '',
      exclude: [],
      firstCategoryId: id,
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 30,
      secCategoryId: '',
      sortOrder: '',
      sorted: 0,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const likeProdata = likeGoods.data
    // 新品到货数据
    const newgoods = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: '',
      exclude: [],
      firstCategoryId: id,
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 7,
      secCategoryId: '',
      sortOrder: 'desc',
      sorted: 2,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const newGoodsData = newgoods.data.rows
    // 热销爆款数据
    const hotGoodspro = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: '',
      exclude: [],
      firstCategoryId: id,
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 24,
      secCategoryId: '',
      sortOrder: 'desc',
      sorted: 3,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const hotGoodsproData = hotGoodspro.data.rows
    // 相关类目
    const getCates = await $axios.get('/starday-goods/user/seo/goods_category/getCate?cateId=' + id)
    const catesData = getCates.data
    // 获取分类右侧图片
    const caterightImage = await $axios.get('/starday-system/user/pc/info/getCateMap')
    const cateImageMap = caterightImage.data
    const seoData = await $axios.get('starday-system/user/seo/info/' + id + '/1/3')
    if (!seoData.data || !seoData.data.title) {
      seoData.data = {
        title: catery[1] + 'の通販「人気' + catery[1] + '」商品おすすめ｜Starday市場',
        keyWords: catery[1] + ',' + catery[1] + '通贩,,' + catery[1] + ' 安い,' + catery[1] + ' 人気,' + catery[1] + ' おすすめ,starday,starday市場',
        des: catery[1] + '通販のページ、人気の' + catery[1] + 'がお得な価格で登場！全品最安値99円から！' + catery[1] + 'からまで品質豊富に取り揃え。セール商品・送料無料商品も多数！stardayは総合オンラインショッピングサイトです。'
      }
    }
    return {
      id,
      banner,
      bannerRightList,
      cateTreeList,
      fineStoreList,
      likeProdata,
      newGoodsData,
      hotGoodsproData,
      catesData,
      cateImageMap,
      catery,
      seoData: seoData.data
    }
  },
  head () {
    const vm = this
    return {
      title: vm.seoData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: vm.seoData.des
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: vm.seoData.keyWords
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getImageBasePath', 'getLanguage', 'getLanguageData', 'getLOCATIONORIGIN']),
    StoreList () {
      return utils.chunk(this.fineStoreList, 6)
    }
  },
  data () {
    return {
      showCateId: '',
      newgoodsleft: [],
      newgoodsright: [],
      active: '',
      cateImage: []
    }
  },
  created () {
    this.newgoodsleft = this.newGoodsData.splice(0, 1)
    this.newgoodsright = this.newGoodsData.splice(0)
  },
  methods: {
    ...mapMutations(['setSpecValues']),
    tocatepage (levelid) {
      this.setSpecValues([])
      this.$router.push('/cate/' + levelid)
    },
    entryCatry  (id, index) {
      for (const prop in this.cateImageMap) {
        if (this.cateImageMap[prop] && this.cateImageMap[prop][id] && this.cateImageMap[prop][id].length > 0) {
          this.cateImage = this.cateImageMap[prop][id]
        } else {
          this.cateImage = []
        }
      }
      this.showCateId = index
    },
    toMoreCate () {
      this.$router.push({ path: '/category' })
    },
    tocate (index, id) {
      this.active = index
      this.$router.push({
        path: '/secondclass',
        query: {
          id
        }
      })
    },
    // 处理页面跳转逻辑
    Tonextpage (item, type) {
      // 链接类型 0 空 1二级页 2 店铺 3 商品
      switch (type) {
        case 1:
          // 跳转二级页面
          if (item.linkPageType === 1) {
            this.$router.push('/promotionpage/promotionpicture/' + item.relateId)
          } else {
            this.$router.push('/promotionpage/promotiongoods/' + item.relateId)
          }
          break
        case 2:
          // 跳转店铺主页
          this.$router.push({ path: '/store/' + item.relateId })
          break
        case 3:
          // 商品详情页
          this.$router.push({ path: '/product/' + item.relateId })
          break
        case 4:
          // 商品详情页
          break
        default:
          // 默认不跳转
          return false
      }
    },
    // 精品店铺向上传递数据
    watchfineStoreEmit ({ item, type }) {
      this.Tonextpage(item, type)
    },
    watchNewGoods ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 热销爆款
    watchfineGoodsEmit ({ item, type }) {
      this.Tonextpage(item, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.container_nav{
  font-size: 16px;
  padding: 16px 0px;
  span:nth-child(1){
    color:#FF5D19;
  }
}
.banner{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 434px;
  width: 100%;
.banner_left {
    display: inline-block;
    width: 250px;
    background-color: #fff;
    padding: 9px 0;
    height: 434px;
    position: relative;

    .catelist {
      padding: 0 13px 0 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      height: 32px;
      line-height: 32px;

      strong {
        font-weight: 400;
        a{
          font-weight: 400;
          color: #333333;
        }
      }

      img {
        width: 12px;
        height: 12px;
      }
    }

    .catelist:hover {
      strong a{
        color: #FF5D19;
      }
    }

    .cateselectbox {
      position: absolute;
      height: 434px;
      width: 1139px;
      background-color: #F3F4F6;
      left: 250px;
      top: 0px;
      z-index: 99;
      padding-left: 10px;
      .selectcontent::-webkit-scrollbar{
        width:10px;
        height:10px;
        /**/
      }
      .selectcontent::-webkit-scrollbar-track{
        background: rgb(239, 239, 239);
        border-radius:2px;
      }
      .selectcontent::-webkit-scrollbar-thumb{
        background: #bfbfbf;
        border-radius:10px;
      }
      .selectcontent::-webkit-scrollbar-thumb:hover{
        background: #333;
      }
      .selectcontent::-webkit-scrollbar-corner{
        background: #179a16;
      }
      .selectcontent{
        display: flex;
        background-color: #fff;
        width: 1150px;
        padding: 20px 26px;
        justify-content: space-between;
        height: inherit;
        .selectleft{
          width: 1020px;
          h5 a{
            height: 22px;
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            color: #ff5d19;
            line-height: 22px;
            margin-bottom: 10px;
          }
          section{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            h6{
              display: inline-block;
              width: 33%;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 30px;
              font-style: normal;
            }
            h6:hover{
              color: #FF5D19;
            }
          }

        }
        .selectright{
          width: 130px;
          img{
            width: 120px;
            height: 120px;
          }
        }
      }
    }
  }
.indexbannercarser {
  width: 880px;
  height: 434px;
  img {
    width: 880px;
    height: 434px;
    cursor: pointer;
  }
}
.indexbannermar {
  width: 250px;
  height: 434px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  img {
    height: 207px;
    width: 207px;
    cursor: pointer;
  }
}

}
.likebox {
  margin-top: 37px;
  margin-left: -10px;
  margin-right: -10px;
  .comtitle {
    text-align: center;
    img {
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }

    strong {
      display: inline-block;
      vertical-align: middle;
      margin: 0 24px;
    }
  }
  .likecontent {
    margin-top: 28px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
.classgroup{
  width: 100%;
  height: 100px;
  strong{
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    text-align: left;
    color:#333333;
  }
  .classgroupitems{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    .actived{
      color: #f26936!important;
    }
    .group-item{
      cursor: pointer;
      line-height: 36px;
      height: 36px;
      width: 200px;
      display: inline-block;
      font-size: 12px;
      color: #333333;
    }
  }
}
</style>
