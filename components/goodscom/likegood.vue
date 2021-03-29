<template>
  <section class="likegood" :class="isBorder===1 ? 'border' : ''" @click.prevent="goTogoodDetial">
    <a :href="getLOCATIONORIGIN + 'product/'+goodsItem.id"><img v-lazy="getImageBasePath+ goodsItem.goodsSearchImage + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="goodsItem.goodsTitle"></a>
    <h3 class="likegoodtitle" :title="goodsItem.goodsTitle">
      <a :href="getLOCATIONORIGIN + 'product/'+goodsItem.id" :title="goodsItem.goodsTitle">{{ goodsItem.goodsTitle }}</a>
    </h3>
    <section class="pricebox">
      <div class="price">
        <span> {{ goodsItem.activityPrice }} <span style="font-size:12px;">円</span></span>
        <span v-show="goodsItem.activityPrice!=goodsItem.marketPrice">{{ goodsItem.marketPrice }} <span style="font-size:12px;">円</span></span>
      </div>
      <div class="fei">
        <!--        {{ goodsItem.freightTemplateFreeFlag===1?getLanguageData.indexPage.feeshop:getLanguageData.indexPage.needshop }}-->
        {{ goodsItem.freightTemplateFreeFlag===1?getLanguageData.indexPage.feeshop: '' }}
      </div>
    </section>
    <section class="marketbox">
      <span v-if="goodsItem.flashSaleActivityStates===1" class="flash">{{ getLanguageData.market.flash }}</span>
      <div v-if="goodsItem.reductionActivity && goodsItem.reductionActivity.length" class="reduce">
        <div v-for="(reduceitem,index) in goodsItem.reductionActivity" :key="index">
          <div v-if="reduceitem.reductionStatus===1">
            <span v-for="(ruleItem,ruleindex) in reduceitem.ruleList" v-show="ruleindex===0" :key="ruleindex" class="fullre">
              {{ getLanguageData.market.reduce.replace('M',ruleItem.ruleRequirement).replace('N', ruleItem.ruleDiscount) }}
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="starbox">
      <img v-for="i in Math.floor(goodsItem.score)" :key="i" src="@/assets/images/goods/star.png" alt="">
      <img v-if="Math.floor(goodsItem.score) !== goodsItem.score" src="@/assets/images/goods/half.png" alt="">
      <span v-if="5 - Math.ceil(goodsItem.score)">
        <img v-for="i in (5 - Math.ceil(goodsItem.score))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
      </span>
      <span>{{ goodsItem.score }}</span>
      <span>( {{ goodsItem.commentCount }} )</span>
    </section>
    <section class="storename">
      <div class="left">
        <img src="@/assets/images/index/store.png" alt="">
        <strong>{{ goodsItem.storeName }}</strong>
      </div>
      <div class="right">
        <img v-show="goodsItem.isFollowed===1" src="@/assets/images/index/liked.png" alt="">
        <img v-show="goodsItem.isFollowed!==1" src="@/assets/images/index/like.png" alt="">
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Likegood',
  props: ['goodsItem', 'isBorder'],
  methods: {
    fllowHandle (e, state) {
      e.preventDefault()
      const vm = this
      vm.$axios.post('/starday-goods/user/goods_collection/follow', { spuId: vm.goodsItem.id, state }).then((res) => {
        if (res.code === 200) {
          vm.$Message.success(state ? vm.getLanguageData.searchPage.fllowsuccess : vm.getLanguageData.searchPage.canclefllow)
          vm.$emit('refreshHandle')
        }
      })
    },
    goTogoodDetial () {
      this.$router.push('/product/' + this.goodsItem.id)
    }
  },
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  }
}
</script>

<style scoped lang="scss">
  .likegood {
    display: inline-block;
    width: 264px;
    height: 450px;
    background-color: #fff;
    padding: 20px;
    margin: 0 10px 20px 10px;
    cursor: pointer;
    &.border {
      border: 1px solid #e0e0e0;
    }
    img {
      width: 224px;
      height: 224px;
    }

    .likegoodtitle {
      height: 40px;
      font-size: 13px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      a{
        color: #333333;
      }
    }

    .pricebox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 6px 0 15px 0;

      .price {
        >span:nth-of-type(1) {
          height: 21px;
          font-size: 18px;
          font-weight: 700;
          text-align: left;
          color: #f26936;
          margin-right: 11px;
        }

        >span:nth-of-type(2) {
          height: 16px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: line-through;
          text-align: left;
          color: #999999;
        }
      }

      .fei {
        font-size: 13px;
        font-weight: 400;
        text-align: left;
        color: #999999;
      }
    }

    .marketbox {
      font-size: 12px;

      .flash {
        font-weight: normal;
        display: inline-block;
        vertical-align: middle;
        color: #FFFFFF;
        background-color: #FF5D19;
        padding: 3px 5px;
      }

      .fullre {
        font-weight: normal;
        color: #1491FF;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #1491FF;
        padding: 1px 3px;
        margin-right: 5px;
      }
    }

    .starbox {
      margin: 14px 0 15px 0;

      img {
        width: 17px;
        height: 16px;
        vertical-align: middle;
        margin-right: 5px;
      }

      span {
        display: inline-block;
        font-size: 13px;
        font-weight: 500;
        text-align: left;
        color: #ec980f;
        vertical-align: middle;
        margin-left: 6px;
      }

      span:nth-of-type(2) {
        margin-left: 2px;
      }
    }

    .storename {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        vertical-align: middle;
      }

      strong {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        display: inline-block;
        width: 160px;
        color: #333333;
        vertical-align: middle;
        overflow: hidden;
        height: 20px;
        white-space: nowrap;
        line-height: 20px;
        text-overflow: ellipsis;
      }
    }
  }
</style>
