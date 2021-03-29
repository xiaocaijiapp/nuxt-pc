<template>
  <div class="membermodify">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{getLanguageData.storeText.indexPage}}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
          {{getLanguageData.emailText.personalInfo}}
        </BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.cencelText.editMemberInfo}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="personal_container">
      <section class="personal_title">
        {{getLanguageData.cencelText.editMemberInfo}}
      </section>
      <div class="infobox">
        <div class="tabs">
          <div :class="activeIndex===1 ? 'activetab': ''" @click="changeTab(1)">{{getLanguageData.cencelText.userInfo}}</div>
          <div :class="activeIndex===2 ? 'activetab': ''" @click="changeTab(2)">{{getLanguageData.memberText.password}}</div>
        </div>
        <div v-if="activeIndex===1" class="userinfo">
          <Form ref="formValidate" :model="formValidate" :label-width="120">
            <FormItem :label="getLanguageData.memberText.photo" style="margin-left: 10px">
              <div class="img">
<!--                <img :src="getImageBasePath + formValidate.img" alt="" v-if="formValidate.img">-->
                <HeadImgListShow
                  :width="80"
                  :height="80"
                  v-if="formValidate.headImage"
                  :imgList="[getImageBasePath + formValidate.headImage]"
                  @HandleImg="handleImg"></HeadImgListShow>
                <UploadHeadImg
                  @uploadImg="uploadImg"
                  :boxwidth="80"
                  :boxheight="80"
                  v-if="!formValidate.headImage"></UploadHeadImg>
              </div>
            </FormItem>
