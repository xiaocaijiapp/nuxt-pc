/**
 * 地域过滤
 * @param arr1
 * @param arr2
 * @returns {*}
 */
export const filterArea = (arr1, arr2) => {
  arr2.forEach(function (item) {
    item.label = item.name
    item.value = item.code
    const _index = arr1.findIndex(function (data) {
      return data.code === item.parent_code
    })
    if (_index > -1) {
      arr1[_index].children = arr1[_index].children || []
      arr1[_index].children.push(item)
    }
  })
  return arr1
}

/**
 * 层级
 * @param arr
 * @returns {*}
 */
export const filterCansler = (arr) => {
  arr.forEach(function (item) {
    item.label = item.name
    item.value = item.code
  })
  return arr
}
