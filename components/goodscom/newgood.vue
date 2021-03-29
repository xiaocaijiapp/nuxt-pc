<template>
  <div class="newgood" @click="newgoodsprofun">
    <img :src="getImageBasePath + item.goodsSearchImage +'?x-oss-process=image/resize,w_1000/format,webp'" :alt="item.goodsTitle">
    <section>
      <h3><a :href="getLOCATIONORIGIN + 'product/' + item.id" :title="item.goodsTitle"><strong>{{ item.goodsTitle }}</strong></a></h3>
      <span>{{ item.activityPrice }}<span style="font-size:12px;">円</span></span>
      <span v-if="item.marketPrice>item.activityPrice">{{ item.marketPrice }}<span style="font-size:12px;">円</span></span>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Newgood',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['getImageBasePath', 'getLOCATIONORIGIN'])
  },
  methods: {
    newgoodsprofun () {
      this.$router.push('/product/' + this.item.id)
      // this.$emit('getgoodspro', {
      //   item: this.item,
      //   type: 3
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.newgood{
  cursor: pointer;
  background-color: #fff;
  width: 406px;
  height: 230px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  img{
    width: 190px;
    height: 190px;
  }
  section{
    width: 154px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    height: 190px;
    strong{
      white-space: normal;
      font-size: 13px;
      font-weight: 400;
      color: #333333;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 26px;
    }
    >span:nth-of-type(1){
      display: block;
      font-size: 18px;
      font-weight: 500;
      text-align: left;
      color: #ff5d19;
      line-height: 28px;
      padding: 10px 0;
    }
    >span:nth-of-type(2){
    height: 28px;
    font-size: 16px;
    font-weight: 500;
    text-decoration:  line-through;
    text-align: left;
    color: #999999;
    line-height: 28px;
    }
  }
}
</style>
