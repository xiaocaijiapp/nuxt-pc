window.yjDataLayer = window.yjDataLayer || []
function ytag () { window.yjDataLayer.push(arguments) }
ytag({ type: 'ycl_cookie' })
export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    ytag({
      type: 'yss_conversion',
      config: {
        yahoo_conversion_id: '1001125011',
        yahoo_conversion_label: 'Uz4fCLTZjuMBENjHobUC',
        yahoo_conversion_value: '0'
      }
    })
  })
}
