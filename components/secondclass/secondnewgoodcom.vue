<template>
  <div class="newgoodcom">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ getLanguageData.indexPage.newsgood }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <section class="comcontent">
      <div class="comcontentleft" @click="leftGoodsEmitUpData({id:left[0].id},3)">
        <img v-lazy="getImageBasePath+ left[0].goodsSearchImage" alt="">
        <strong>{{ left[0].goodsTitle }}</strong>
        <span>{{ left[0].activityPrice }} </span><span style="font-size:12px;">円</span>
        <span v-show="left[0].activityPrice<left[0].marketPrice">{{ left[0].marketPrice }} </span>
        <span v-show="left[0].activityPrice<left[0].marketPrice" style="font-size:12px;">円</span>
      </div>
      <div class="comcontentright">
        <div v-for="(item,index) in right" :key="index" class="goodsitem" @click="leftGoodsEmitUpData(item,3)">
          <img v-lazy="getImageBasePath + item.goodsSearchImage">
          <div class="pricebox">
            <p>{{ item.goodsTitle }}</p>
            <p><span>{{ item.activityPrice }} </span><span style="font-size:12px;">円</span></p>
            <p v-show="item.activityPrice<item.marketPrice"><span>{{ item.marketPrice }} </span><span style="font-size:12px;">円</span></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Newgoodcom',
  computed: {
    ...mapGetters(['getImageBasePath', 'getLanguageData'])
  },
  props: {
    left: {
      type: Array,
      default () {
        return []
      }
    },
    right: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    leftGoodsEmitUpData (item, type) {
      this.$emit('newgoodsUpData', {
        item,
        type
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .newgoodcom {
    margin-top: 37px;

    .comtitle {
      text-align: center;

      img {
        width: 35px;
        height: 35px;
        vertical-align: middle;
      }

      strong {
        display: inline-block;
        vertical-align: middle;
        margin: 0 24px;
      }
    }

    .comcontent {
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .comcontentleft {
        height: inherit;
        display: inline-block;
        width: 547px;
        background: #FFFFFF;
        font-size: 0;
        height: 730px;
        img{
          width: 547px;
          height:548px;
        }
        strong{
          white-space: normal;
          font-size: 18px;
          font-weight: 400;
          color: #333333;
          margin-top: 24px;
          padding:0 19px;
          margin-bottom: 13px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          line-height: 32px;
        }
        span:nth-of-type(1){
          font-size: 22px;
          font-weight: 500;
          text-align: left;
          color: #ff5d19;
          line-height: 30px;
          margin-left: 19px;
        }
        span:nth-of-type(2){
          font-size: 22px;
          font-weight: 500;
          text-align: left;
          color: #ff5d19;
          line-height: 30px;
          margin-right: 20px;
        }
        span:nth-of-type(3){
          width: 59px;
          height: 28px;
          font-size: 20px;
          font-weight: 400;
          text-decoration:  line-through;
          text-align: left;
          color: #666666;
          line-height: 28px;
        }
        span:nth-of-type(4){
          width: 59px;
          height: 28px;
          font-size: 20px;
          font-weight: 400;
          text-decoration:  line-through;
          text-align: left;
          color: #666666;
          line-height: 28px;
        }
      }

      .comcontentright {
        width: 832px;
        height: 730px;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        & div:nth-of-type(2n){
          margin-left: 20px;
        }
        div:nth-child(3),div:nth-child(4),div:nth-child(5),div:nth-child(6){
          margin-top: 20px;
        }
        .goodsitem{
          width: 406px;
          height: 230px;
          padding: 20px;
          font-size: 0;
          background-color: #FFFFFF;
          box-sizing: border-box;
          display: flex;
          flex-flow: row nowrap;
          img{
            width: 190px;
            height: 190px;
          }
          .pricebox{
            margin-left: 20px;
            text-align: left;
            p:nth-child(1){
              color:#333333;
              line-height: 28px;
              text-align: left;
              font-weight: 500;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            p:nth-child(2){
              color:#ff5d19;
              line-height: 28px;
              text-align: left;
              font-weight: 500;
              font-size: 18px;
            }
            p:nth-child(3){
              text-decoration:line-through;
              color:#999999;
              line-height: 28px;
              text-align: left;
              font-weight: 500;
              font-size: 16px;
            }
            span:nth-child(4){
              text-decoration:line-through;
              color:#999999;
              line-height: 28px;
              text-align: left;
              font-weight: 500;
              font-size: 16px;
            }
          }

        }
      }
    }
  }
</style>
