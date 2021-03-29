/**
 * 地址
 * @param arr
 * @returns {[]}
 */
export const filterArea = (arrlist) => {
  const arr = JSON.parse(JSON.stringify(arrlist))
  const _arr1 = []
  const _arr2 = []
  const _arr3 = []
  arr.forEach(function (item) {
    item.label = item.name
    item.value = item.code
    if (item.level === 0) {
      _arr1.push(item)
    }
    if (item.level === 1) {
      _arr2.push(item)
    }
    if (item.level === 2) {
      _arr3.push(item)
    }
  })
  _arr3.forEach(function (item) {
    const _index = _arr2.findIndex(function (arritem) {
      return arritem.code === item.pCode
    })
    if (_index > -1) {
      if (!_arr2[_index].children) {
        _arr2[_index].children = []
      }
      _arr2[_index].children.push(item)
    }
  })
  _arr2.forEach(function (item) {
    const _index = _arr1.findIndex(function (arritem) {
      return arritem.code === item.pCode
    })
    if (_index > -1) {
      if (!_arr1[_index].children) {
        _arr1[_index].children = []
      }
      _arr1[_index].children.push(item)
    }
  })
  return _arr1
}
/**
 * 日期加天数返回正确的日期
 */
export const getNewData = (timedate, days) => {
  const _timedate = timedate.split('-')
  const nDate = new Date(_timedate[1] + '-' + _timedate[2] + '-' + _timedate[0])
  const millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000)
  const rDate = new Date(millSeconds)
  const year = rDate.getFullYear()
  let month = rDate.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let date = rDate.getDate()
  if (date < 10) {
    date = '0' + date
  }
  return (year + '-' + month + '-' + date)
}

export const getNewData1 = (startDate, valueTime) => {
  const date = new Date(startDate)
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime)
  // const year1 = date.getFullYear()
  // const month1 = date.getMonth() + 1
  // const day1 = date.getDate()
  const year2 = newDate.getFullYear()
  const month2 = newDate.getMonth() + 1
  const day2 = newDate.getDate()
  return year2 + '-' + month2 + '-' + day2
}
/**
 * 转换日期格式
 */
export const turnDateType = (dateTime) => {
  const yy = dateTime.getFullYear()
  const mm = (dateTime.getMonth() + 1) < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
  const dd = (dateTime.getDate()) < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  return yy + '-' + mm + '-' + dd
}

/**
 * 生成13位以内随机数
 * @param len
 * @returns {string}
 */
export const randomNum = (len) => {
  const _num = new Date().getTime() + ''
  return _num.slice(_num.length - len)
}
