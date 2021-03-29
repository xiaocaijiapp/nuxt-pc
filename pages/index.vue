<template>
  <div class="container">
    <section class="indexbanner">
      <div class="indexbannertype">
        <div
          v-for="(item,index) in cateListData"
          :key="index"
          class="catelist"
          @mouseenter="entryCatry(item.id, index)"
          @mouseleave="showCateId=''"
        >
          <strong
            :class="showCateId===index?'activestrong':''"
            @click="levelOneClick(item.id,cateListData[index].goodsCategoryDtoList[0].goodsCategoryDtoList[0].id)"
          >{{
            getLanguage == 'zh' ? item.category : item.categoryJp }}</strong>
          <img v-show="showCateId!==index" src="@/assets/images/index/right.png" :alt="item.category">
          <img v-show="showCateId===index" src="@/assets/images/index/rightactive.png" :alt="item.category">
          <div v-show="showCateId===index" class="cateselectbox">
            <div class="selectcontent">
              <div class="selectleft">
                <div v-for="(prop,i) in item.goodsCategoryDtoList" :key="i" class="selectitem">
                  <h5 class="selectitem-title">
                    {{ getLanguage == 'zh' ? prop.category : prop.categoryJp }}
                  </h5>
                  <section v-show="item.goodsCategoryDtoList && prop.goodsCategoryDtoList.length">
                    <h6
                      v-for="(childrenitem,childrenindex) in prop.goodsCategoryDtoList"
                      :key="childrenindex"
                      @click="tocate(childrenitem.id)"
                    >
                      <!--                      <nuxt-link :to="'/cate/'+childrenitem.id"></nuxt-link>-->
                      <a :href="getLOCATIONORIGIN + 'cate/' + childrenitem.id">{{ getLanguage == 'zh' ?
                        childrenitem.category : childrenitem.categoryJp }}</a>
                    </h6>
                  </section>
                </div>
              </div>
              <div class="selectright">
                <div v-for="item in cateImage" :key="item.id">
                  <img :src="getImageBasePath + item.imageUrl" @click="Tonextpage(item, item.linkType)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="catelist" @mouseover="showCateId='more'" @mouseleave="showCateId=''" @click="toMoreCate">
          <strong>{{ getLanguageData.indexPage.morecate }}</strong>
          <img v-if="showCateId!=='more'" src="@/assets/images/index/right.png" alt="item.category">
          <img v-if="showCateId==='more'" src="@/assets/images/index/rightactive.png" alt="item.category">
        </div>
      </div>
      <div class="indexbannercarser">
        <Carousel loop arrow="never" autoplay :autoplay-speed="5000">
          <CarouselItem v-for="item in carouselList" :key="item.id">
            <div class="demo-carousel" @click="Tonextpage(item,item.linkType)">
              <img class="demo-carousel-img" :src="getImageBasePath + item.imageUrl">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="indexbannermar">
        <nuxt-link to="/coupon">
          <img src="@/assets/images/index/coupon.png" alt="">
        </nuxt-link>
        <img
          v-for="item in bannerRightList"
          :key="item.id"
          :src="getImageBasePath + item.imageUrl"
          @click="Tonextpage(item,item.linkType)"
        >
      </div>
    </section>
    <!--    秒杀-->
    <div v-if="flashData.show" class="indexflash">
      <div class="indexflashtitle">
        <section class="indexflashtitleleft">
          <strong>{{ getLanguageData.indexPage.flashtitlebefore }}</strong>
          <strong>
            <b>{{ time.hours }}</b>
            :
            <b>{{ time.minutes }}</b>
            :
            <b>{{ time.seconds }}</b>
          </strong>
          <span v-if="flashData.timestate === 1">{{ getLanguageData.indexPage.flashtitleafter }}</span>
          <span v-else>{{ getLanguageData.goodsText.afterStartMm }}</span>
        </section>
        <section class="indexflashtitleright" @click="toKillList">
          <strong>{{ getLanguageData.indexPage.moreflash }}</strong> <img src="@/assets/images/index/more.png" alt="">
        </section>
      </div>
      <Carousel class="comcontent carousel" arrow="always" dots="none">
        <CarouselItem v-for="(item,index) in flashData.data" :key="index">
          <div class="demo-carousel">
            <div v-for="(props,i) in item" :key="i" class="demo-carousel-item">
              <flashgood :goods-data="props" @activityEmitData="watchActivityEmit" />
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!--    特辑-->
    <specialcom
      v-if="specialEditionList && specialEditionList.length > 0"
      :special-list="specialEditionList"
      @specialEditionEmit="watchspecialEditionEmit"
    />
    <!--    好物推荐-->
    <goodsreccom
      v-if="fineGoodsList && fineGoodsList.length > 0"
      :title="getLanguageData.indexPage.goodProRec"
      :goods-list="fineGoodsList"
      @fineGoodsEmit="watchfineGoodsEmit"
    />
    <!--    新品推荐-->
    <newgoodcom
      v-if="userNewGoods.length > 0"
      :new-goods-com="goodsAdvList"
      :user-new-goods="userNewGoods"
      @goodsproleft="watchgoodsleft"
      @goodsproright="watchgoodsright"
    />
    <!--     品牌馆-->
    <brandPavilion v-if="brandData && brandData.length && brandData[activeBrandIndex] && brandData[activeBrandIndex].list && brandData[activeBrandIndex].list.length" class="brandscrollbox" :brand-data="brandData" :active-brand-index="activeBrandIndex" />
    <!--    精品店铺-->
    <boutiqueshop v-if="StoreList && StoreList.length > 0" :store-list="StoreList" @fineStore="watchfineStoreEmit" />
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
    <div class="hotwordbox">
      <p>{{ getLanguageData.indexPage.hotword }}</p>
      <a v-for="(item,index) in hotworddata" :key="index" :href="getLOCATIONORIGIN + 'search/product/'+item+'/1'">{{ item }}</a>
    </div>
  </div>
