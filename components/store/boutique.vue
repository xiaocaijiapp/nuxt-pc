<template>
  <div class="boutique" @click="goodStore">
    <img v-lazy="getImageBasePath + storeImage + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="item.storeName">
    <section class="starbox">
      <img v-for="(item,index) in mstart[0]" :key="index + 'a'" src="~assets/images/index/stara.png" alt="">
      <img v-for="(item,i) in mstart[1]" :key="i+'b'" src="~assets/images/index/starb.png" alt="">
      <img v-for="(item,j) in mstart[2]" :key="j+'c'" src="~assets/images/index/star.png" alt="">
      <span>{{ score }}</span>
      <span>({{ comCount }})</span>
    </section>
    <section class="storename" v-if="isAttentonStore===1" @click="$router.push('/store/' + item.id)">
      <img src="@/assets/images/index/store.png" alt="">
      <strong>{{item.storeName}}</strong>
    </section>
    <section class="storename" v-else>
      <img src="@/assets/images/index/store.png" alt="">
      <!-- <h3><a :href="getLOCATIONORIGIN + 'store/' + item.id" :title="item.storeName"><strong>{{ getLanguage == 'zh' ? item.title : item.titleJa }}</strong></a></h3> -->
      <strong>{{ getLanguage == 'zh' ? item.title : item.titleJa }}</strong>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '~/util/index'
export default {
  name: 'Boutique',
  props: {
    storeImage: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    },
    isAttentonStore: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    storename: {
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default: 0
    },
    comCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'getImageBasePath', 'getLOCATIONORIGIN']),
    // 满星的评价数
    mstart () {
      return utils.mathNum(this.score)
    }
  },
  methods: {
    //  精品店铺点击向上传递数据
    goodStore () {
      this.$emit('getGoodStore', {
        item: this.item,
        type: this.type
      })
    }
  }
}
</script>

<style scoped lang="scss">
.boutique{
  display: inline-block;
  width: 224px;
  height: 319px;
  padding: 20px 10px;
  margin-left: 10px;
  img{
    width: 214px;
    height: 214px;
  }
  .starbox{
    padding: 20px 0;
    img{
      width: 17px;
      height: 16px;
      vertical-align: middle;
    }
    span{
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      text-align: left;
      color: #ec980f;
      vertical-align: middle;
      margin-left: 6px;
    }
    span:nth-of-type(2){
      margin-left: 2px;
    }
  }
  .storename{
    img{
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }
    strong{
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #333333;
      vertical-align: middle;
      display: inline-block;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.boutique:hover {
  cursor: pointer;
}
</style>
