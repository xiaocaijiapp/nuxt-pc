<template>
  <div class="promotiongoodsid">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.storeText.activePage}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <section v-if="listData" class="content">
      <div class="bgimg">
        <img :src="getImageBasePath + listData.backImage" alt="">
      </div>
      <div v-if="listData && listData.list && listData.list.length" class="tabbox">
        <h5
          v-for="(item,index) in listData.list"
          :key="index"
          :class="activeIndex===index?'activeh5':''"
          @click="changeActiveHandle(index)"
        >
          {{ getLanguage ==='zh'?item.cateNameZh:item.cateNameJa }}
        </h5>
      </div>
      <div class="topproductbox">
        <secondBigCom v-for="(item,index) in filterArr(showDataList)" :key="index" :goods-item="propGoodTool(item)" />
      </div>
      <div class="bottomproductbox">
        <secondSmallCom v-for="(item,index) in filterArrShift(showDataList)" :key="index" :goods-item="propGoodTool(item)" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import secondBigCom from '@/components/goodscom/secondBigCom'
import secondSmallCom from '@/components/goodscom/secondSmallCom'
export default {
  name: 'Id',
  async asyncData ({ $axios, params }) {
    const { data } = await $axios.get('/starday-system/user/pc/info/getGoodsPageInfo/' + params.id)
    const _arrIds = []
    let showDataList = []
    if (data.list && data.list.length) {
      data.list.forEach(function (item) {
        item.goodsId.forEach(function (goodItem) {
          _arrIds.push(goodItem.spuId)
        })
      })
      showDataList = data.list[0].goodsId
    } else {
      data.goodsId.forEach(function (item) {
        _arrIds.push(item.spuId)
      })
      showDataList = data.goodsId
    }
    const goodsDataList = await $axios.post('/starday-elasticsearch/search/goodsId', _arrIds)
    return {
      listData: data,
      goodsDataList: goodsDataList.data,
      showDataList
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  created () {},
  methods: {
    changeActiveHandle (index) {
      this.activeIndex = index
      this.showDataList = this.listData.list[index].goodsId
    },
    filterArr (arr) {
      if (!arr || !arr.length) {
        return []
      } else {
        return arr.slice(0, 4)
      }
    },
    filterArrShift (arr) {
      if (!arr || !arr.length || arr.length <= 4) {
        return []
      } else {
        return arr.slice(4)
      }
    },
    propGoodTool (item) {
      if (!item) {
        return ''
      } else {
        const _index = this.goodsDataList.findIndex(function (gooditem) {
          return gooditem.id === item.spuId
        })
        if (_index > -1) {
          const _obj = this.goodsDataList[_index]
          _obj.goodsSearchImage = item.imageUrl || _obj.goodsSearchImage
          return _obj
        } else {
          return {
            goodsSearchImage: item.imgUrl,
            score: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  components: {
    secondBigCom, secondSmallCom
  }
}
</script>

<style scoped lang="scss">
  .promotiongoodsid {
    .content {
      .bgimg {
        img {
          width: 1400px;
          height: 240px;
        }
      }
      .tabbox {
        height: 60px;
        line-height: 60px;
        background-color: #fff;

        h5 {
          display: inline-block;
          padding: 0 25px;
          font-size: 18px;
          font-weight: 400;
          color: #333333;
          cursor: pointer;
        }

        .activeh5 {
          color: #FF5D19;
          position: relative;
        }

        .activeh5::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 5px;
          background-color: #FF5D19;
          left: calc(50% - 10px);
          bottom: 10px;
          border-radius: 3px;
        }
      }
      .topproductbox{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      .bottomproductbox{
        margin: 0 -10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
</style>