</template>

<script>
import flashgood from '@/components/goodscom/flashgood'
import specialcom from '@/components/index/specialcom'
import goodsreccom from '@/components/index/goodsreccom'
import newgoodcom from '@/components/index/newgoodcom'
import boutiqueshop from '@/components/index/boutiqueshop'
import likegood from '@/components/goodscom/likegood'
import brandPavilion from '@/components/index/brandPavilion'
import { mapGetters, mapMutations } from 'vuex'
import utils from '~/util/index'
export default {
  layout: 'default',
  middleware: 'auth',
  components: {
    flashgood,
    specialcom,
    goodsreccom,
    newgoodcom,
    boutiqueshop,
    likegood,
    brandPavilion
  },
  async asyncData ({ $axios, store, query }) {
    // 获取pc首页展示信息
    const pcindexinfo = await $axios.get('/starday-system/user/pc/info/getPcFirstPageInfo')
    // 获取新品推荐右侧商品列表
    const userNewGoodsData = await $axios.post('/starday-elasticsearch/search/goods', {
      keyword: '',
      sorted: 2,
      sortOrder: 'desc',
      pageNo: 1,
      pageSize: 6
    })
    const userNewGoods = userNewGoodsData.data ? (userNewGoodsData.data.rows ? userNewGoodsData.data.rows.splice(0, 6) : []) : []
    // 获取首页秒杀数据
    const secondskillData = await $axios.get('/starday-activity/flash_sale/list')
    const flashData = {
      show: false,
      title: '',
      times: [],
      data: [],
      nowtimes: ''
    }
    // 秒杀数据处理逻辑
    if (secondskillData.code === 200) {
      const starting = secondskillData.data.filter(item => item.timeState === 1)
      const nostart = secondskillData.data.filter(item => item.timeState === 0)
      if (starting.length > 0) {
        // 正在进行中秒杀活动
        const activity = starting[0]
        const requestdata = activity.flashSaleActivitys.map(item => item.goodsId)
        flashData.title = store.getters.getLanguageData.indexPage.flashtitleafter
        flashData.show = true
        // 请求正在参与秒杀活动商品数据
        const activitypros = await $axios.post('/starday-elasticsearch/search/goodsId', requestdata)
        if (activitypros.data && activitypros.data.length) {
          activitypros.data.forEach((item) => {
            activity.flashSaleActivitys.forEach((prop) => {
              if (item.id === prop.goodsId) {
                item.discount = prop.discount
                item.leverNum = prop.leverNum
                item.buyNum = prop.buyNum
                item.stockNum = prop.stockNum
                item.timeState = activity.timeState
              }
            })
          })
        }
        flashData.timestate = activity.timeState
        flashData.data = utils.chunk(activitypros.data, 6)
        flashData.startimes = activity.nowtimes
        flashData.endtimes = activity.nowtimes.split(' ')[0] + ' ' + activity.endTimeString
      }
      // 秒杀活动为开始的
      if (starting.length === 0 && nostart.length > 0) {
        // 正在进行中秒杀活动
        nostart.sort((a, b) => {
          return utils.timeToSec(a.startTime) - utils.timeToSec(b.startTime)
        })
        const activity = nostart[0]
        const requestdata = activity.flashSaleActivitys.map(item => item.goodsId)
        flashData.title = store.getters.getLanguageData.indexPage.ontime
        flashData.show = true
        // 请求正在参与秒杀活动商品数据
        const activitypros = await $axios.post('/starday-elasticsearch/search/goodsId', requestdata)
        if (activitypros.data && activitypros.data.length) {
          activitypros.data.forEach((item) => {
            activity.flashSaleActivitys.forEach((prop) => {
              if (item.id === prop.goodsId) {
                item.discount = prop.discount
                item.leverNum = prop.leverNum
                item.buyNum = prop.buyNum
                item.stockNum = prop.stockNum
                item.timeState = activity.timeState
              }
            })
          })
        }
        flashData.data = utils.chunk(activitypros.data, 6)
        const dateArr = activity.startDate.split(' ')[0].split('-')
        dateArr.splice(1, 1, dateArr[1] - 1 > 10 ? '' + (dateArr[1] - 1) : '0' + (dateArr[1] - 1))
        const timeArr = activity.startTimeString.split(':')
        dateArr.push(...timeArr)
        flashData.timestate = activity.timeState
        flashData.startimes = activity.nowtimes
        flashData.endtimes = activity.nowtimes.split(' ')[0] + ' ' + activity.startTimeString
      }
    }
    // 猜你喜欢数据展示
    const likeGoods = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: '',
      exclude: [],
      firstCategoryId: '',
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 30,
      secCategoryId: '',
      sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)],
      sorted: 6,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const likeProdata = likeGoods.data
    // 好物推荐商品
    const findprorequestdata = pcindexinfo.data.fineGoodsList.map(item => item.relateId)
    const fineGoods = await $axios.post('/starday-elasticsearch/search/goodsId', findprorequestdata)
    const SeoData = await $axios.get('/starday-system/user/seo/info/1/1/1')
    // 获取所有分类
    let cateList = await $axios.post('/starday-goods/user/goods_category/list')
    if (cateList.data && cateList.data) {
      if (cateList.data.length > 12) {
        cateList.data = cateList.data.slice(0, 12)
      }
    } else {
      cateList = []
    }
    const cateListData = cateList.data
    const hotworddata = await $axios.post('/starday-elasticsearch/search/random/tags', { keywords: '', sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)] })
    // 品牌馆
    let brandData = []
    const _activeBrandIndex = query.brandIndex || 0
    const _brandIds = []
    if (pcindexinfo.data.frontBrandPavilionDto && pcindexinfo.data.frontBrandPavilionDto.list && pcindexinfo.data.frontBrandPavilionDto.list.length) {
      brandData = pcindexinfo.data.frontBrandPavilionDto.list
      if (brandData[_activeBrandIndex] && brandData[_activeBrandIndex].list) {
        brandData[_activeBrandIndex].list.forEach(function (branditem) {
          _brandIds.push(branditem.spuId)
        })
      }
    }
    if (_brandIds.length) {
      const _brandGoodsData = await $axios.post('/starday-elasticsearch/search/goodsId', _brandIds)
      if (_brandGoodsData.data && _brandGoodsData.data.length) {
        brandData[_activeBrandIndex].list = _brandGoodsData.data
      } else {
        brandData[_activeBrandIndex].list = []
      }
    }
    return {
      bannerRightList: pcindexinfo.data.bannerRightList,
      cateTreeList: pcindexinfo.data.cateTreeList,
      carouselList: pcindexinfo.data.carouselList,
      cateImageMap: pcindexinfo.data.cateImageMap,
      fineGoodsList: fineGoods.data,
      fineStoreList: pcindexinfo.data.fineStoreList,
      goodsAdvList: pcindexinfo.data.goodsAdvList,
      navigationList: pcindexinfo.data.navigationList,
      specialEditionList: pcindexinfo.data.specialEditionList,
      userNewGoods,
      likeProdata,
      secondskillData,
      flashData,
      SeoData: SeoData.data,
      cateListData,
      hotworddata: hotworddata.data || [],
      brandData,
      activeBrandIndex: _activeBrandIndex
    }
  },
  head () {
    const vm = this
    return {
      title: vm.SeoData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: vm.SeoData.des
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: vm.SeoData.keyWords
        }
      ],
      link: [
        {
          hid: 'canonical',
          ref: 'canonical',
          href: 'https://www.starday.jp/'
        },
        {
          hid: 'alternate',
          ref: 'alternate',
          media: 'only screen and (max-width: 640px)',
          href: 'https://m.starday.jp/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'getImageBasePath', 'getLanguageData', 'getLOCATIONORIGIN']),
    StoreList () {
      return utils.chunk(this.fineStoreList, 6)
    }
  },
  data () {
    return {
      showCateId: '',
      cateImage: [],
      selectCateList: [],
      timer: null,
      time: {},
      Starting: [], // 秒杀正在进行中
      Started: [], // 秒杀结束的
      NoStart: [], // 秒杀未开始
      timenow: '',
      n: 0
    }
  },
  created () {
    // console.log('flashData', this.flashData)
  },
  mounted () {
    // 给滚动条绑定监听事件
    // const appbox = document.querySelectorAll('.appbox')
    // appbox.addEventListener('scroll', this.handleScroll, true)
    if (this.$route.query && this.$route.query.brandIndex) {
      document.querySelector('.appbox').scrollTop = document.querySelector('.brandscrollbox').offsetTop
    }
  },
  beforeMount () {
    if (this.flashData.show) {
      // 调用秒杀倒计时方法
      this.timer = setInterval(() => {
        this.n += 1
        this.time = this.countdown(this.flashData.startimes, this.flashData.endtimes, this.n)
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
    // window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    ...mapMutations(['setSpecValues']),
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      const clientHeight = document.documentElement.clientHeight
      // 滚动条的高度>可视区的高度
      if (scrollTop > clientHeight) {
        this.local = !this.local
      } else {
        this.local = !this.local
      }
    },
    tocate (levelid) {
      this.setSpecValues([])
      // this.$router.push('/cate/' + levelid)
    },
    levelOneClick (id, levelid) {
      const _index = this.cateTreeList.findIndex(function (item) {
        return item.id === id
      })
      if (_index > -1) {
        this.$router.push('/secondclass?id=' + id)
      } else {
        if (!levelid) {
          return
        }
        this.setSpecValues([])
        this.$router.push('/cate/' + levelid)
      }
    },
    // 跳转至秒杀列表页
    toKillList () {
      this.$router.push({ path: '/flash' })
    },
    // 跳转至全部分类页面
    toMoreCate () {
      this.$router.push({ path: '/category' })
    },
    countdown (start, end, n) {
      const startime = new Date(start).getTime()
      const endtime = new Date(end).getTime()
      // 2. 拿到当前时间和过期时间之间的时间差（毫秒）
      let deltaTime = (endtime - startime - (n * 1000)) / 1000 // 到期时间和当前时间相差的毫秒数
      // 如果超时了，就停止倒计时
      if (deltaTime <= 0) {
        this.n = 0
        // 停止计时器
        clearInterval(this.timer)
        // 停止执行下面的代码
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }
      let hours = Math.floor(deltaTime / (60 * 60))
      deltaTime = deltaTime % (60 * 60)
      let minutes = Math.floor(deltaTime / 60)
      deltaTime = deltaTime % 60
      let seconds = Math.floor(deltaTime)
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      return {
        hours,
        minutes,
        seconds
      }
    },
    toSecondclass (id) {
      this.$router.push('/cate/' + id)
    },
    // banner右侧图片列表跳转
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
          // 跳转二级分类页面
          this.$router.push({
            path: 'secondclass',
            query: {
              id: item.relateId
            }
          })
          break
        default:
          // 默认不跳转
          return false
      }
    },
    // 分类鼠标进入处理右侧图片是否展示逻辑
    entryCatry (id, index) {
      for (const prop in this.cateImageMap) {
        if (this.cateImageMap[prop] && this.cateImageMap[prop][id] && this.cateImageMap[prop][id].length > 0) {
          this.cateImage = this.cateImageMap[prop][id]
        } else {
          this.cateImage = []
        }
      }
      this.showCateId = index
    },
    // 特辑商品点击事件
    watchspecialEditionEmit ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 好物推荐商品点击事件
    watchfineGoodsEmit ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 精品店铺点击触发时间
    watchfineStoreEmit ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 新品到货左侧图片点击
    watchgoodsleft ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 新品到货商品点击
    watchgoodsright ({ item, type }) {
      this.Tonextpage(item, type)
    },
    // 秒杀商品
    watchActivityEmit ({ item, type }) {
      this.Tonextpage(item, type)
    }
  }

}
</script>

