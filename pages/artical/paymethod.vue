<template>
  <div class="paymethod">
    <div class="title">
      <strong><span>お支払い方法について</span></strong>
    </div>
    <div class="firstbox">
      <p><strong><span style="font-size:14px;">お支払い方法について</span></strong></p>
      <p><strong><span style="font-size:14px;">1、クレジットカードでのお支払い</span></strong></p>
      <p><span style="font-size:12px;">ご利用可能なクレジットカード</span></p>
      <p><span style="font-size:12px;">● Visa</span></p>
      <p><span style="font-size:12px;">● Mastercard</span></p>
      <p><span style="font-size:12px;">● American Express</span></p>
      <p><span style="font-size:12px;">● Diners Club</span></p>
      <p><span style="font-size:12px;">● JCB</span></p>
      <p><span style="font-size:12px;">アプリやモバイルサイトでご注文の時のみ、ご注文の都度クレジットカード支払いをご選択いただけます。</span></p>
      <p><strong><span style="font-size:14px;">2、残高で支払う</span></strong></p>
      <p><span style="font-size:12px;">Stardayギフト券を販売しております。Stardayギフト券が残高にチャージすることでお買い物にご利用頂けます。ご注文の際のお支払い方法で、「残高で支払う」をご選択ください 。</span></p>
      <p><strong><span style="font-size:14px;">3、コンビニでのお支払い</span></strong></p>
      <p><span style="font-size:12px;">ご利用可能なコンビニ 。</span></p>
      <p><span style="font-size:12px;">● デイリーヤマザキ</span></p>
      <p><span style="font-size:12px;">● ファミリーマート</span></p>
      <p><span style="font-size:12px;">● ローソン&nbsp;ローソン・スリーエフ</span></p>
      <p><span style="font-size:12px;">● ミニストップ</span></p>
      <p><span style="font-size:12px;">● サンクス</span></p>
      <p><span style="font-size:12px;">● サークルK</span></p>
      <p><span style="font-size:12px;">● セイコーマート</span></p>
      <p><span style="font-size:12px;">ご注文の際のお支払い方法で、「コンビニで支払う」をご選択ください 。</span></p>
      <p><strong><span style="font-size:14px;">4.翌月払い</span></strong></p>
      <p><span style="font-size:12px;">Stardayはコンビニ決済を利用するお客様により快適なサービスを提供するため、翌月払いを提供します。翌月払いは、面倒な事前登録なく、メールアドレスと携帯電話番号だけで簡単に決済できるサービスです。お支払い方法に翌月払いをご指定いただくと、ご利用の翌月に代金をまとめてお支払いいただくことができます。
          ご利用の翌月の3日を目安に、StardayよりEメールでご請求内容の詳細をお知らせします。内容をご確認いただき、ご利用の翌月7日までにコンビニでお支払いをいただきます。 翌月払いを初めて利用利用するユーザーの場合、＜翌月払い利用規約＞が立ち上がりますので、同意した上で、認証してください。</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'paymethod',
  layout: 'default'
}
</script>
<style lang="scss" scoped>
.paymethod {
  // padding: 20px 0;
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
