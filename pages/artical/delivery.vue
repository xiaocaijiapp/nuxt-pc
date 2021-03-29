<template>
  <div class="delivery">
    <div class="title">
      <strong><span>配達について</span></strong>
    </div>
    <div class="firstbox">
      <p><strong><span style="font-size:14px;">▶配送料金</span></strong></p>
      <p><span style="font-size:12px;">本島一律送料無料となります。</span></p>
      <p><span style="font-size:12px;">北海道・沖縄・離島は追加送料がかかる場合があります。</span></p>
    </div>

    <div class="twobox">
      <p><strong><span style="font-size:14px;">▶商品発送のタイミング</span></strong></p>
      <p><span style="font-size:12px;">特にご指定がない場合、ご入金確認後、1～3営業日以内に発送いたします。</span></p>
      <p><span style="font-size:12px;">名入れ、オーダー商品および受注生産品の場合、各ストアの状況及び商品のご購入数によって、引渡し時期が異なります。</span></p>
      <p><span style="font-size:12px;">注文前に「引渡し時期」、「数量」、「発送方法」と「特別要望」などについてストアとご確認をお願いいたします。</span></p>
      <p><span style="font-size:12px;">※商品欠品などにより発送に時間を要する場合がございますので、あらかじめご了承くださいませ。</span></p>
    </div>

    <div class="twobox">
      <p><strong><span style="font-size:14px;">▶配送希望時間帯を注文備考でご指定出来ます</span></strong></p>
      <p><span style="font-size:12px;">午前中・午後、ただし時間を指定された場合でも、事情により指定時間内に配達ができない事もございます。</span></p>
    </div>

    <div class="twobox">
      <p><strong><span style="font-size:14px;">▶お届け先移転に伴う送料について</span></strong></p>
      <p><span style="font-size:12px;">商品の発送後、お客様側の住所変更によりお届け先移転に伴い、発生された送料はお客様負担になります。</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'delivery',
  layout: 'default'
}
</script>
<style lang="scss" scoped>
.delivery {
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
