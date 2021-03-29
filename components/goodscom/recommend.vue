<template>
  <div class="recgood">
    <img src="@/assets/images/index/goods.png" alt="">
    <strong title="昼寝をしながら折り畳みベッドをする昼寝をしながら折り畳みベッドをするら昼寝をしながら折り畳みベッドをするらら">昼寝をしながら折り畳みベッドをする昼寝をしながら折り畳みベッドをするら昼寝をしながら折り畳みベッドをするらら</strong>
    <section class="price">
      <span>¥1234</span>
      <span>¥1234</span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Recommend'
}
</script>

<style scoped lang="scss">
.recgood{
  display: inline-block;
  width: 225px;
  height: 319px;
  background-color: #fff;
  box-sizing: border-box;
  margin-right: 20px;
  img{
    display: block;
    width: 225px;
    height: 225px;
  }
  strong{
    white-space: normal;
    font-size: 13px;
    font-weight: 400;
    color: #333333;
    padding: 10px 0 0;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
    height: 50px;
  }
  .price{
    padding: 10px 0;
    span:nth-of-type(1){
      height: 21px;
      font-size: 18px;
      font-weight: 700;
      color: #f26936;
      line-height: 21px;
    }
    span:nth-of-type(2){
      font-size: 13px;
      font-family: DINAlternate, DINAlternate-Bold;
      font-weight: 700;
      text-decoration:  line-through;
      color: #999999;
      line-height: 15px;
    }
  }
}
</style>
