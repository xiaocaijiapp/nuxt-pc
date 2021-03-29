<template>
  <section class="goodsreccom">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong>{{ getLanguageData.indexPage.likeotherpro }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <Carousel loop arrow="always" dots="none" class="comcontent carousel">
      <CarouselItem v-for="(item, index) in swiperlist" :key="index">
        <div class="demo-carousel">
          <recgood
            v-for="(prop, j) in item"
            :key="j"
            :title="prop.goodsTitle"
            :img-url="prop.goodsSearchImage"
            :activity-price="prop.activityPrice"
            :item="prop"
            type="3"
            :market-price="prop.marketPrice"
            @getRecgood="watchSwiperitems"
          />
        </div>
      </CarouselItem>
    </Carousel>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import recgood from '../goodscom/recgood'
import utils from '~/util/index'
export default {
  name: 'Goodsreccom',
  components: {
    recgood
  },
  props: {
    GoodsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'getLanguageData']),
    swiperlist () {
      return utils.chunk(this.GoodsList, 6)
    }
  },
  data () {
    return {
    }
  },
  methods: {
    watchSwiperitems ({ item, type }) {
      this.$emit('likeGoodsEmit', { item, type })
    }
  }
}
</script>

<style scoped lang="scss">
  .goodsreccom{
    margin-top: 37px;
    background-color: #fff;
    padding-top: 35px;
    .comtitle {
      text-align: center;
      img{
        width: 35px;
        height: 35px;
        vertical-align: middle;
      }
      strong{
        font-size: 24px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 24px;
      }
    }
    .comcontent{
      margin-top: 28px;
      padding: 20px 0 20px 20px;

      white-space: nowrap;
    }
  }
</style>
