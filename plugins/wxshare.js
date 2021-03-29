import Vue from 'vue'
import wx from 'weixin-js-sdk'
Vue.prototype.$wechat = wx

const wechatShare = {
  install (Vue) {
    Vue.prototype.wxShare = function (shareData, url) {
      this.$axios
        .get('/starday-user/user/wechat/getWeChatConfigVo', {
          // 请求配置
          params: {
            url // 根据后台配置填写
          }
        })
        .then((res) => {
          const Data = res.data
          this.$wechat.config({
            debug: false,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          })
          this.$wechat.checkJsApi({
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
            success (res) {
              alert(JSON.stringify(res))
            }
          })
        })
      // this.$wechat.ready(() => {
      //   // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
      //   this.$wechat.updateAppMessageShareData({
      //     title: shareData.title,
      //     desc: shareData.desc,
      //     link: shareData.url,
      //     imgUrl: shareData.image,
      //     success () {
      //       // 设置成功
      //     },
      //     cancel () {
      //       console.log('分享取消')
      //     }
      //   })
      //   // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
      //   this.$wechat.updateTimelineShareData({
      //     title: shareData.title,
      //     desc: shareData.desc,
      //     link: shareData.url,
      //     imgUrl: shareData.image,
      //     success () {
      //       // 设置成功
      //     },
      //     cancel () {
      //       console.log('分享取消')
      //     }
      //   })
      // })
    }
  }
}

Vue.use(wechatShare)
