<template>
  <div class="searchproduct">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem><h1>{{ (keyword || '') + '通販' }}</h1></BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="searchbox">
      <section :class="sorted===-1?'activesort':''" @click="changeSortHandle(-1,'desc')">
        {{ getLanguageData.searchPage.allsort }}
      </section>
      <section :class="sorted===0?'activesort':''" @click="changeSortHandle(0,'desc')">
        {{ getLanguageData.searchPage.sale }}
      </section>
      <section :class="sorted===5?'activesort':''" @click="changeSortHandle(5,'desc')">
        {{ getLanguageData.searchPage.credit }}
      </section>
      <section :class="sorted===1?'activesort':''" @click="changeSortHandle(1,'asc')">
        <span>{{ getLanguageData.searchPage.price }}</span>
        <div class="imgupdown">
          <div class="imgupdownbox">
            <div class="uping">
              <img v-if="sorted===1 && sortOrder==='asc'" src="@/assets/images/store/upac.png" alt="">
              <img v-else src="@/assets/images/store/up.png" alt="">
            </div>
            <div class="downimg" @click="changeSortHandle(1,'desc')">
              <img v-if="sorted===1 && sortOrder==='desc'" src="@/assets/images/store/downac.png" alt="">
              <img v-else src="@/assets/images/store/down.png" alt="">
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="!totalRows" class="nonebox">
      <img src="@/assets/images/common/nodata.png" alt="">
      <p>{{ getLanguageData.common.none }}</p>
    </div>
    <div class="searchcontent">
      <likegood v-for="(item,index) in listData" :key="index" :goods-item="item" @refreshHandle="refreshHandle" />
    </div>
    <div v-if="totalRows" class="pagebox">
      <!--      <Page :total="totalRows" :current="pageNo" :page-size="pageSize" @on-change="changePageNoHandle" />-->
      <pagecom
        :total="totalRows"
        :current-page="pageNo || 1 "
        :all-pages="Math.ceil(totalRows / pageSize)"
        :page-size="pageSize"
        :absolutepath="'search/result/product?sorted=' + sorted + '&sortOrder=' + sortOrder + '&fllow=' + (fllow * 1 + 1) + '&wd=' + keyword"
      />
    </div>
    <div v-if="tagData.desc" class="descbox">
      <div v-html="tagData.desc" />
    </div>
    <div v-if="tagData && tagData.tags && tagData.tags.length" class="releasesearchbox">
      <h2>{{ keyword }}に関連する検索キーワード</h2>
      <!--      <p>{{ getLanguageData.searchPage.releaseSearch }}</p>-->
      <a v-for="(item,index) in tagData.tags" :key="index" :href="getLOCATIONORIGIN + 'search/result/product?wd=' + item">{{ item }}</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import likegood from '@/components/goodscom/likegood'
import pagecom from '@/components/common/pagecom'

export default {
  name: 'Index',
  middleware: 'auth',
  watchQuery: ['pageNo', 'sorted', 'sortOrder', 'fllow', 'wd'],
  async asyncData ({ $axios, params, query, error }) {
    try {
      // 置顶id是否存在
      let topProducts = []
      if (query.spuIds && query.spuIds.split(',').length) {
        const topIds = await $axios.post('/starday-elasticsearch/search/goodsId', query.spuIds.split(','))
        if (topIds.data && topIds.data.length) {
          topProducts = topIds.data
        }
      }
      const { data } = await $axios.post('starday-elasticsearch/search/goods', {
        keyword: query.wd || '',
        pageNo: query.pageNo || 1,
        pageSize: query.pageSize || 40,
        showFavorite: 1,
        sorted: query.sorted ? (query.sorted < 0 ? '' : query.sorted * 1) : '',
        sortOrder: query.sortOrder || ''
      })
      // 是否存在关联词tag
      const tagData = await $axios.post('/starday-elasticsearch/search/tags',
        {
          keywords: query.wd,
          sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)]
        }
      )
      if (tagData.data && tagData.data.desc) {
        tagData.data.desc = tagData.data.desc.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<p/g, '<p style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<span/g, '<span style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<strong/g, '<strong style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<h2/g, '<h2 style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"').replace(/<b/g, '<b style="font-size: 12px;color: #666666;font-weight: 400 !important;word-break: break-all;white-space: pre-wrap;"')
      }
      const seoData = {
        title: (query.wd || '') + 'の通販「人気' + (query.wd || '') + '」商品おすすめ｜Starday',
        keyWords: (query.wd || '') + ',' + (query.wd || '') + '通販,starday,starday市場,starday mart,通販,インターネットショッピング,オンラインショッピング"',
        des: (query.wd || '') + '通販のページ、人気の' + (query.wd || '') + 'がお得な価格で登場！全品最安値99円から！セール商品・送料無料商品も多数！stardayは総合オンラインショッピングサイトです。'
      }
      return {
        listData: [...topProducts, ...data.rows],
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        totalRows: data.totalRows,
        sorted: query.sorted ? query.sorted * 1 : -1,
        sortOrder: query.sortOrder || '',
        keyword: query.wd || '',
        fllow: query.fllow || 0,
        seoData,
        tagData: tagData.data
      }
    } catch (e) {
      e.reqUrl = 'starday-elasticsearch/search/goods'
      error(e)
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
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  mounted () {
    if (this.$route.query.wd) {
      this.handleSearchValue(this.$route.query.wd)
    }
  },
  components: {
    likegood,
    pagecom
  },
  methods: {
    ...mapActions({
      handleSearchValue: 'handleSearchValue'
    }),
    changeSortHandle (num, str) {
      this.$router.push(location.pathname + '?sorted=' + num + '&sortOrder=' + str + '&wd=' + this.keyword)
    },
    // changePageNoHandle (val) {
    //   this.$router.push(location.pathname + '?pageNo=' + val + '&sorted=' + this.sorted + '&sortOrder=' + this.sortOrder + '&fllow=' + (this.fllow * 1 + 1) + '&wd=' + this.keyword)
    // },
    refreshHandle () {
      this.$router.push(location.pathname + '?sorted=' + this.sorted + '&sortOrder=' + this.sortOrder + '&pageNo=' + this.pageNo + '&fllow=' + (this.fllow * 1 + 1) + '&wd=' + this.keyword)
    }
  }
}
</script>

<style scoped lang="scss">
  .searchproduct {
    .breadbox {
      h1 {
        font-weight: 600;
        font-size: 14px;
        display: inline-block;
      }
    }

    .searchbox {
      height: 50px;
      line-height: 50px;
      background-color: #fff;

      section {
        margin: 0 25px;
        display: inline-block;
        cursor: pointer;

        span {
          display: inline-block;
          vertical-align: middle;
        }

        .imgupdown {
          display: inline-block;
          white-space: nowrap;
          vertical-align: middle;

          .imgupdownbox {
            margin-left: 5px;

            div {
              line-height: 10px;

              img {
                width: 14px;
                height: 7px;
              }
            }
          }

        }
      }

      .activesort {
        color: #FF5D19;
      }
    }

    .nonebox {
      background-color: #fff;
      text-align: center;
      margin-top: 20px;
      padding: 30px 0;

      img {
        width: 242px;
        height: 242px;
      }
    }

    .searchcontent {
      margin: 20px -10px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    .pagebox {
      padding: 20px 0;
      text-align: right;
    }
    .descbox{
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
