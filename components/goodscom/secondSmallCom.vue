<template>
  <section v-if="goodsItem && goodsItem.id" class="secondsmallcom" @click="goTurn">
    <div class="topimg">
      <img :src="getImageBasePath+ goodsItem.goodsSearchImage" :alt="goodsItem.goodsTitle">
    </div>
    <h5>{{ goodsItem.goodsTitle }}</h5>
    <div class="pricebox">
      <section>
        <span> {{ goodsItem.activityPrice }} </span><span style="font-size:12px;">円</span>
        <span v-show="goodsItem.activityPrice!=goodsItem.marketPrice">{{ goodsItem.marketPrice }} </span><span v-show="goodsItem.activityPrice!=goodsItem.marketPrice" style="font-size:12px;">円</span>
      </section>
      <section>
        <!--        免运费-->
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
    <div class="btnbox">
      <p>
        {{ getLanguageData.market.buynow }}
        <!--        <nuxt-link :to="'/product/'+goodsItem.id">-->
        <!--          {{ getLanguageData.market.buynow }}-->
        <!--        </nuxt-link>-->
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SecondSmallCom',
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
  .secondsmallcom {
    margin: 20px 10px;
    display: inline-block;
    width: 264px;
    height: 439px;
    background-color: #fff;
    padding: 20px;

    .topimg {
      img {
        width: 224px;
        height: 225px;
      }
    }

    h5 {
      font-size: 13px;
      text-align: left;
      font-weight: 400;
      color: #333333;
      letter-spacing: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 10px 0 6px 0;
    }

    .pricebox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #999999;
      padding: 0px 0 6px 0;

      section:nth-of-type(1) {
        span:nth-of-type(1) {
          font-size: 20px;
          color: #FF5D19;
        }

        span:nth-of-type(2) {
          color: #FF5D19;
          margin-right: 11px;
        }

        span:nth-of-type(3) {
          text-decoration: line-through;
        }
      }
    }

    .marketbox {
      font-size: 12px;
      margin: 5px 0;

      .flash {
        height: 22px;
        line-height: 22px;
        padding: 3px 6px;
        color: #FFFFFF;
        background-color: #FF5D19;
        border-radius: 2px;
      }

      .reduce {
        span{
          border: 1px solid #1491ff;
          border-radius: 2px;
          height: 22px;
          line-height: 22px;
          padding: 3px 6px;
          color: #1491FF;
        }

      }
    }

    .btnbox {
      text-align: center;
      margin-top: 16px;

      p {
        display: inline-block;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: linear-gradient(314deg, #ff5d19 5%, #ffbb5c 87%);
        border-radius: 20px;
        padding: 0 37px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;

        a {
          color: #ffffff;
        }
      }
    }
  }
</style>
