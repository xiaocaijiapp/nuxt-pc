<template>
  <section @click="goToStore" class="storetem">
    <img v-if="storeItem.logo" v-lazy="getImageBasePath + storeItem.logo + '?x-oss-process=image/resize,w_1000/format,webp'" class="logo" alt="">
    <img v-else src="@/assets/images/store/nologo.png" class="logo" alt="">
    <div class="content">
      <section class="starbox">
        <img v-for="i in (storeItem.score || 0)" :key="i" src="@/assets/images/goods/star.png" alt="">
        <img v-if="Math.floor(storeItem.score || 0) !== (storeItem.score || 0)" src="@/assets/images/goods/half.png" alt="">
        <img v-for="i in (5 - Math.ceil(storeItem.score||0))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
        <span>{{ storeItem.score || 0 }}</span>
        <span>( {{ storeItem.commentCount || 0 }} )</span>
      </section>
      <section class="storename">
        <div class="left">
          <img src="@/assets/images/index/store.png" alt="">
          <strong>{{ storeItem.storeName }}</strong>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Storetem',
  props: ['storeItem'],
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  methods: {
    goToStore () {
      this.$router.push('/store/' + this.storeItem.id)
    }
  }
}
</script>

<style scoped lang="scss">
.storetem{
  width: 264px;
  height: 340px;
  background-color: #fff;
  margin: 20px 10px 0 10px;
  cursor: pointer;
  text-align: center;
  .logo{
    width: 150px;
    height: 150px;
    margin-top: 60px;
  }
  .content{
    text-align: left;
    padding: 20px;
    .starbox {
      text-align: left;
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

}
</style>
