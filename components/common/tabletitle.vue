<template>
  <div class="tabletitle">
    <div v-for="(item, index) in tabcolum" :key="index" class="list" :style="{width:item.width + 'px'}">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabletitle',
  props: ['tabcolum']
}
</script>

<style scoped lang="scss">
.tabletitle{
  height: 46px;
  line-height: 46px;
  background-color: #F4F4F4;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  .list{
    display: inline-block;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }

}
</style>
