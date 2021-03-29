<template>
  <div class="imgListShow">
    <div
      v-for="(item,i) in imgList"
      :key="i"
      class="item"
      :style="'width:' + (width || '100') + 'px;height:' + (height || '100') + 'px;line-height:'+((height-20)||84)+'px;text-align:center'"
      @mouseover="current=true"
      @mouseleave="current=false"
    >
      <img :src="item + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
      <div class="mask" v-if="current===true" :style="'width:' + (width || '80') + 'px;height:' + (height || '80') + 'px;line-height:'+(height||80)+'px;text-align:center' + 'border-radius:50%'">
<!--        <Icon type="ios-eye-outline" style="margin-right:20px;" @click="HandleImg('look',i)"/>-->
        <Icon type="ios-trash-outline" @click="HandleImg('dele',i)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImgListShow',
  props: ['imgList', 'imgIndex', 'width', 'height'],
  data () {
    return {
      current: false
    }
  },
  methods: {
    HandleImg (str, i) {
      this.$emit('HandleImg', str, i, this.imgIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
.imgListShow{
    display: inline-block;
    .item{
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.3);
            border-radius: 4px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            color:#fff;
            text-align: center;
            line-height: 100px;
            i{
                cursor: pointer;
            }
        }
    }

}
</style>
