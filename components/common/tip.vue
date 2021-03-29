<template>
  <Modal
    v-model="showTipDelete"
    scrollable
    @on-cancel="cancleDelete"
  >
    <p slot="header">
      <span>提示</span>
    </p>
    <p><Icon color="#e6a23c" type="ios-alert-outline" size="24" style="padding-right: 10px" />删除后将无默认地址，是否继续？</p>
    <p slot="footer">
      <Button @click="cancleDelete">
        取消
      </Button>
      <Button type="primary" @click="sureDelete">
        继续
      </Button>
    </p>
  </Modal>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'Tip',
  props: ['showTipDelete', 'title'],
  methods: {
    cancleDelete () {
      this.$emit('isGonDelete', false)
    },
    sureDelete () {
      this.$emit('isGonDelete', true)
    }
  }
  // computed: {
  //   ...mapState({
  //     Language: state => state.app.Language
  //   })
  // }
}
</script>

<style scoped lang="scss">

</style>
