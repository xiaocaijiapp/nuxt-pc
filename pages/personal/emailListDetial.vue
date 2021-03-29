<template>
  <div class="emailListDetial">
    <div class="breadbox">
      <!-- {{ listData }} -->
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{ getLanguageData.emailText.personalInfo }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + &quot;personal/emailList&quot;">
          {{ getLanguageData.emailText.emailMessage }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.emailText.emailMessageDet }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="mailDetail">
      <div class="detailbox">
        <p class="mailTittle">
          {{ getLanguageData.emailText.notice }}
        </p>
        <div class="infoItem">
          <p class="itemLabel">
            {{ getLanguageData.goodsText.userSendEmail }}：
          </p>
          <p class="itemName">
            {{ emailDetial.sendUserName }}
          </p>
          <p>&lt;{{ emailDetial.sendMail }}&gt;</p>
        </div>
        <div class="infoItem">
          <p class="itemLabel">
            {{ getLanguageData.emailText.timer }}：
          </p>
          <p>{{ emailDetial.sendTime }}</p>
        </div>
        <div class="infoItem">
          <p class="itemLabel">
            {{ getLanguageData.goodsText.recipient }}：
          </p>
          <p>{{ emailDetial.receiveUserName }}</p>
          <p>&lt;{{ emailDetial.receiveMail }}&gt;</p>
        </div>
        <div class="detailText">
          {{ emailDetial.detail }}
          <div style="margin:20px 0;" v-if="emailDetial.shareInfoList && emailDetial.shareInfoList.length > 0">
            <div class="goodsItem" v-for="(item, index) in emailDetial.shareInfoList" :key="index" @click="routerToLink(item)">
              <span v-if="item.type !== 3">
                {{item.name}}
              </span>
              <span v-if="item.type === 3">
                {{getLanguage === 'zh' ? item.name.split('|')[0] : item.name.split('|')[1]}}
              </span>
            </div>
          </div>
          <div v-if="emailDetial.attachments" class="detailimg">
            <img style="max-width: 500px" v-for="(item,index) in emailDetial.attachments.split(',')" :src="getImageBasePath + item" :key="index" alt="">
          </div>
        </div>
        <div class="footer">
          <Button type="primary" @click="reply">
            {{ getLanguageData.emailText.receiveBtn }}
          </Button>
        </div>
      </div>
    </div>
    <mail
      :send-modal="sendModal"
      :user-info="userInfo"
      :is-pla="isPla"
      :modal-header="modalHeader"
      :is-reply="isReply"
      @closeMail="closeMail"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mail from '@/components/mail/mail.vue'
export default {
  name: 'EmailListDetial',
  layout: 'default',
  middleware: 'auth',
  components: {
    mail
  },
  data () {
    return {
      id: '',
      sendModal: false,
      emailDetial: {},
      userInfo: {},
      isPla: false,
      modalHeader: '',
      isReply: false
    }
  },
  mounted () {
    this.getEmailContent(this.$route.query.id)
    // console.log('local.......', this.$route.query.id)
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getLanguage: 'getLanguage'
    })
  },
  methods: {
    routerToLink (item) {
      switch (item.type * 1) {
        case 1:
          window.open('https://www.starday.jp', '_blank')
          // window.open(process.env.custom_mode === 'pre' ? 'https://www.starday.jp' : 'http://192.168.0.242:8000/', '_blank')
          break
        case 2:
          window.open(('https://www.starday.jp/store/' + item.linkId), '_blank')
          // window.open(process.env.custom_mode === 'pre' ? ('https://www.starday.jp/store/' + item.linkId) : ('http://192.168.0.242:8000/store/' + item.linkId), '_blank')
          break
        case 3:
          if (item.template === 2) {
            window.open(('https://www.starday.jp/promotionpage/promotionpicture/' + item.linkId), '_blank')
            // window.open(process.env.custom_mode === 'pre' ? ('https://www.starday.jp/promotionpage/promotionpicture/' + item.linkId) : ('http://192.168.0.242:8000/promotionpage/promotionpicture/' + item.linkId), '_blank')
          } else {
            window.open(('https://www.starday.jp/promotionpage/promotiongoods/' + item.linkId), '_blank')
            // window.open(process.env.custom_mode === 'pre' ? ('https://www.starday.jp/promotionpage/promotiongoods/' + item.linkId) : ('http://192.168.0.242:8000/promotionpage/promotiongoods/' + item.linkId), '_blank')
          }
          break
        case 4:
          window.open(('https://www.starday.jp/product/' + item.linkId), '_blank')
          // window.open(process.env.custom_mode === 'pre' ? ('https://www.starday.jp/product/' + item.linkId) : ('http://192.168.0.242:8000/product/' + item.linkId), '_blank')
          break
      }
    },
    reply () {
      this.sendModal = true
      this.isReply = true
      this.isPla = false
    },
    // 获取邮件内容
    getEmailContent (id) {
      const vm = this
      const data = {
        id
      }
      vm.$axios({
        url: 'starday-mail/mail/getMailInfo',
        method: 'get',
        params: data
      }).then((res) => {
        if (res.code === 200) {
          vm.emailDetial = res.data
          vm.userInfo = res.data
        }
      })
    },
    closeMail () {
      this.sendModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.emailListDetial{
    .mailDetail {
        // margin-top: 25px;
        .header-title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 5px;
            .backBtn {
            font-size: 13px;
            color: #1890ff;
            margin-left: 10px;
            cursor: pointer;
            }
        }
        .detailbox {
            background: rgba(242, 242, 242, 1);
            padding:0 20px 20px;
            .mailTittle {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
            }
            .infoItem {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 20px;
            color: #000000;
            line-height: 22px;
            .itemLabel {
                width: 60px;
                text-align: right;
                margin-right: 10px;
                line-height: 30px;
            }
            .itemName {
                color: #ffa39e;
            }
            }
            .detailText {
            background: #fff;
            padding: 10px;
            line-height: 24px;
            min-height: 140px;
            margin: 16px 20px;
            color: #999999;
            .goodsItem{
              display: inline-block;
              span{
                margin:0 10px 10px 0;
                color: #1890ff;
                cursor: pointer;
              }
            }
            }
            .attachment {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 15px 0;
            .itemLabel {
                width: 100px;
                text-align: left;
            }
            }
            .footer {
                padding-right: 20px;
                text-align: right;
            }
        }
    }
}
</style>
