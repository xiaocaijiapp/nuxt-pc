<template>
  <section class="goodsreccom">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ title }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <Carousel arrow="always" dots="none" class="comcontent carousel">
      <CarouselItem v-for="(item, index) in swiperlist" :key="index" class="comcontent-item">
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
    title: {
      type: String,
      default: ''
    },
    GoodsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getLanguage']),
    swiperlist () {
      return utils.goodscalc(this.GoodsList, 6)
    }
  },
  data () {
    return {
    }
  },
  methods: {
    watchSwiperitems ({ item, type }) {
      this.$emit('fineGoodsEmit', { item, type })
    }
  }
}
</script>

<style scoped lang="scss">
.goodsreccom{
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
    padding: 20px 0 20px 20px;
    background-color: #fff;
    white-space: nowrap;
    box-sizing: border-box;
    .comcontent-item{

    }
  }
}
</style>
