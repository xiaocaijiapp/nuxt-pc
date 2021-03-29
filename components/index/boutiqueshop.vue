<template>
  <div class="boutiqueshop">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ getLanguageData.indexPage.goodstore }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <Carousel arrow="always" dots="none" class="comcontent carousel">
      <CarouselItem v-for="(item, index) in StoreList" :key="index">
        <div class="demo-carousel">
          <boutique
            v-for="(prop,j) in item"
            :key="j"
            :store-image="prop.imageUrl"
            :type="prop.linkType"
            :item="prop"
            :storename="prop.storeName"
            :score="prop.score"
            :com-count="prop.commentCount"
            @getGoodStore="getGoodStoreInfo"
          />
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import boutique from '../store/boutique'
export default {
  name: 'Boutiqueshop',
  components: {
    boutique
  },
  props: {
    StoreList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    StoreList (val) {}
  },
  computed: {
    ...mapGetters(['getLanguage', 'getLanguageData'])
  },
  methods: {
    getGoodStoreInfo ({ item, type }) {
      this.$emit('fineStore', {
        item,
        type
      })
    }
  }
}
</script>

<style scoped lang="scss">
.boutiqueshop{
  margin-top: 37px;
  .comtitle {
    text-align: center;
    img{
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }
    strong{
      display: inline-block;
      vertical-align: middle;
      margin: 0 24px;
    }
  }
  .comcontent{
    margin-top: 28px;
    padding: 0px 0 20px 0;
    background-color: #fff;
    white-space: nowrap;
  }
}
</style>
