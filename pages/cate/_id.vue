<template>
  <div class="catepage">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.searchPage.searchproduct }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="main">
      <section class="left">
        <!--        相关类别-->
        <div class="related_categories">
          <strong class="title">{{ getLanguageData.indexPage.Relatedcategories }}</strong>
          <div class="related_content_tree">
            <Tree :data="treeData" :render="renderContent" @on-select-change="selectChange" />
          </div>
          <div v-if="treeshow">
            {{ getLanguageData.placeOrder.lookmore }}
          </div>
        </div>
        <!--        热卖排行-->
        <div v-if="hotProData.length > 0" class="sell_out">
          <strong class="title">{{ getLanguageData.indexPage.Sellingout }}</strong>
          <div v-for="(item,index) in hotProData" :key="index" class="sell_out_list" @click="tonextpage(item , 3)">
            <div class="list-item">
              <img class="item-img" :src="getImageBasePath + item.goodsSearchImage" :alt="item.goodsTitle">
              <h3><a :href="getLOCATIONORIGIN + 'product/' + item.id" :title="item.goodsTitle"><strong class="item-title">{{ item.goodsTitle }}</strong></a></h3>
              <div class="item-price">
                <span>{{ item.activityPrice }} <span style="font-size:12px;">円</span></span>
                <span v-show="item.activityPrice!=item.marketPrice">{{ item.marketPrice }} <span style="font-size:12px;">円</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="right">
        <div v-if="specListData.length > 0" class="spec">
          <div v-for="(item,index) in specListData" :key="index" class="specbox">
            <div class="spectitle">
              {{ item.specNameJp }}
            </div>
            <div class="speccontent" :class="moreIndex === index ? 'autoH' : ''">
              <div v-for="(spec, specIndex) in item.valueList" :key="spec.id" class="specitem" :title="spec.valueNameJp" @click="changeRadio(index, specIndex)">
                <img v-if="spec.checked" class="item-img" src="~assets/images/index/change.png" alt="">
                <img v-else class="item-img" src="~assets/images/index/nochange.png" alt="">
                <span class="item-title">{{ spec.valueNameJp }}</span>
              </div>
            </div>
            <div v-if="item.valueList.length > 4" class="lookmore" @click="lookmore(index)">
              <span v-if="moreIndex === ''">{{ getLanguageData.goodsText.showOff }}</span>
              <span v-else-if="moreIndex === index">{{ getLanguageData.goodsText.putAway }}</span>
              <span v-else>{{ getLanguageData.goodsText.showOff }}</span>
              <img v-if="moreIndex === ''" src="~assets/images/goods/down.png" alt="">
              <img v-else-if="moreIndex === index" src="~assets/images/goods/show.png" alt="">
              <img v-else src="~assets/images/goods/down.png" alt="">
            </div>
          </div>
        </div>
        <div v-if="listData.length > 0" class="filter">
          <div :class="sorted === -1? 'activeEle' : ''" @click="descChange(-1, 'desc')">
            {{ getLanguageData.searchPage.allsort }}
          </div>
          <div class="ml" :class="sorted == 0? 'activeEle' : ''" @click="descChange(0, 'desc')">
            {{ getLanguageData.searchPage.sale }}
          </div>
          <div class="ml" :class="sorted == 5? 'activeEle' : ''" @click="descChange(5, 'desc')">
            {{ getLanguageData.searchPage.credit }}
          </div>
          <div class="priceSelect ml">
            <div :class="sorted == 1? 'activeEle' : ''" @click="descChange(1, 'desc')">
              {{ getLanguageData.searchPage.price }}
            </div>
            <div class="priceSelectbox">
              <div class="uping" @click="descChange(1,'asc')">
                <img v-if="sorted===1 && sortOrder==='asc'" src="~/assets/images/store/upac.png" alt="">
                <img v-else src="~/assets/images/store/up.png" alt="">
              </div>
              <div class="downimg" @click="descChange(1,'desc')">
                <img v-if="sorted===1 && sortOrder==='desc'" src="~/assets/images/store/downac.png" alt="">
                <img v-else src="~/assets/images/store/down.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-if="listData.length > 0" class="proclock">
          <div v-for="(k,i) in listData" :key="i">
            <likegood :goods-item="k" />
          </div>
        </div>
        <div v-else>
          <div class="noDataBox">
            <img src="@/assets/images/common/nodata.png" alt="">
            <p>{{ getLanguageData.attentiongoodsText.noData }}</p>
          </div>
        </div>
        <div v-if="listData.length > 0" class="pagebox">
          <pagecom
            :total="totalRows"
            :current-page="pageNo || 1 "
            :all-pages="Math.ceil(totalRows / pageSize)"
            :page-size="pageSize"
            :absolutepath="absolutepathFilter()"
            :and-flag="(absolutepathFilter().indexOf('?')>-1?false:true)"
          />
          <!--          <Page-->
          <!--            :total="totalRows"-->
          <!--            :current="pageNo"-->
          <!--            :page-size="pageSize"-->
          <!--            :page-size-opts="[12,16,22,26]"-->
          <!--            show-sizer-->
          <!--            @on-change="changePageNoHandle"-->
          <!--            @on-page-size-change="pageSizeChange"-->
          <!--          />-->
        </div>
      </section>
    </div>
    <othergoods v-if="listData.length > 0" :goods-list="likesproData" @likeGoodsEmit="watchlikeGoodsEmit" />
    <div v-if="tagData.categoryHtmlDescription" class="descbox">
      <div v-html="tagData.categoryHtmlDescription" />
    </div>
    <div v-if="tagData && tagData.keywordsRelList && tagData.keywordsRelList.length" class="releasesearchbox">
      <h2>{{ keyword }}に関連する検索キーワード</h2>
      <!--      <p>{{ getLanguageData.searchPage.releaseSearch }}</p>-->
      <a v-for="(item,index) in tagData.keywordsRelList" :key="index" :href="getLOCATIONORIGIN + 'search/product/' + item.introduceKeywords +'/1'">{{ item.introduceKeywords }}</a>
    </div>
    <!--    相关类目-->
    <section class="classgroup">
      <strong>{{ getLanguageData.indexPage.associatedcate }}</strong>
      <div class="classgroupitems">
        <span v-for="(item, index) in catesData" :key="index" :class="active == index ? 'actived' : ''" class="group-item" @click="toCate(index, item)">{{ item.word }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import likegood from '@/components/goodscom/likegood'
import othergoods from '@/components/secondclass/othergoods'
import pagecom from '@/components/common/pagecom'
export default {
  name: 'Id',
  layout: 'default',
  middleware: 'auth',
  watchQuery: true,
  async asyncData ({ $axios, params, query, store }) {
    let id = params.id
    // 置顶id是否存在
    let topProducts = []
    if (query.spuIds && query.spuIds.split(',').length) {
      const topIds = await $axios.post('/starday-elasticsearch/search/goodsId', query.spuIds.split(','))
      if (topIds.data && topIds.data.length) {
        topProducts = topIds.data
      }
    }
    // 获取分类树结构数据
    const { data } = await $axios.get('/starday-goods/user/goods_category/getList/' + id)
    const treeData = []
    const obj = {}
    obj.expand = true
    if (data) {
      obj.title = data.categoryJp
      obj.titlezh = data.category
      obj.id = data.id
      obj.disabled = true
    } else {
      obj.title = ''
      obj.id = ''
    }
    const arr = []
    if (data) {
      data.goodsCategoryDtoList.forEach((item) => {
        const obj = {}
        obj.title = item.categoryJp
        obj.titlezh = item.category
        obj.children = []
        obj.id = item.id
        obj.expand = true
        obj.disabled = true
        if (query.cateType && query.cateType === 'secCategoryId') {
          id = item.goodsCategoryDtoList[0].id
        }
        item.goodsCategoryDtoList.forEach((prop) => {
          const obj2 = {}
          if (prop.id === id) {
            obj2.selected = true
          } else {
            obj2.selected = false
          }
          obj2.title = prop.categoryJp
          obj2.titlezh = prop.category
          obj2.expand = true
          obj2.id = prop.id
          obj.children.push(obj2)
        })
        arr.push(obj)
      })
    }
    obj.children = arr
    treeData.push(obj)
    // 处理树结构数据end
    // 获取热卖排行数据
    const hotPro = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: id,
      exclude: [],
      firstCategoryId: '',
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 6,
      secCategoryId: '',
      sortOrder: '',
      sorted: 0,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const hotProData = hotPro.data.rows
    // end
    // 获取可能喜欢的商品
    const likespro = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: id,
      exclude: [],
      firstCategoryId: '',
      firstStoreCategoryId: '',
      keyword: '',
      pageNo: 1,
      pageSize: 30,
      secCategoryId: '',
      sortOrder: '',
      sorted: 3,
      specValueList: [],
      storeCateId: '',
      storeId: '',
      showFavorite: 1
    })
    const likesproData = likespro.data.rows
    // 获取三级类目下的规格列表
    const specList = await $axios.get('/starday-goods/user/goods/cate/spec?cate=' + id)
    const specvalue = store.getters.specvalues
    // console.log('specvalue', specvalue)
    if (specvalue.length > 0) {
      specvalue.forEach((item) => {
        item.valueNames.forEach((prop) => {
          specList.data.forEach((a) => {
            a.valueList.forEach((b) => {
              if (prop === b.valueNameJp) {
                b.checked = true
              } else if (!b.checked) { b.checked = false }
            })
          })
        })
      })
    } else {
      // specList.data.categorySpecList.forEach((item) => {
      //   item.valueList.forEach((prop) => {
      //     prop.checked = false
      //   })
      // })
      specList.data.forEach((item) => {
        item.valueList.forEach((prop) => {
          prop.checked = false
        })
      })
    }
    // console.log('specList.data', specList.data)
    // const specListData = specList.data.categorySpecList
    const specListData = specList.data
    // 获取默认商品列表
    const proList = await $axios.post('/starday-elasticsearch/search/goods', {
      categoryId: id,
      pageNo: query.pageNo || 1,
      pageSize: query.pageSize || 16,
      showFavorite: 1,
      sorted: query.sorted ? (query.sorted < 0 ? '' : query.sorted * 1) : '',
      sortOrder: query.sortOrder || 'asc',
      specValueList: specvalue
    })
    // console.log('proList.data.rows', proList.data.rows)
    // 相关类目
    // const getCates = await $axios.get('/starday-goods/user/seo/goods_category/getCate?cateId=' + id)
    // const catesData = getCates.data
    let catesData
    await $axios.post('/starday-elasticsearch/seo/search/word', {
      categoryId: id,
      pageNo: 1,
      pageSize: 15
    }).then((res) => {
      if (res.code === 200) {
        catesData = res.data.rows
      }
    })
    // 关键词tag
    const tagData = await $axios.get('starday-goods/user/seo/goods_category/keywords?id=' + id)
    if (tagData.data && tagData.data.categoryHtmlDescription) {
      tagData.data.categoryHtmlDescription = tagData.data.categoryHtmlDescription.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<p/g, '<p style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<span/g, '<span style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<strong/g, '<strong style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<h2/g, '<h2 style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<b/g, '<b style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"')
    }
    let keyword = ''
    // const seoData = await $axios.get('/starday-system/user/seo/info/' + id + '/1/5')
    if (!tagData.data || !tagData.data.categoryTitle) {
      tagData.data = {}
      if (treeData && treeData[0] && treeData[0].children && treeData[0].children.length) {
        const _onetitle = treeData[0] ? treeData[0].title : ''
        const _twotitle = treeData[0] ? (treeData[0].children[0] ? treeData[0].children[0].title : '') : ''
        let _title = ''
        const _index = treeData[0].children[0].children.findIndex(function (item) {
          return item.id === id
        })
        if (_index > -1) {
          _title = treeData[0].children[0].children[_index].title
        }
        keyword = _title
        tagData.data.categoryTitle = _title + 'の通販「人気' + _title + '」商品おすすめ｜Starday市場'
        tagData.data.categoryDescription = _title + '通販のページ、人気の' + _title + 'がお得な価格で登場！全品最安値99円から！' + _onetitle + 'から' + _twotitle + 'まで品質豊富に取り揃え。セール商品・送料無料商品も多数！stardayは総合オンラインショッピングサイトです。'
        tagData.data.categoryKeywords = _title + ',' + _title + '通贩,' + _title + ' 安い,' + _title + ' 人気,' + _title + ' おすすめ,starday,starday市場'
      } else {
        tagData.data = {
          categoryTitle: '',
          categoryKeywords: '',
          categoryDescription: ''
        }
      }
    } else if (treeData && treeData[0] && treeData[0].children && treeData[0].children.length) {
      let _title = ''
      const _index = treeData[0].children[0].children.findIndex(function (item) {
        return item.id === id
      })
      if (_index > -1) {
        _title = treeData[0].children[0].children[_index].title
      }
      keyword = _title
    }
    return {
      listData: [...topProducts, ...proList.data.rows],
      pageSize: proList.data.pageSize,
      totalRows: proList.data.totalRows,
      sorted: query.sorted ? query.sorted * 1 : -1,
      sortOrder: query.sortOrder || '',
      pageNo: proList.data.pageNo || 1,
      specvalarr: specvalue,
      id,
      treeData,
      hotProData,
      specListData,
      likesproData,
      catesData,
      keyword,
      // seoData: seoData.data,
      tagData: tagData.data
    }
  },
  head () {
    const vm = this
    return {
      title: vm.tagData.categoryTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: vm.tagData.categoryDescription
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: vm.tagData.categoryKeywords
        }
      ],
      link: [
        {
          hid: 'canonical',
          ref: 'canonical',
          href: 'https://www.starday.jp/cate/' + vm.$route.params.id
        },
        {
          hid: 'alternate',
          ref: 'alternate',
          media: 'only screen and (max-width: 640px)',
          href: 'https://m.starday.jp/cate/' + vm.$route.params.id
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'getImageBasePath', 'getLanguageData', 'specvalues', 'getLOCATIONORIGIN'])
  },
  comments: {
    likegood,
    othergoods,
    pagecom
  },
  data () {
    return {
      specval: [],
      active: '',
      treeshow: false,
      moreIndex: '',
      timeout: null
    }
  },
  mounted () {
    // console.log(this.tagData)
    // const divH = document.getElementsByClassName('related_content_tree')[0].clientHeight
    // const relatedH = document.getElementsByClassName('ivu-tree')[0].clientHeight
    // if (relatedH > divH) {
    //   this.treeshow = true
    // }
  },
  methods: {
    ...mapMutations(['setSpecValues']),
    // 规格选择数据处理
    changeRadio (index, specindex) {
      const _this = this
      if (_this.specListData[index].valueList[specindex].checked) {
        _this.specListData[index].valueList[specindex].checked = false
        const _index = _this.specvalarr.findIndex((item) => {
          return item.specName === _this.specListData[index].specNameJp
        })
        const sindex = _this.specvalarr[_index].valueNames.findIndex((item) => {
          return item === _this.specListData[index].valueList[specindex].valueNameJp
        })
        _this.specvalarr[_index].valueNames.splice(sindex, 1)
        if (_index > -1 && _this.specvalarr[_index].valueNames.length <= 0) {
          _this.specvalarr.splice(_index, 1)
        }
      } else {
        _this.specListData[index].valueList[specindex].checked = true
        const _index = _this.specvalarr.findIndex((item) => {
          return item.specName === _this.specListData[index].specNameJp
        })
        const obj = {}
        if (_index > -1) {
          this.specvalarr[_index].valueNames.push(_this.specListData[index].valueList[specindex].valueNameJp)
        } else {
          obj.specName = _this.specListData[index].specNameJp
          obj.valueNames = []
          obj.valueNames.push(_this.specListData[index].valueList[specindex].valueNameJp)
          this.specvalarr.push(obj)
        }
      }
      this.setSpecValues(this.specvalarr)
      if (this.timeout) { return }
      this.timeout = setTimeout(() => {
        this.$router.push(location.pathname + '?sortOrder=' + this.sortOrder + '&sorted=' + this.sorted + '&pageNo=' + this.pageNo + '&pageSize=' + this.pageSize + '&specValueList=' + Math.floor(Math.random() * 100))
        this.timeout = null
      }, 500)
    },
    lookmore (index) {
      if (this.moreIndex === index) {
        this.moreIndex = ''
      } else {
        this.moreIndex = index
      }
    },
    // toCate (index, { categoryId, word }) {
    //   this.active = index
    //   if (categoryId) {
    //     this.$router.push('/cate/' + categoryId)
    //   } else {
    //     this.$router.push('/search/product/' + word + '/1')
    //   }
    //   this.setSpecValues([])
    // },
    toCate (index, id) {
      this.active = index
      this.$router.push({ path: `/cate/${id}` })
      this.setSpecValues([])
    },
    // 点击树结构子节点出发事件
    selectChange (e) {
      if (e.length === 0) { return }
      this.setSpecValues([])
    },
    // changePageNoHandle (val) {
    //   this.$router.push(location.pathname + '?pageNo=' + val + '&pageSize=' + this.pageSize + '&sortOrder=' + this.sortOrder + '&sorted=' + this.sorted + '&specValueList=' + Math.floor(Math.random() * 100))
    // },
    // pageSizeChange (val) {
    //   this.$router.push(location.pathname + '?pageNo=' + this.pageNo + '&pageSize=' + val + '&sortOrder=' + this.sortOrder + '&sorted=' + this.sorted + '&specValueList=' + Math.floor(Math.random() * 100))
    // },
    // 排序
    descChange (i, str) {
      this.sorted = i
      this.sortOrder = str
      this.$router.push(location.pathname + '?sorted=' + i + '&sortOrder=' + str + '&pageNo=' + this.pageNo + '&pageSize=' + this.pageSize + '&specValueList=' + Math.floor(Math.random() * 100))
    },
    // 跳转下一页
    tonextpage (item, type) {
      // 链接类型 0 空 1二级页 2 店铺 3 商品
      switch (type) {
        case 1:
          // 跳转二级页面
          this.$router.push({
            path: 'secondclass',
            query: {
              id: item.id
            }
          })
          this.setSpecValues([])
          break
        case 2:
          // 跳转店铺主页
          this.$router.push({ path: '/store/' + item.storeId })
          this.setSpecValues([])
          break
        case 3:
          // 商品详情页
          this.$router.push({ path: '/product/' + item.id })
          this.setSpecValues([])
          break
        default:
          // 默认不跳转
          return false
      }
    },
    watchlikeGoodsEmit ({ item, type }) {
      this.tonextpage(item, type)
    },
    absolutepathFilter () {
      // 'cate/' + id + '?pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sorted=' + sorted + '&specValueList=' + Math.floor(Math.random() * 100)"
      const _path = 'cate/' + this.id
      const _hasharr = []
      if (this.sorted && this.sorted >= 0) {
        _hasharr.push('sorted=' + this.sorted)
      }
      if (this.sortOrder) {
        _hasharr.push('sortOrder=' + this.sortOrder)
      }
      if (_hasharr.length) {
        return _path + '?' + _hasharr.join('&')
      } else {
        return _path
      }
      // const _str = 'search/result/product?sorted=' + this.sorted + '&sortOrder=' + this.sortOrder + '&fllow=' + (this.fllow * 1 + 1) + '&wd=' + this.keyword
    },
    renderContent (h, { root, node, data }) {
      const vm = this
      const _htmltab = (node.parent === 1) ? (data.selected ? 'h1' : 'a') : 'span'
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h(_htmltab, { style: { color: '#666666', fontSize: '14px', fontWeight: 400 }, attrs: { href: (node.parent === 1 && !data.selected) ? (vm.getLOCATIONORIGIN + 'cate/' + data.id) : null } }, (vm.getLanguage === 'zh' ? data.titlezh : data.title))
        ])
      ])
    }
  }
}
</script>