<style lang="scss" scoped>
  .container {
    /*轮播图模块*/
    .indexbanner {
      height: 435px;
      display: flex;
      justify-content: space-between;

      .indexbannertype {
        display: inline-block;
        width: 250px;
        background-color: #fff;
        padding: 9px 0;
        height: 435px;
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
            display: inline-block;
            white-space: nowrap;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;

            a {
              font-weight: 400;
              color: #333333;
            }
          }

          .activestrong {
            color: #ff5d19;
          }

          img {
            width: 12px;
            height: 12px;
          }
        }

        .catelist:hover {
          strong a {
            color: #FF5D19;
          }
        }

        .cateselectbox {
          position: absolute;
          width: 1139px;
          height: 425px;
          background-color: #F3F4F6;
          left: 250px;
          top: 9px;
          z-index: 99;
          padding-left: 15px;

          .selectcontent::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            /**/
          }

          .selectcontent::-webkit-scrollbar-track {
            background: rgb(239, 239, 239);
            border-radius: 2px;
          }

          .selectcontent::-webkit-scrollbar-thumb {
            background: #bfbfbf;
            border-radius: 10px;
          }

          .selectcontent::-webkit-scrollbar-thumb:hover {
            background: #333;
          }

          .selectcontent::-webkit-scrollbar-corner {
            background: #179a16;
          }

          .selectcontent {
            display: flex;
            background-color: #fff;
            width: 1150px;
            padding: 20px 26px;
            justify-content: space-between;
            height: 425px;
            overflow-y: scroll;

            .selectleft {
              width: 1020px;

              h5 a {
                height: 22px;
                font-size: 16px;
                font-weight: 500;
                text-align: left;
                color: #ff5d19;
                line-height: 22px;
                margin-bottom: 10px;
              }

              section {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                h6 {
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

                  a {
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: left;
                    color: #333333;
                    line-height: 30px;
                    color: #333333;
                    font-style: normal;
                  }

                  a:hover {
                    color: #FF5D19;
                  }
                }

              }

            }

            .selectright {
              width: 130px;

              img {
                width: 120px;
                height: 120px;
              }
            }
          }
        }
      }

      .indexbannercarser {
        width: 880px;
        margin-top: 9px;
        height: 425px;
        cursor: pointer;

        img {
          width: 880px;
          height: 425px;
        }
      }

      .indexbannermar {
        margin-top: 10px;
        font-size: 0;
        width: 250px;
        height: 424px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

        img {
          width: 250px;
          height: 135px;
          cursor: pointer;
        }
      }
    }

    /*秒杀模块*/
    .indexflash {
      .indexflashtitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 35px 0;

        .indexflashtitleleft {
          font-size: 24px;
          font-weight: 500;

          strong {
            color: #ea2222;
            margin-left: 15px;

            b {
              font-size: 24px;
              font-weight: 700;
              color: #ffffff;
              display: inline-block;
              /*width: 33px;*/
              height: 26px;
              padding: 0 5px;
              line-height: 26px;
              text-align: center;
              background: #da0103;
              border-radius: 4px;
            }
          }

          span {
            font-size: 13px;
            color: #333333;
          }
        }

        .indexflashtitleright {
          font-size: 16px;
          color: #666666;
          cursor: pointer;

          strong {
            font-weight: normal;
            display: inline-block;
            vertical-align: middle;
          }

          img {
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-left: 5px;
          }
        }

      }

      .comcontent {
        .demo-carousel {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;

          .demo-carousel-item:nth-child(1) {
            margin-left: 0;
          }

          .demo-carousel-item {
            margin-left: 20px;
          }
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
    .hotwordbox{
      p{
        height: 40px;
        line-height: 40px;
      }
      a{
        color: #999999;
        font-size: 12px;
        margin-right: 15px;
      }
    }
  }

  .selectitem-title {
    font-size: 16px;
    line-height: 22px;
    color: #ff5d19;
    font-weight: 500;
    margin: 5px 0;
  }
</style>
