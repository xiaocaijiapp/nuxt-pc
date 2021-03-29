<template>
  <div class="flashgood" @click="activityEmit">
    <img v-lazy="getImageBasePath + goodsData.goodsSearchImage+'?x-oss-process=image/resize,w_1000/format,webp'" :alt="goodsData.goodsTitle">
    <h3><a :title="goodsData.goodsTitle"><strong>{{ goodsData.goodsTitle }}</strong></a></h3>
    <div v-if="goodsData.timeState===1" class="process">
      <Progress :percent="percent" hide-info :stroke-color="(Math.floor(goodsData.buyNum/goodsData.stockNum*100)==100 || Math.floor(goodsData.leverNum/goodsData.stockNum*100)==100) ? ['#D8D8D8' , '#D8D8D8'] : ['#FFBB5C', '#FF1A1A']" />
    </div>
    <div v-if="goodsData.timeState === 0" class="item-button">
      {{ getLanguageData.indexPage.willStart }}
    </div>
    <section class="price">
      <span>{{ activePrice }}</span>
      <span style="font-size:12px;">円</span>
      <span v-if="goodsData.marketPrice !== activePrice" style="margin-left: 5px">{{ goodsData.marketPrice }}</span>
      <span v-if="goodsData.marketPrice !== activePrice" style="font-size:12px;">円</span>
    </section>
    <div v-if="goodsData.timeState === 1 && (Math.floor(goodsData.buyNum/goodsData.stockNum*100)==100 || Math.floor(goodsData.leverNum/goodsData.stockNum*100)==100)" class="hasGone">
      <img src="~assets/images/killlist/hasgone.png" alt="">
    </div>
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
      this.$emit('activityEmitData', {
        item: this.goodsData,
        type: 3
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .flashgood{
    display: inline-block;
    width: 264px;
    height: 364px;
    background-color: #fff;
    padding: 20px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    font-size: 0;
    display: flex;
    justify-content: space-between;
    flex-flow: column nowrap;
    .hasGone{
      position: absolute;
      top: 38px;
      left: calc( 100% - 198px);
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      img{
        width: 150px;
        height: 150px;
      }
    }
    img{
      width: 224px;
      height: 224px;
    }
    strong{
      font-size: 13px;
      font-weight: 400;
      height: 56px;
      color: #333333;
      padding: 20px 0px 0px 0px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 18px;
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
    .price{
      span:nth-of-type(1){
        height: 21px;
        font-size: 18px;
        font-weight: 700;
        color: #f26936;
        line-height: 21px;
      }
      span:nth-of-type(2){
        height: 21px;
        font-size: 18px;
        font-weight: 700;
        color: #f26936;
        line-height: 21px;
      }
      span:nth-of-type(3){
        font-size: 13px;
        font-family: DINAlternate, DINAlternate-Bold;
        font-weight: 700;
        text-decoration:  line-through;
        color: #999999;
        line-height: 15px;
      }
      span:nth-of-type(4){
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