<style lang="scss" scoped>

.catepage{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  .container_nav{
    padding: 12px 0px;
  }
  .main{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .left{
      width: 250px;
      height:inherit;
      .related_categories{
        margin-bottom: 20px;
        box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.1);
      }
      .related_categories,.sell_out{
        background: #ffffff;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        box-sizing: border-box;
        align-items: center;
        box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.1);
        .title{
          width: 100%;
          font-size: 16px;
          font-weight: 500;
          color:#333333;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
        }
        .related_content_tree{
          padding: 0 20px;
          width: 100%;
          height: auto;
          overflow: hidden;
          /deep/ .ivu-tree-title{
            display: inline-block;
            max-width: 150px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
      .sell_out_list{
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        .list-item{
          font-size: 0;
          padding-top: 25px;
          .item-img{
            width: 210px;
            height: 210px;
            margin-right: 5px;
          }
          .item-title{
            font-size: 13px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 18px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-top: 16px;
          }
          .item-price{
            line-height: 33px;
            >span:nth-of-type(1){
              height: 21px;
              font-size: 18px;
              font-weight: 700;
              color: #f26936;
              line-height: 21px;
            }
            >span:nth-of-type(2){
              font-size: 13px;
              font-family: DINAlternate, DINAlternate-Bold;
              font-weight: 700;
              text-decoration:  line-through;
              color: #999999;
              line-height: 15px;
            }
          }
        }
      }
    }
    .right{
      width: 1114px;
      height: inherit;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      .spec{
        width: 1114px;
        display: flex;
        flex-flow: column nowrap;
        background: #FFFFFF;
        padding: 15px 21px;
        justify-content: space-between;
        box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.1);
        .specbox:nth-child(1){
          margin-top: 0px;
        }
        .specbox{
          display: flex;
          flex-flow: row nowrap;
          margin-top: 5px;
          width: 100%;
          .spectitle{
            color: #333333;
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            width: 200px;
          }
          .autoH{
            height: auto!important;
          }
          .speccontent{
            flex: 1;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            height: 30px;
            overflow: hidden;
            align-items: flex-start;
            .specitem {
              cursor: pointer;
              width: 200px;
              font-size: 0;
              display: flex;
              align-items: center;
              padding-bottom: 10px;
              span{
                padding-right: 20px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .item-img{
                width: 18px;
                height: 18px;
                vertical-align: middle;
              }
              .item-title{
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                line-height: 20px;
                margin-left: 10px;
              }
            }
          }
          .lookmore{
            /*width: 51px;*/
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            box-sizing: border-box;
            border:1px solid #cccccc;
            border-radius: 2px;
            display: flex;
            align-items: center;
            padding: 5px;
            cursor: pointer;
            img{
              margin-left: 5px;
              width: 10px;
              height: 10px;
            }
          }
          .lookmore:hover{
            color: #FF5D19;
          }
        }
      }
      .filter{
        width: 100%;
        height: 50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-left: 25px;
        background-color: #ffffff;
        margin-top: 20px;
        box-shadow: 0px 4px 7px 0px rgba(0,0,0,0.1);
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #333333;
        div{
          cursor: pointer;
        }
        .ml{
          margin-left: 40px;
        }
        .priceSelect{
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          .priceSelectbox{
            margin-left: 3px;
            cursor: pointer;
            font-size: 0;
          }
          .uping,.downimg{
            cursor: pointer;
            width: 18px;
            height: 10px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            img{
              width: 14px;
              height: 7px;
            }
          }
        }
      }
      .noDataBox{
        text-align: center;
        p {
          font-size: 20px;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #999999;
        }
      }
      .proclock{
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 20px -10px;
        width: 1154px;
      }
      .activeEle{
        color: #FF5D19;
      }
    }
    .pagebox{
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
    }
  }
  .classgroup{
    width: 100%;
    height: 100px;
    margin-top: 20px;
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
  .descbox{
    margin: 20px 0 !important;
    h2{
      font-size: 12px;
      color: #666666;
      font-weight: 400 !important;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
  .releasesearchbox {
    h2 {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      font-weight: normal;
      margin-bottom: 15px;
    }

    a {
      display: inline-block;
      color: #666666;
      font-size: 10px;
      /*width: 280px;*/
      margin-right: 20px;
    }
  }
}
</style>
