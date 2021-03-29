<template>
  <section class="recgood">
    <a class="imgbox"  :href="getLOCATIONORIGIN + 'product/' + item.id"><img :src="getImageBasePath + imgUrl + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="title"/></a>
    <h3><a :href="getLOCATIONORIGIN + 'product/' + item.id" :title="title" >{{ title }}</a></h3>
    <section class="price">
      <span>{{ activityPrice || 0 }}<span style="font-size:12px;">円</span></span>
      <span v-if="marketPrice>activityPrice">{{ marketPrice || 0 }}<span style="font-size:12px;">円</span></span>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Recgood',
  props: ['imgUrl', 'title', 'activityPrice', 'marketPrice', 'item', 'type', 'goodId'],
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  methods: {
    emitRecgood () {
      this.$router.push('/product/' + this.item.id)
      // this.$emit('getRecgood', {
      //   item: this.item,
      //   type: Number(this.type)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.recgood{
  cursor: pointer;
  display: inline-block;
  width: 225px;
  height: 319px;
  background-color: #fff;
  box-sizing: border-box;
  margin-right: 20px;
  img{
    display: block;
    width: 225px;
    height: 225px;
  }
  a{
    white-space: normal;
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
  .imgbox{
    height: 225px;
  }
  .price{
    padding: 10px 0;
    >span:nth-of-type(1){
      height: 21px;
      font-size: 18px;
      font-weight: 700;
      color: #f26936;
      line-height: 21px;
    }
    >span:nth-of-type(2){
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
