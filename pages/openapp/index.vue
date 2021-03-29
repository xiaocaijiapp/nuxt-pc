<template>
  <div class="openapp">
    <!-- 下载app弹窗 -->
    <Modal
        width="400"
        v-model="appModel"
        :ok-text="getLanguageData.emailText.sureButton"
        :cancel-text="getLanguageData.receiptText.cancelBtn"
        @on-ok="sureAppModel"
        @on-cancel="closeAppModel">
        <div style="text-align:center;">
          <img
            style="width: 120px;height: 120px;margin-top:50px;"
            src="@/assets/images/layout/code.png"
            alt=""
          >
          <p>{{getLanguageData.storeText.plaDownLoadApp}}</p>
        </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'openapp',
  data () {
    return {
      appModel: true
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath'
    })
  },
  mounted () {
  },
  methods: {
    sureAppModel () {
      this.appModel = false
      this.$router.push('/product/' + this.$route.query.productid + '?shareIntegralId=' + this.$route.query.shareIntegralId)
    },
    closeAppModel () {
      this.appModel = false
      this.$router.push('/product/' + this.$route.query.productid + '?shareIntegralId=' + this.$route.query.shareIntegralId)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
