<template>
  <section class="goodsreccom">
    <Carousel loop arrow="always" dots="none" class="comcontent carousel">
      <CarouselItem>
        <div class="demo-carousel">
          <recommend v-for="(item,index) in goodsData" :key="index" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <recommend v-for="(item,index) in goodsData" :key="index" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <recommend v-for="(item,index) in goodsData" :key="index" />
        </div>
      </CarouselItem>
    </Carousel>
  </section>
</template>

<script>
import recommend from '../goodscom/recommend'
export default {
  name: 'Personalrecom',
  components: {
    recommend
  },
  data () {
    return {
      goodsData: [{}, {}, {}, {}, {}, {}]
    }
  }
}
</script>

<style scoped lang="scss">
.goodsreccom{
  /*margin-top: 37px;*/
  .comtitle {
    text-align: center;
    img{
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }
    strong{
      display: inline-block;
      vertical-align: middle;
      margin: 0 24px;
    }
  }
  .comcontent{
    /*margin-top: 28px;*/
    padding: 20px 0 20px 20px;
    background-color: #fff;
    white-space: nowrap;
  }
}
</style>
