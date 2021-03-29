<template>
  <div class="promotionpictureid">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{getLanguageData.storeText.activePage}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <section class="content" v-if="listData">
      <h5 v-if="listData && listData.titleZh">
        {{ getLanguage ==='zh'?listData.titleZh:listData.titleJa }}
      </h5>
      <section v-for="(item,index) in listData.list" :key="index">
        <div v-if="item.contentType===1" class="imgbox">
          <img :src="getImageBasePath + item.content" alt="">
        </div>
        <div v-if="item.contentType===2" class="wordsbox">
          <strong>{{ item.content }}</strong>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Id',
  async asyncData ({ $axios, params }) {
    const { data } = await $axios.get('/starday-system/user/pc/info/getImageTextPageInfo/' + params.id)
    return { listData: data }
  },
  computed: {
    ...mapGetters({
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  }
}
</script>

<style scoped lang="scss">
  .promotionpictureid {
    .content {
      background-color: #fff;
      padding: 38px 100px;
      h5{
        font-size: 26px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 15px;
      }
      section{
        margin: 15px 0;
        font-size: 16px;
        text-align: justify;
        color: #333333;
        .imgbox{
          text-align: center;
          img{
            /*width: 750px;*/
            max-width: 1100px;
            height: auto;
          }
        }
      }
    }

  }
</style>
