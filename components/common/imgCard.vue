<template>
  <div class="imgcad">
    <div class="box">
      <img
        v-if="
        imgUrl &&
          imgUrl.indexOf('.mp4') == -1 &&
            imgUrl.indexOf('.avi') == -1 &&
            imgUrl.indexOf('.rmvb') == -1 &&
            imgUrl.indexOf('.wmv') == -1 &&
            imgUrl.indexOf('.rm') == -1
        "
        :src="imgUrl"
        alt=""
      />
      <video
        v-if="
        imgUrl &&
          imgUrl.indexOf('.mp4') != -1 ||
            imgUrl.indexOf('.avi') != -1 ||
            imgUrl.indexOf('.rmvb') != -1 ||
            imgUrl.indexOf('.wmv') != -1 ||
            imgUrl.indexOf('.rm') != -1
        "
        :src="imgUrl"
        controls="controls"
      >
        {{getLanguageData.emailText.noVideo}}。
      </video>
      <!-- <i class="el-icon-close icondele" size="30" @click="removeImgCard"></i> -->
      <Icon type="md-close" class="icondele" size="30" @click="removeImgCard" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'imgCard',
  props: ['imgUrl'],
  methods: {
    removeImgCard () {
      this.$emit('removeImgCard')
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    })
  }
}
</script>

<style scoped lang="scss">
  .imgcad {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
      width: 520px;
      padding: 20px;
      // background-color: #fff;
      position: relative;
      img {
        max-width: 100%;
        max-height: 90vh;
      }
      video {
        max-width: 100%;
        max-height: 90vh;
      }
      .icondele {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        font-size: 22px;
        color:#fff;
        // border:1px solid #ccc;
        // border-radius: 50%;
      }
    }
  }
</style>