<!--            <FormItem label="お名前" prop="surname">-->
<!--              <section>入力情報に誤りがあると、パスワード再設定が正しく行えない場合があります，ご自身の氏名をお間違えないように登録してください。</section>-->
<!--              <Row style="margin-top: 15px">-->
<!--                <Col span="5" >-->
<!--                <FormItem prop="surname">-->
<!--                  <span>姓</span><Input v-model="formValidate.surname" style="width: 152px" />-->
<!--                </FormItem>-->
<!--                </Col>-->
<!--                <Col span="19">-->
<!--                <FormItem prop="name">-->
<!--                  <span>名</span><Input v-model="formValidate.name" style="width: 152px" />-->
<!--                </FormItem>-->
<!--                </Col>-->
<!--              </Row>-->
<!--            </FormItem>-->
<!--            <FormItem label="フリガナ" prop="pseudonym">-->
<!--              <section> &lt;全角カタカナのみ&gt; </section>-->
<!--              <Row style="margin-top: 15px">-->
<!--                <Col span="5">-->
<!--                <FormItem prop="pseudonym">-->
<!--                  <span>姓</span><Input v-model="formValidate.pseudonym" style="width: 152px" />-->
<!--                </FormItem>-->
<!--                </Col>-->
<!--                <Col span="19">-->
<!--                <FormItem prop="pseudonymname">-->
<!--                  <span>名</span><Input v-model="formValidate.pseudonymname" style="width: 152px" />-->
<!--                </FormItem>-->
<!--                </Col>-->
<!--              </Row>-->
<!--            </FormItem>-->
            <FormItem :label="getLanguageData.memberText.gender" prop="gender" style="margin-left: 10px">
              <RadioGroup v-model="formValidate.sex">
                <Radio label="2">{{getLanguageData.memberText.gileGender}}</Radio>
                <Radio label="1">{{getLanguageData.memberText.menGender}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="getLanguageData.memberText.birthday" style="margin-left: 10px">
              <DatePicker v-model="formValidate.birthday" type="date" :placeholder="getLanguageData.memberText.selectDay" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem style="margin-top: 100px">
              <Button class="button" type="primary" @click="handleSubmit()">{{getLanguageData.memberText.sureBtn}}</Button>
            </FormItem>
          </Form>
        </div>
        <div class="passwordinfo" v-show="activeIndex===2">
          <section class="pass_title">{{getLanguageData.memberText.editPwd}}</section>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="200" class="password-form">
            <FormItem :label="getLanguageData.memberText.oldPwd" prop="oldPassword">
              <Input v-model="formCustom.oldPassword" type="password" style="width: 416px"/>
            </FormItem>
            <FormItem :label="getLanguageData.memberText.newPwd" prop="newPassword">
              <Input v-model="formCustom.newPassword" type="password" style="width: 416px"/>
            </FormItem>
            <FormItem :label="getLanguageData.memberText.sureNewPwd" prop="confirmPassword">
              <Input v-model="formCustom.confirmPassword" type="password" style="width: 416px"/>
            </FormItem>
            <FormItem>
              <Button class="pass_button" type="primary" @click="confirmSubmitPass('formCustom')">{{getLanguageData.memberText.sureBtn}}</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uploadHeadImg from '@/components/common/uploadHeadImg'
import headImgListShow from '@/components/common/headImgListShow'
import { turnDateType } from '@/assets/js/util'
import Cookie from 'js-cookie'
export default {
  name: 'MemberModify',
  middleware: 'auth',
  components: { uploadHeadImg, headImgListShow },
  data () {
    // const validatePass = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('原密码不能为空'))
    //   }
    // }
    return {
      activeIndex: 1,
      formValidate: {
        // surname: '',
        // name: '',
        // pseudonym: '',
        // pseudonymname: '',
        headImage: '',
        sex: '1',
        birthday: ''
      },
      formCustom: {
        confirmPassword: '',
        newPassword: '',
        oldPassword: ''
      }
    }
  },
  mounted () {
    this.requestMemberInfo()
  },
  methods: {
    changeTab (index) {
      this.activeIndex = index
    },
    requestMemberInfo () {
      const _this = this
      _this.$axios.get('starday-user/user/customer').then((res) => {
        if (res.code === 200) {
          _this.formValidate.headImage = res.data.headImage
          _this.formValidate.sex = res.data.sex === 1 ? '1' : '2'
          _this.formValidate.birthday = res.data.birthday
        }
      })
    },
    handleSubmit () {
      const _this = this
      _this.formValidate.birthday = this.formValidate.birthday ? turnDateType(_this.formValidate.birthday) : ''
      _this.$axios.put('starday-user/user/customer', _this.formValidate).then((res) => {
        if (res.code === 200) {
          this.$Message.success(this.getLanguageData.memberText.editMemberSuccess)
        }
      })
    },
    confirmSubmitPass (name) {
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$axios.put('starday-user/user/update/password', _this.formCustom).then((res) => {
            if (res.code === 200) {
              _this.$Message.success(this.getLanguageData.memberText.editPwdSuccess)
              Cookie.remove('token')
              _this.$router.push('/login')
            }
          })
        }
      })
    },
    handleImg () {
      this.formValidate.headImage = ''
    },
    uploadImg (url) {
      this.formValidate.headImage = url
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    ruleCustom () {
      const vm = this
      const validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.getLanguageData.memberText.placeIntNewPwd))
        } else {
          if (this.formCustom.confirmPassword !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('confirmPassword')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.getLanguageData.memberText.placeSuerNewPwd))
        } else if (value !== this.formCustom.newPassword) {
          callback(new Error(this.getLanguageData.memberText.pwdMismatch))
        } else {
          callback()
        }
      }
      const ruleCustom = {
        oldPassword: [
          { required: true, message: vm.getLanguageData.memberText.oldPwdNoEmpay, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: vm.getLanguageData.memberText.newPwdNoEmpay, trigger: 'blur' },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: vm.getLanguageData.memberText.placeSuerNewPwd, trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
      return ruleCustom
    }
  }
}
</script>

<style scoped lang="scss">
.membermodify {
  /deep/.ivu-form .ivu-form-item-label {
    text-align: left;
  }
  .password-form {
    width: 600px;
    margin: 0 auto;
  }
  /deep/.password-form .ivu-form-item-label {
    text-align: right;
  }
  .personal_container {
    .infobox {
      height: 540px;
      border: 1px solid #e2e2e2;
      margin-top: 40px;
      .tabs {
        height: 40px;
        background: #F4F4F4;
        display: flex;
        justify-content: flex-start;
        >div {
          width: 180px;
          font-size: 14px;
          color: #333333;
          text-align: center;
          line-height: 40px;
          border-right: 1px solid #e0e0e0;
          &.activetab {
            background: #ffffff;
          }
        }
        >div:hover{
          cursor: pointer;
        }
      }
    }
    .userinfo, .passwordinfo {
      padding: 52px;
      margin: 0 auto;
      .img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        background: #e2e2e2;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      span {
        display: inline-block;
        margin-right: 15px;
      }
      .button {
        margin: 0 auto;
      }
      .button,.pass_button {
        width: 416px;
        height: 52px;
        font-size: 16px;
        display: block;
      }
      .pass_button {
        margin-top: 100px;
      }
      .pass_title {
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        text-align: center;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
