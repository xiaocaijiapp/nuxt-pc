<template>
  <div class="newgoodcom">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ getLanguageData.indexPage.newsgood }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <section class="comcontent">
      <div class="comcontentleft">
        <img v-for="(item,index) in newGoodsCom" :key="index" :src="getImageBasePath + item.imageUrl" @click="newGoodsLeftFun(item,item.linkType)">
      </div>
      <div class="comcontentright">
        <newgood
          v-for="(item,index) in userNewGoods"
          :key="index"
          class="comcontentrightlist"
          :item="item"
          @getgoodspro="upgoodspro"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newgood from '@/components/goodscom/newgood'

export default {
  name: 'Newgoodcom',
  props: {
    newGoodsCom: {
      type: Array,
      default () {
        return []
      }
    },
    userNewGoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['getImageBasePath', 'getLanguageData'])
  },
  components: {
    newgood
  },
  methods: {
    newGoodsLeftFun (item, type) {
      this.$emit('goodsproleft', {
        item,
        type
      })
    },
    upgoodspro ({ item, type }) {
      this.$emit('goodsproright', {
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
      align-items: center;

      .comcontentleft {
        display: inline-block;
        width: 547px;
        font-size: 0;
        img {
          width: 547px;
          height: 354px;
          cursor: pointer;
        }

        img:nth-of-type(2) {
          margin-top: 21px;
        }
      }

      .comcontentright {
        flex: 1;
        padding-left: 20px;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        .comcontentrightlist{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .comcontentrightlist:nth-child(3),.comcontentrightlist:nth-child(4){
          margin: 20px 0px;
        }
        .comcontentrightlist:nth-of-type(2n){
          margin-left: 19px;
        }
      }
    }
  }
</style>
