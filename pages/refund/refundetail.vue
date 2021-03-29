<template>
    <div class="refunddetail">
      <div class="breadbox">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">トップ</BreadcrumbItem>
          <BreadcrumbItem to="/order/orderlist">我的订单</BreadcrumbItem>
          <BreadcrumbItem to="/refund/list">退货退款</BreadcrumbItem>
          <BreadcrumbItem>退货详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="refund_container">
        <section class="refunddetail_title">退货详情</section>
        <div class="detail_info">
          <div class="head">店铺名称</div>
          <div class="goods">
            <div class="goods_img">
              <img src="" alt="">
            </div>
            <div class="goods_info">
              <Poptip trigger="hover" word-wrap width="250" content="昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする">
                <section class="info_1">昼寝をしながら折り畳みベッドをするら折り畳みベッドをするるら折り畳みベッドをする</section>
              </Poptip>
              <section class="info_2">
                <div>灰色；大号</div>
              </section>
            </div>
          </div>
          <div class="detail">
            <section class="title">退货详情</section>
            <ul>
              <li>
                <span>退货状态:</span>
                <span>退货成功</span>
              </li>
              <li>
                <span>退款状态:</span>
                <span>退款成功</span>
              </li>
              <li>
                <span>订单号:</span>
                <span>503-6559050-0512664</span>
              </li>
              <li>
                <span>退货单号:</span>
                <span>T103-7579454-0510066</span>
              </li>
              <li>
                <span>退货时间:</span>
                <span>2018-07-29</span>
              </li>
              <li>
                <span>退款金额:</span>
                <span class="amount">¥1234</span>
              </li>
              <li>
                <span>退货原因:</span>
                <span>不喜欢</span>
              </li>
              <li>
                <span>退款说明:</span>
                <span>不喜欢不合适</span>
              </li>
              <li>
                <span>退款说明:</span>
                <span>不喜欢不合适</span>
              </li>
              <li>
                <span>应返积分:</span>
                <span>0</span>
              </li>
              <li>
                <span>实际应返积分:</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'refunddetail',
  middleware: 'auth'
}
</script>

<style scoped lang="scss">
  .refunddetail {
    .refund_container {
      .refunddetail_title {
        margin-bottom: 40px;
      }
      .detail_info {
        width: 500px;
        height: 569px;
        border: 1px solid #e0e0e0;
        margin: 0 auto;
        .head {
          height: 40px;
          background: #e0e0e0;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 40px;
          padding-left: 20px;
        }
        .goods {
          height: 140px;
          padding: 20px 10px 20px 20px;
          display: flex;
          justify-content: space-between;
          .goods_img {
            width: 100px;
            height: 100px;
            background: #e0e0e0;
          }
          .goods_info {
            .info_1 {
              width: 340px;
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
          }
        }
        .detail {
          height: 400px;
          .title {
            font-size: 14px;
            font-weight: 600;
            color: #333333;
            padding-left: 20px;
          }
          ul {
            padding-left: 20px;
            li {
              line-height: 32px;
              span {
                display: inline-block;
                height: 20px;
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                text-align: left;
                line-height: 20px;
              }
              span:first-child {
                width: 100px;
              }
              .amount {
                color: #E76636;
              }
            }
          }
        }
      }
    }
  }

</style>
