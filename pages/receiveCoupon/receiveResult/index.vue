<template>
  <div>
    <div class="receivepage">
      <div class="container">
        <div v-if="statusType==='1'">
          <img :src="require('assets/images/receivecoupon/QRcode.png')" alt="">
          <div>领取成功！</div>
          <div>快去APP登录使用吧~</div>
        </div>
        <div v-else>
          <img :src="require('assets/images/receivecoupon/QRcode.png')" alt="">
          <div>领取失败！</div>
          <div>去APP更多惊喜在等你哦~~</div>
        </div>
        <div class="login_button">
          <Button round @click="openApp">APPを開く</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'couponLayout',
  data () {
    return {
      statusType: ''
    }
  },
  mounted () {
    const _index = window.location.href.includes('?')
    if (_index > -1) {
      this.statusType = window.location.href.split('?')[1].split('=')[1]
    }
  },
  methods: {
    // 打开APP
    openApp () {
      const u = navigator.userAgent
      const isAndroid = u.includes('Android') || u.includes('Linux') // android终端
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
        window.location.href = 'android://com.saneki.stardays/open'
        setTimeout(function () {
          const hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
          if (typeof hidden === 'undefined' || hidden === false) {
            window.location.href = 'http://download.starday.jp/target.html'
          }
        }, 2000)
      }
      if (isIOS) {
        window.location.href = 'stardaymarket://'
        setTimeout(function () {
          const hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
          if (typeof hidden === 'undefined' || hidden === false) {
            window.location.href = 'http://download.starday.jp/target.html'
          }
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="less">
    @import url('./index');
</style>
