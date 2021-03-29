<template>
  <div class="sendStoreMail">
    <Modal
      v-model="showModal"
      :title="modalHeader"
      footer-hide
      width="900"
      scrollable
      @on-cancel="closeMail"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="140"
      >
        <FormItem :label="getLanguageData.goodsText.recipient + '：'">
          <span>{{userInfo.storeName}}</span>
        </FormItem>
        <FormItem :label="getLanguageData.goodsText.emailTheme + '：'" prop="title">
          <Input
            v-model="formValidate.title"
            :placeholder="getLanguageData.goodsText.intEmailTheme"
            maxlength="50"
            show-word-limit
          />
        </FormItem>
        <FormItem :label="getLanguageData.goodsText.textTitle" prop="text">
          <Input
            v-model="formValidate.text"
            type="textarea"
            maxlength="500"
            show-word-limit
            :placeholder="getLanguageData.goodsText.intTextTitle"
          />
        </FormItem>
        <FormItem :label="getLanguageData.goodsText.annex + '：'" prop="attachments">
          <div style="display:flex;">
            <div>
              <imgListShow
              style="vertical-align: middle;"
              v-if="formValidate.attachments.length > 0"
              :imgList="[...formValidate.attachments]"
              :width="100"
              :height="100"
              @HandleImg="HandleMask"
              />
              <upload
              style="vertical-align: middle;"
                v-if="formValidate.attachments.length < 5"
                @uploadImg="upLoadImgHandle"
              />
              <div
                style="display:flex;width:500px;color:#999;line-height:16px;margin-top:15px;"
              >
                <Icon type="ios-alert" size="16" style="margin-right:10px;" />
                <div>
                  {{getLanguageData.goodsText.maxAddImg}}
                </div>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem :label="getLanguageData.goodsText.userSendEmail + '：'">
          <span>{{getLoginData.stardayEmail}}</span>
        </FormItem>
        <FormItem v-if="isReply" :label="getLanguageData.goodsText.oldEmailTheme + '：'">
          <span></span>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">
            {{getLanguageData.goodsText.sendBtn}}
          </Button>
          <Button style="margin-left: 8px" @click="closeMail">
            {{getLanguageData.goodsText.clostBtn}}
          </Button>
        </FormItem>
      </Form>
    </Modal>
<imgCard v-if="imgUrl" @removeImgCard="imgUrl=''" :imgUrl="getImageBasePath + imgUrl"></imgCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { sendMail, getMailInfo } from '@/assets/js/api/mail/index'
// import upload from '@/components/common/upload.vue'
import imgListShow from '@/components/common/imgListShow.vue'
// import imgcard from '@/components/common/imgCard.vue'
import upload from '@/components/common/upLoad.vue'
import imgCard from '@/components/common/imgCard.vue'
export default {
  name: 'sendStoreMail',
  props: [
    'sendModal',
    'isReply',
    'userInfo',
    'modalHeader',
    'oldMailInfo',
    'isPla',
    'mailAdress'
  ],
  mounted () {
  },
  data () {
    return {
      showModal: false,
      // modalHeader: "联系平台",
      imgUrl: '',
      formValidate: {
        title: '',
        text: '',
        attachments: []
      }
    }
  },
  watch: {
    sendModal (val) {
      this.showModal = val
    },
    oldMailInfo (val) {
      // 获取当前时间
      const nowDate = new Date().getTime()
      this.formValidate.title =
          val.sendUserName +
          ' ' +
          '问题的回复' +
          ' ' +
          this.timestampToTime(nowDate)
    }
  },
  methods: {
    // 关闭预览
    removeImgCard () {
      this.imgUrl = ''
    },
    // 预览或删除
    HandleMask (str, index, i) {
      if (str === 'look') {
        this.imgUrl = this.formValidate.attachments[index]
      } else {
        this.formValidate.attachments.splice(index, 1)
      }
    },
    // 上传
    upLoadImgHandle (url, i) {
      // console.log('url-----', url)
      // this.formValidate.attachments[i] = url
      this.formValidate.attachments.push(url)
      // this.formValidate = JSON.parse(JSON.stringify(this.formValidate))
    },
    // 关闭弹窗
    closeMail () {
      this.formValidate.title = ''
      this.formValidate.text = ''
      this.formValidate.attachments = []
      this.$emit('closeMail')
    },
    // 发送邮件
    handleSubmit () {
      const vm = this
      // console.log('sendMail-----', vm.userInfo)
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          const data = {
            attachments: vm.formValidate.attachments.join(','),
            title: vm.formValidate.title,
            text: vm.formValidate.text,
            receiveMail: vm.mailAdress
          }
          vm.$axios({
            url: 'starday-mail/mail/sendMail',
            method: 'POST',
            data
          }).then((res) => {
            if (res.code === 200) {
              vm.$Message.success(vm.getLanguageData.goodsText.replySuccess)
              vm.formValidate.title = ''
              vm.formValidate.text = ''
              vm.formValidate.attachments = []
              vm.$emit('closeMail')
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLoginData: 'getLoginData'
    }),
    // ...mapState({
    //   Language: state => state.app.Language
    // }),
    ruleValidate () {
      const ruleValidate = {
        title: [
          {
            required: true,
            message: this.getLanguageData.goodsText.mustInt,
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: this.getLanguageData.goodsText.mustInt,
            trigger: 'blur'
          }
        ]
      }
      return ruleValidate
    }
  },
  components: { upload, imgListShow, imgCard }
}
</script>

<style scoped lang="scss">
  .sendStoreMail {
    background-color: #fff;
    padding: 20px;
    .operatebox {
      margin-bottom: 20px;
    }
  }
</style>
