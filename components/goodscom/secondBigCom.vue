<template>
  <section v-if="goodsItem && goodsItem.id" class="secondbigcom" @click="goTurn">
    <div class="comleft">
      <img :src="getImageBasePath+ goodsItem.goodsSearchImage" :alt="goodsItem.goodsTitle">
    </div>
    <div class="comright">
      <h5>{{ goodsItem.goodsTitle }}</h5>
      <div class="pricebox">
        <section>
          <span> {{ goodsItem.activityPrice }} </span><span style="font-size:12px;">円</span>
          <span v-show="goodsItem.activityPrice!=goodsItem.marketPrice">{{ goodsItem.marketPrice }} </span><span v-show="goodsItem.activityPrice!=goodsItem.marketPrice" style="font-size:12px;">円</span>
        </section>
        <section>
          <!--          {{ goodsItem.freightTemplateFreeFlag===1?getLanguageData.indexPage.feeshop:getLanguageData.indexPage.needshop }}-->
          {{ goodsItem.freightTemplateFreeFlag===1?getLanguageData.indexPage.feeshop:'' }}
        </section>
      </div>
      <div class="marketbox">
        <span v-if="goodsItem.discountActivitys===1" class="flash">{{ getLanguageData.market.flash }}</span>
        <div v-if="goodsItem.reductionActivity && goodsItem.reductionActivity.length" class="reduce">
          <div v-for="(reduceitem,index) in goodsItem.reductionActivity" :key="index">
            <div v-if="reduceitem.reductionStatus===1">
              <span v-for="(ruleItem,ruleindex) in reduceitem.ruleList" v-show="ruleindex===0" :key="ruleindex">
                {{ getLanguageData.market.reduce.replace('M',ruleItem.ruleRequirement).replace('N', ruleItem.ruleDiscount) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="starbox">
        <img v-for="i in Math.floor(goodsItem.score)" :key="i" src="@/assets/images/goods/star.png" alt="">
        <img v-if="Math.floor(goodsItem.score) !== goodsItem.score" src="@/assets/images/goods/half.png" alt="">
        <img v-for="i in (5 - Math.ceil(goodsItem.score))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
        <span>{{ goodsItem.score }}</span>
        <span>( {{ goodsItem.commentCount }} )</span>
      </div>
      <div class="storebox">
        <img src="@/assets/images/index/store.png" alt="">
        <span> {{ goodsItem.storeName }}</span>
      </div>
      <div class="btnbox">
        <p>
          {{ getLanguageData.market.buynow }}
          <!--          <nuxt-link :to="'/product/'+goodsItem.id">-->
          <!--            {{ getLanguageData.market.buynow }}-->
          <!--          </nuxt-link>-->
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SecondBigCom',
  props: ['goodsItem'],
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  methods: {
    goTurn () {
      this.$router.push('/product/' + this.goodsItem.id)
    }
  }
}
</script>

<style scoped lang="scss">
.secondbigcom{
  margin-top: 21px;
  width: 690px;
  height: 300px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .comleft{
    margin-right: 30px;
    img{
      width: 260px;
      height: 260px;
    }
  }
  .comright{
    width: 356px;
    h5{
      height: 60px;
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      line-height: 30px;
      letter-spacing: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .pricebox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #999999;
      padding: 7px 0 12px 0;
      section:nth-of-type(1){
        span:nth-of-type(1){
          font-size: 24px;
          color: #FF5D19;
        }
        span:nth-of-type(2){
          color: #FF5D19;
          margin-right: 20px;
        }
        span:nth-of-type(3){
          text-decoration:  line-through;
        }
      }
    }
    .marketbox{
      font-size: 12px;
      .flash{
        display: inline-block;
        vertical-align: middle;
        padding: 3px 6px;
        color: #FFFFFF;
        background-color: #FF5D19;
        border-radius: 2px;
      }
      .reduce{
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #1491ff;
        border-radius: 2px;
        padding: 3px 6px;
        color: #1491FF;
      }
    }
    .starbox{
      margin-top: 12px;
      img{
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 3px;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        font-size: 13px;
        font-weight: 500;
        color:#EC980F;
        margin-left: 10px;
      }
    }
    .storebox{
      margin-top: 14px;
      img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span{
        margin-left: 7px;
        vertical-align: middle;
        display: inline-block;
        width: 320px;
        font-size: 14px;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .btnbox{
      text-align: right;
      margin-top: 21px;
      p{
        display: inline-block;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: linear-gradient(314deg,#ff5d19 5%, #ffbb5c 87%);
        border-radius: 20px;
        padding: 0 37px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        /*a {*/
        /*  color: #ffffff;*/
        /*}*/
      }
    }
  }
}
</style>
