<template>
  <div class="refund">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">トップ</BreadcrumbItem>
        <BreadcrumbItem to="/order/orderlist">我的订单</BreadcrumbItem>
        <BreadcrumbItem>退货退款</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="refund_container">
      <section class="refundlist_title">退货退款</section>
      <div class="head">
        <div class="title">订单信息</div>
        <div class="title">退款全额</div>
        <div class="title">申请时间</div>
        <div class="title">服务类型</div>
        <div class="title">退款状态</div>
        <div class="title">操作</div>
      </div>
      <div class="refundinfo" v-for="(item, index) in 5" :key="index">
        <div class="info_itm1">
          <Row>
            <Col span="4">
              <div>订单编号:503-6559050-0512664</div>
            </Col>
            <Col span="18">
              <div>退货单号:T103-7579454-0510066</div>
            </Col>
          </Row>
        </div>
        <div class="info_item2">
          <div class="info">
            <div class="img_box">
              <img src="" alt="">
            </div>
            <div class="right_info">
              <Poptip trigger="hover" word-wrap width="250" content="昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする">
                <section class="info_1">昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする</section>
              </Poptip>
              <section class="info_2">
                <div>灰色；大号</div>
<!--                <div>×1</div>-->
              </section>
            </div>
          </div>
          <div class="info">¥1234</div>
          <div class="info">2020-10-10 10:10:10</div>
          <div class="info">退货退款</div>
          <div class="info">退款成功</div>
          <div class="info" @click="$router.push('/refund/refundetail')">退款详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  middleware: 'auth'
}
</script>

<style scoped lang="scss">
.refund {
  .refund_container {
    .head {
      height: 46px;
      display: flex;
      background: #e0e0e0;
      margin-top: 20px;
      .title {
        width: 202px;
        font-size: 12px;
        color: #333;
        line-height: 46px;
        text-align: center;
      }
      .title:nth-of-type(1) {
        width: 556px;
      }
    }
    .refundinfo {
      border: 1px solid #e0e0e0;
      margin-top: 20px;
      .info_itm1 {
        height: 46px;
        line-height: 46px;
        padding-left: 20px;
        border-bottom: 1px solid #e0e0e0;
        background: #e0e0e0;
        div {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #666666;
        }
      }
      .info_item2 {
        height: 140px;
        display: flex;
        .info:nth-of-type(1) {
          width: 479px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;
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
            width: 330px;
            height: 100px;
            .info_1 {
              width: 330px;
              font-size: 12px;
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
              margin-top: 14px;
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
        .info:not(:first-child){
          width: 175px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
        }
        .info:last-child {
          border-right: none;
        }
        .info:nth-of-type(5) {
          color: #2A9A2E;
        }
        .info:nth-of-type(6) {
          color: #3897E0;
        }
        .info:nth-of-type(6):hover {
          cursor: pointer;
        }
      }
    }
  }

}
</style>
