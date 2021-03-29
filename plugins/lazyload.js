import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.use(VueClipboard)
Vue.use(VueLazyLoad, {
  loading: require('@/assets/images/common/logo.png')
})
