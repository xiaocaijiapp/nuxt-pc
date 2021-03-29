<template>
  <div class="imgListShow">
    <div
      v-for="(item,i) in imgList"
      :key="i"
      class="item"
      :style="'width:' + (width || '100') + 'px;height:' + (height || '100') + 'px;line-height:'+((height-20)||84)+'px;text-align:center'"
      @mouseover="current=i"
      @mouseleave="current=''"
    >
      <img :src="getImageBasePath + item + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
     <div v-if="current===i" class="mask" :style="'width:' + (width || '104') + 'px;height:' + (height || '104') + 'px;line-height:'+(height||104)+'px;text-align:center'">
        <Icon class="icon" type="ios-eye-outline" style="margin-right:20px;" @click="HandleImg('look',i)"/>
        <Icon class="icon" type="ios-trash-outline" @click="HandleImg('dele',i)" />
     </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ImgListShow',
  props: ['imgList', 'imgIndex', 'width', 'height'],
  data () {
    return {
      current: ''
    }
  },
  created () {},
  methods: {
    HandleImg (str, i) {
      this.$emit('HandleImg', str, i, this.imgIndex)
    }
  },
  computed: {
    ...mapGetters({
      getImageBasePath: 'getImageBasePath'
    })
  }
}
</script>
<style lang="scss" scoped>
.imgListShow{
    display: inline-block;
    .item{
        display: inline-block;
        margin: 0 10px;
        position: relative;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100px;
        height: 100px;
        padding: 10px;
        border:1px solid #ddd;
        img{
            width: 100%;
            height: 100%;
        }
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.3);
            border-radius: 4px;
            width: 98px;
            height: 98px;
            color:#fff;
            text-align: center;
            line-height: 100px;
            .icon{
              color: #fff;
              font-size:24px;
                cursor: pointer;
            }
        }
    }

}
</style>
