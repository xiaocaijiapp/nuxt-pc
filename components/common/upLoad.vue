<template>
  <div class="upload" :style="{width:(boxwidth+'px') || '100px',height:(boxheight+'px')||'100px'}" @click="upload">
    <img src="@/assets/images/personal/zhaopian.png" alt="">
    <input v-show="false" ref="file" type="file" @change="selectImg">
  </div>
</template>
<script>
// import { queryUpLoadImg } from '@/axios/module/common'
export default {
  name: 'Upload',
  props: ['boxwidth', 'boxheight', 'index'],
  methods: {
    upload () {
      this.$refs.file.value = ''
      this.$refs.file.click()
    },
    selectImg (e) {
      const vm = this
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (eve) {
        const image = new Image()
        const _data = { filedir: eve.target.result }
        image.src = eve.target.result
        if (image.complete) {
          vm.uploadImg(image.width, image.height, file.size, _data, file)
        } else {
          image.onload = function () {
            vm.uploadImg(image.width, image.height, file.size, _data, file)
          }
        }
      }
    },
    uploadImg (width, height, size, data, reader) {
      const vm = this
      const formData = new FormData()
      formData.append('file', reader)
      this.$axios({
        url: 'starday-order/file/uploadImage',
        method: 'POST',
        headers: { 'content-type': 'multipart/form-data' },
        data: formData
      }).then((res) => {
        this.$emit('uploadImg', res.data, vm.index)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .upload {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border: 1px dashed #ccc;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
        margin:0 10px;
        position: relative;
        img {
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
        }
    }
</style>
