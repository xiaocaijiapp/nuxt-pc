<template>
    <div class="afterservice">
      <div class="breadbox">
        <Breadcrumb separator=">">
          <BreadcrumbItem :to="getLOCATIONORIGIN">
            {{getLanguageData.storeText.indexPage}}
          </BreadcrumbItem>
          <BreadcrumbItem :to="getLOCATIONORIGIN + 'order/orderlist'">
            {{getLanguageData.cencelText.myOrder}}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {{getLanguageData.orderText.afterSale}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="service_container">
        <section class="service_title">申请售后</section>
        <div class="service_form">
          <Form ref="formValidate" :model="formValidate" :label-width="120">
            <FormItem label="退货商品">
              <section class="refundgoods">
                <div class="img_box">
                  <img src="" alt="">
                </div>
                <div class="right_info">
                  <Poptip trigger="hover" word-wrap width="250" content="昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする">
                    <section class="info_1">昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする</section>
                  </Poptip>
                  <section class="info_2">
                    <div>灰色; 大号</div>
                  </section>
                </div>
              </section>
            </FormItem>
            <FormItem label="退款类型">
              <Select v-model="formValidate.serviceType" style="width:240px" placeholder="请选择">
                <Option v-for="item in serviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="退款原因">
              <Select v-model="formValidate.refundReason" style="width:240px" placeholder="请选择">
                <Option v-for="item in refundReasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="退款金额">
              <Input v-model="formValidate.refundAmount" type="password" style="width: 240px"/>
            </FormItem>
            <FormItem label="退款说明">
              <Input v-model="formValidate.refundDeclare"   type="textarea" placeholder="退款说明(选填)" style="width: 560px" />
            </FormItem>
            <FormItem label="退款说明">
              <img-list-show
                v-if="formValidate.img"
                :width="120"
                :height="120"
                :imgList="[formValidate.img]"></img-list-show>
              <upLoad
                @uploadImg="uploadImg"
                :boxwidth="120"
                :boxheight="120"
                v-if="!formValidate.img"></upLoad>
              <div class="des">写真をアップロード(最多三张)</div>
            </FormItem>
            <FormItem style="margin-top: 100px">
              <div class="button_box">
                <Button class="button" type="primary" @click="handleSubmit('formValidate')">提交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imgListShow from '@/components/common/imgListShow'
import upLoad from '@/components/common/upLoad'
export default {
  name: 'index',
  middleware: 'auth',
  components: { imgListShow, upLoad },
  computed: {
    ...mapGetters({
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  data () {
    return {
      formValidate: {
        serviceType: '',
        refundReason: '',
        refundAmount: '',
        refundDeclare: '',
        img: ''
      },
      serviceList: [
        {
          value: '仅退款',
          label: '仅退款'
        },
        {
          value: '退货退款',
          label: '退货退款'
        }
      ],
      refundReasonList: [
        {
          value: '七天无理由',
          label: '七天无理由'
        },
        {
          value: '不想要了',
          label: '不想要了'
        }
      ]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    uploadImg (url) {
      this.formValidate.img = url
    }
  }
}
</script>

<style scoped lang="scss">
.afterservice {
  /deep/.ivu-form .ivu-form-item-content {
    margin-left: 0!important;
  }
  .service_container {
    .service_title {
      margin-bottom: 40px;
    }
    .service_form {
      width: 800px;
      margin: 0 auto;
      .refundgoods {
        width: 530px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 50px;
        .img_box {
          width: 100px;
          height: 100px;
          background: #e0e0e0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right_info {
          width: 353px;
          height: 100px;
          .info_1 {
            width: 353px;
            font-size: 12px;
            line-height: 25px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .info_2 {
            display: flex;
            justify-content: space-between;
            >div {
              font-size: 12px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
            }
            >div:nth-of-type(1) {
              color: #666666;
              text-align: left;
            }
            >div:nth-of-type(2) {
              color: #333333;
              text-align: right;
            }
          }
        }
      }
      .des {
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 30px;
        margin-left: 120px;
        margin-top: 10px;
      }
      .button_box {
        display: flex;
        justify-content: center;
        .button {
          width: 416px;
          height: 54px;
          background: #E76636;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
