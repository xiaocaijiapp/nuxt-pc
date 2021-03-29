<template>
  <div class="pointnum">
    <div class="title">
      <strong><span>ギフト券、ポイントについて</span></strong>
    </div>
    <div class="firstbox">
      <p><strong><span style="font-size:14px;">ギフト券</span></strong></p>
      <p><span style="font-size:12px;">1. Stardayギフト券はStardayにより発行され、使用により残高に追加することができます。お客様がギフト券でお支払いをする場合、あらかじめアカウントにギフト券番号を登録しておく必要があります。ギフト券をアカウントに登録すると、マイページに残高が表示されます。購入金額は、ギフト券の残高より差し引かれます。ご利用後の未使用残高は、</span></p>
      <p><span style="font-size:12px;">お客様のStardayサイトのアカウントに記録されます。</span></p>
      <p><span style="font-size:12px;">2. ギフト券の有効期限は、発行日によって異なります。通常、有効期限は発行から3年です。失効前にご登録いただくようお願いいたします。ギフト券の残高の有効期限はございません。ギフト券は、Stardayショーピングモールにおいて提供する対象商品およびサービスの購入にご利用できます。Stardayは、その裁量により、対象商品およびサービスを変更することができます。</span></p>
      <p><span style="font-size:12px;">3. ギフト券は、他のギフト券の購入には利用できません。</span></p>
      <p><span style="font-size:12px;">4. 法律で要求されている範囲を除き、ギフト券に金額を補充すること、ギフト券を再販売その他対価をもって譲渡すること、ギフト券を未承認の商用目的で使用すること、換金することまたはその他ギフト券に関する制限および禁止行為において禁止されている方法により使用することはできません。Stardayのアカウントに登録されたギフト券の未使用残高は譲渡できません。</span></p>
      <p><span style="font-size:12px;">5. ギフト券は、適用される法律によって認められる場合を除き、返金および返品できません。</span></p>
      <p><span style="font-size:12px;">6. お客様は、本細則を順守し、誤解を招く方法、詐欺的な方法、不公正な方法、その他Starday、関連会社またはお客様に有害な方法でギフト券を使用しません。Stardayは、お客様への通知なく、(i)返金を伴うことなくギフト券（ギフト券の残高を含みます）を無効とし、(ii)アカウントを終了もしくは停止し、(iii)Stardayサイト上のサービスの利用を終了もしくは停止し、(iv)注文をキャンセルもしくは制限し、または(v)詐欺、不正行為もしくは未承認の販売業者からのギフト券の購入を含むその他の本細則違反により、ギフト券が取得、使用もしくはアカウントに適用されたとStardayが疑う場合に、他の支払い方法を要求する権利を留保します。</span></p>
      <p><strong><span style="font-size:14px;">ポイントについて</span></strong></p>
      <p><span style="font-size:12px;">1. ポイントのため方：(i)お買い物でためる(ii)キャンペーンでためる</span></p>
      <p><span style="font-size:12px;">2. ポイントは、対象商品のご注文時に貯まり、貯まったポイントはStardayでのお買い物に1ポイント＝1円分としてお使いいただけます。ポイントもサービスでつかえます。クーポンとの交換、ポイントをつかった抽選大会など、お買い物以外のつかい道もたくさんあります。</span></p>
      <p><span style="font-size:12px;">3. 通常のポイントのほか、期間限定ポイントもあります。有効期間が限定されています。</span></p>
      <p><span style="font-size:12px;">4. サイト上に表示されるポイント付与率は、実際の付与率の小数点以下を四捨五入したものです。</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pointnum',
  layout: 'default'
}
</script>
<style lang="scss" scoped>
.pointnum {
  padding: 40px 0;
  margin-top: 40px;
  background-color: #fff;
  .title {
    height: 36px;
    font-size: 18px;
    margin: 0 30px;
    border-bottom: 1px solid #ccc;
  }
  .firstbox {
    margin: 40px 30px 0;
  }
  .twobox {
    margin: 20px 30px 0;
  }
  p {
    line-height: 24px;
  }
  span {
    font-family: "思源黑体 CN Regular";
  }
}
</style>
