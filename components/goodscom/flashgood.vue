<template>
  <div class="flashgood" @click="activityEmit">
    <img v-lazy="getImageBasePath + goodsData.goodsSearchImage + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="goodsData.goodsTitle">
    <h3><a :href="getLOCATIONORIGIN + 'product/' + goodsData.id" :title="goodsData.goodsTitle"><strong>{{ goodsData.goodsTitle }}</strong></a></h3>
    <div v-if="goodsData.timeState===1" class="process">
      <Progress :percent="percent" hide-info :stroke-color="['#FFBB5C', '#FF1A1A']" />
    </div>
    <div v-if="goodsData.timeState === 0" class="item-button">
      {{ getLanguageData.indexPage.willStart }}
    </div>
    <section class="price">
      <span>{{ activePrice }}<span style="font-size:12px;">円</span></span>
      <span v-if="goodsData.marketPrice !== activePrice">{{ goodsData.marketPrice }}<span style="font-size:12px;">円</span></span>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Flashgood',
  props: {
    goodsData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['getImageBasePath', 'getLOCATIONORIGIN', 'getLanguageData']),
    percent () {
      if (this.goodsData.buyNum > this.goodsData.leverNum) {
        return this.goodsData.buyNum / this.goodsData.stockNum * 100
      } else {
        return this.goodsData.leverNum / this.goodsData.stockNum * 100
      }
    },
    activePrice () {
      return this.goodsData.marketPrice - Math.round(this.goodsData.marketPrice * (this.goodsData.discount / 100))
    }
  },
  methods: {
    activityEmit () {
      this.$router.push('/product/' + this.goodsData.id)
    }
  }
}
</script>

<style scoped lang="scss">
.flashgood{
  display: inline-block;
  cursor: pointer;
  width: 217px;
  height: 334px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  img{
    width: 177px;
    height: 177px;
  }
  .item-button{
    width: 100%;
    text-align: center;
    line-height: 20px;
    padding-bottom: 6px;
    font-size: 14px;
    margin-top: 4px;
    font-weight: 600;
    color: #1491ff;
  }
  strong{
    font-size: 13px;
    font-weight: 400;
    color: #333333;
    padding: 10px 0 0;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    height: 50px;
  }
  .price{
    padding: 10px 0;
    >span:nth-of-type(1){
      height: 21px;
      font-size: 16px;
      font-weight: 700;
      color: #f26936;
      line-height: 21px;
    }
    >span:nth-of-type(2){
      margin-left: 5px;
      font-size: 13px;
      font-family: DINAlternate, DINAlternate-Bold;
      font-weight: 700;
      text-decoration:  line-through;
      color: #999999;
      line-height: 15px;
    }
  }
}
</style>
