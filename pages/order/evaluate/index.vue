<template>
    <div class="evaluate">
      <div class="breadbox">
        <Breadcrumb separator=">">
          <BreadcrumbItem :to="getLOCATIONORIGIN">
            {{getLanguageData.storeText.indexPage}}
          </BreadcrumbItem>
          <BreadcrumbItem :to="getLOCATIONORIGIN + 'order/orderlist'">
            {{getLanguageData.cencelText.myOrder}}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {{getLanguageData.orderText.orderEva}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="evaluate_container">
        <section class="evaluate_title">{{getLanguageData.goodsText.publishAssess}}</section>
        <div class="goods">
          <div class="img_box">
            <img :src="getImageBasePath + goodsData.goodsSkuImg + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
          </div>
          <div class="right_info">
            <Poptip trigger="hover" word-wrap width="250" :content="goodsData.goodsTitle">
              <section class="info_1">{{goodsData.goodsTitle}}</section>
            </Poptip>
            <section class="info_2">
              <div>{{goodsData.goodsSkuVal}}</div>
            </section>
          </div>
        </div>
        <div class="evaluate_info">
          <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120">
            <FormItem :label="getLanguageData.evaluateText.storeFraction" prop="storeSore">
              <Rate v-model="formValidate.storeSore" />
            </FormItem>
            <FormItem :label="getLanguageData.evaluateText.goodFraction" prop="goodsSore">
              <Rate v-model="formValidate.goodsSore" />
            </FormItem>
            <FormItem :label="getLanguageData.evaluateText.expressSore" prop="expressSore">
              <Rate v-model="formValidate.expressSore" />
            </FormItem>
            <FormItem :label="getLanguageData.evaluateText.intComment">
              <Input v-model="formValidate.commentContent"   type="textarea" maxlength="100" :placeholder="getLanguageData.evaluateText.intCommentLimit" style="width: 560px" />
            </FormItem>
            <FormItem :label="getLanguageData.memberText.photo">
              <div style="display: flex">
                <img-list-show
                  v-for="(item, index) in formValidate.imgUrl"
                  :key="index"
                  :width="120"
                  :height="120"
                  :imgList="[item]"></img-list-show>
                <upLoad
                  @uploadImg="uploadImg"
                  :boxwidth="120"
                  :boxheight="120"
                  v-if="formValidate.imgUrl.length<3"></upLoad>
              </div>
              <div class="des">{{getLanguageData.evaluateText.uploadImgLimit}}</div>
            </FormItem>
            <FormItem style="margin-top: 100px">
              <div class="button_box">
                <Button class="button" type="primary" @click="handleSubmit('formValidate')">{{getLanguageData.memberText.sureBtn}}</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
import imgListShow from '@/components/common/imgListShow'
import upLoad from '@/components/common/upLoad'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  middleware: 'auth',
  components: { imgListShow, upLoad },
  data () {
    return {
      formValidate: {
        skuId: '',
        spuId: '',
        storeSore: 0,
        goodsSore: 0,
        expressSore: 0,
        commentContent: '',
        imgUrl: [],
        orderNo: '',
        anonymousFlag: 0
      },
      orderDetailData: {},
      goodsData: {}
    }
  },
  mounted () {
    this.formValidate.orderNo = this.$route.query.orderNumber
    this.requestOrderDeatils()
  },
  methods: {
    // 商品评价
    handleSubmit (name) {
      const _this = this
      _this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$axios.put('starday-order/myOrder/evaluate', _this.formValidate).then((res) => {
            if (res.code === 200) {
              this.$Message.success(_this.getLanguageData.evaluateText.commentSuccess)
              this.$router.push('/order/orderlist')
            }
          })
        }
      })
    },
    uploadImg (url) {
      this.formValidate.imgUrl.push(url)
      this.formValidate = JSON.parse(JSON.stringify(this.formValidate))
    },
    requestOrderDeatils () {
      const _this = this
      _this.$axios.get('starday-order/myOrder/info/paid/' + _this.$route.query.orderNumber).then((res) => {
        if (res.code === 200) {
          _this.orderDetailData = res.data
          _this.goodsData = res.data.goodsInfoList[0]
          _this.formValidate.skuId = res.data.goodsInfoList[0].goodsSkuId
          _this.formValidate.spuId = res.data.goodsInfoList[0].goodsId
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    ruleValidate () {
      const ruleValidate = {
        storeSore: [
          { required: true, message: this.getLanguageData.evaluateText.storeSatisfaction, trigger: 'change', type: 'number', min: 1 }
        ],
        goodsSore: [
          { required: true, message: this.getLanguageData.evaluateText.goodsSatisfaction, trigger: 'change', type: 'number', min: 1 }
        ],
        expressSore: [
          { required: true, message: this.getLanguageData.evaluateText.logisticsSatisfaction, trigger: 'change', type: 'number', min: 1 }
        ]
      }
      return ruleValidate
    }
  }
}
</script>

<style scoped lang="scss">
.evaluate {
  /deep/.ivu-form .ivu-form-item-content {
    margin-left: 0!important;
  }
  /deep/.ivu-rate-star:before, .ivu-rate-star-content:before {
    font-size: 26px;
  }
  /deep/.ivu-rate-star-half .ivu-rate-star-content:before, .ivu-rate-star-full:before {
    font-size: 26px;
  }
  /deep/.ivu-form .ivu-form-item-error-tip {
    left: 50px;
  }
  /*.ivu-rate-star-half .ivu-rate-star-content:before, .ivu-rate-star-full:before */
  .evaluate_container {
    .evaluate_title {
      margin-bottom: 40px;
    }
    .goods {
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
    .evaluate_info {
      height: 697px;
      background: #f3f4f6;
      margin-top: 20px;
      padding: 40px;
      .des {
        font-size: 14px;
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
