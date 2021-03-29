<template>
  <div class="specialcom">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ getLanguageData.indexPage.special }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <section class="comcontent">
      <div v-for="(item,index) in specialList" :key="index">
        <img :src="getImageBasePath + item.imageUrl" @click="specialEditionEmit(item,item.linkType)" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Specialcom',
  computed: {
    ...mapGetters(['getImageBasePath', 'getLanguageData'])
  },
  props: {
    specialList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    specialEditionEmit (item, type) {
      this.$emit('specialEditionEmit', {
        item,
        type
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .specialcom {
    margin-top: 37px;
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
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 30px 26px;
      img{
        width: 438px;
        height: 305px;
        cursor: pointer;
      }
    }
  }
</style>
