<template>
  <div class="seo-container">
    <div class="list">
      <a v-for="(item, index) in rows" :key="index" class="a-link" :href="item.categoryId ? getLOCATIONORIGIN + 'cate/' + item.categoryId : getLOCATIONORIGIN + 'search/product/' + item.word + '/1'" @click.prevent="()=> false">
        <span class="link-text" @click="toNextPage(item)">{{ item.word }}</span>
      </a>
    </div>
    <!--    <div class="list">-->
    <!--      <a v-for="(item, index) in rows" :key="index" class="a-link" :href="getLOCATIONORIGIN + 'search/product/' + item + '/1'" @click.prevent="()=> false">-->
    <!--        <span class="link-text" @click="$router.push('/search/product/' + item + '/1')">{{ item }}</span>-->
    <!--      </a>-->
    <!--    </div>-->
    <div class="paging">
      <Pagination :total="totalRows" :current-page="page" :display="200" @pageChange="pageChange" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../../../components/pagination/Pagination'
export default {
  name: 'PageNo',
  components: {
    Pagination
  },
  async asyncData ({ params, $axios }) {
    const page = params.pageNo * 1
    const { data: { rows, totalPage, totalRows } } = await $axios.post('/starday-elasticsearch/seo/search/aggregation', { pageNo: page, pageSize: 200 })
    return {
      page,
      rows,
      totalPage,
      totalRows
    }
  },
  created () {
    console.log(this.rows)
  },
  head () {
    return {
      title: 'Starday All Searches'
    }
  },
  computed: {
    ...mapGetters(['getLOCATIONORIGIN'])
  },
  methods: {
    pageChange (e) {
      this.$router.push('/sitemap/searches/' + e)
    },
    toNextPage ({ categoryId, word }) {
      if (categoryId) {
        this.$router.push('/cate/' + categoryId)
      } else {
        this.$router.push('/search/product/' + word + '/1')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.seo-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  .list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    padding: 10px 0px;
    .a-link {
      text-decoration: none;
      font-size: 16px;
      color: #2D8cF0;
    }
  }
  .paging {
    display: flex;
    align-items: center;
    .a-link-active {
      border-color: #2d8cf0!important;
      color: #2d8cf0!important;
    }
    .a-link{
      text-decoration: none;
      font-size: 16px;
      margin: 0 8px;
      width: 30px;
      height: 30px;
      border: 1px solid #dcdee2;
      text-align: center;
      line-height: 30px;
      border-radius: 6px;
      color: #515a6e;
      background: #ffffff;
      display: inline-block;
    }
    .a-link:hover{
      border-color: #2d8cf0;
      color: #2d8cf0;
    }
    .a-link:first-child{
      margin-left: 0;
    }
    .a-link:last-child{
      margin-right: 0;
    }
    .arrow-l,.arrow-r{
      /*cursor: not-allowed;*/
      width: 30px;
      height: 30px;
      background: #ffffff;
      color: #2A9A2E;
      text-decoration: none;
      display: inline-block;
      border: 1px solid #dcdee2;
      text-align: center;
      border-radius: 6px;
      line-height: 30px;
    }
  }
}
</style>
