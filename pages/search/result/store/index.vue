<template>
  <div class="searchstore">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.searchPage.searchstore }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="searchbox">
      <span :class="sorted===0?'activesort':''" @click="sortHandle(0)">{{ getLanguageData.searchPage.allsort }}</span>
      <span :class="sorted===2?'activesort':''" @click="sortHandle(2)">{{ getLanguageData.searchPage.sale }}</span>
      <span :class="sorted===1?'activesort':''" @click="sortHandle(1)">{{ getLanguageData.searchPage.credit }}</span>
    </div>
    <div v-if="!totalRows" class="nonebox">
      <img src="@/assets/images/common/nodata.png" alt="">
      <p>{{ getLanguageData.common.none }}</p>
    </div>
    <div class="searchcontent">
      <storetem v-for="(item,index) in listData" :key="index" :store-item="item" />
    </div>
    <div v-if="totalRows" class="pagebox">
      <pagecom :total="totalRows" :current-page="pageNo || 1 " :all-pages="Math.ceil(totalRows / pageSize)" :page-size="pageSize" :absolutepath="'search/result/store?sorted=' + sorted + '&sortOrder=' + sortOrder + '&wd=' + storeName" />

      <!--      <Page :total="totalRows" :current="pageNo" :page-size="pageSize" @on-change="changePageNoHandle" />-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import storetem from '@/components/search/storetem'
import pagecom from '@/components/common/pagecom'
export default {
  name: 'Index',
  watchQuery: ['pageNo', 'sorted', 'wd'],
  middleware: 'auth',
  async asyncData ({ $axios, params, query, error }) {
    try {
      const { data } = await $axios.post('starday-elasticsearch/search/store', {
        storeName: query.wd || '',
        pageNo: query.pageNo || 1,
        pageSize: query.pageSize || 40,
        sorted: query.sorted ? query.sorted * 1 : 0,
        sortOrder: 'desc'
      })
      return {
        listData: data.rows,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        totalRows: data.totalRows,
        storeName: query.wd || '',
        sorted: query.sorted ? query.sorted * 1 : 0
      }
    } catch (e) {
      e.reqUrl = 'starday-elasticsearch/search/store'
      error(e)
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  components: {
    storetem, pagecom
  },
  methods: {
    changeSortHandle (num, str) {
      this.$router.push(location.pathname + '?sorted=' + num + '&sortOrder=' + str + '&wd=' + this.keyword)
    }
    // changePageNoHandle (val) {
    //   this.$router.push(location.pathname + '?pageNo=' + val + '&sorted=' + this.sorted + '&sortOrder=' + this.sortOrder + '&pageNo=' + this.pageNo + '&fllow=' + (this.fllow * 1 + 1) + '&wd=' + this.keyword)
    // }
  }
}
</script>

<style scoped lang="scss">
.searchstore{
  .searchbox{
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    span{
      margin: 0 25px;
      cursor: pointer;
    }
    .activesort{
      color: #FF5D19;
    }
  }
  .searchcontent{
    margin: 0 -10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .nonebox{
    background-color: #fff;
    text-align: center;
    margin-top: 20px;
    padding: 30px 0;
    img{
      width: 242px;
      height: 242px;
    }
  }
  .pagebox{
    padding: 20px 0;
    text-align: right;
  }
}
</style>
