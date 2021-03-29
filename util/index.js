export default {
  // getcookiesInServer (req) {
  //   let _token = ''
  //   if (req && req.headers && req.headers.Authorization) {
  //     _token = req.headers.Authorization
  //   }
  //   return _token
  // },
  // getcookiesInClient (key) {
  //   return Cookie.get(key) ? Cookie.get(key) : ''
  // },
  chunk (array, size) {
    // 获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
    const length = array.length
    // 判断不是数组，或者size没有设置，size小于1，就返回空数组
    if (!length || !size || size < 1) {
      return []
    }
    // 核心部分
    let index = 0 // 用来表示切割元素的范围start
    let resIndex = 0 // 用来递增表示输出数组的下标

    // 根据length和size算出输出数组的长度，并且创建它。
    const result = new Array(Math.ceil(length / size))
    // 进行循环
    while (index < length) {
      // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
      result[resIndex++] = array.slice(index, (index += size))
    }
    // 输出新数组
    return result
  },
  goodscalc (array, size) {
    const arr = []
    const len = array.length
    const num = Math.ceil(len / size)
    for (let i = 0; i < num; i++) {
      arr.push(array.slice(i * (size - 1), ((i + 1) * size) - i))
    }
    return arr
  },
  // 店铺评价星星计算
  mathNum (num) {
    const y = String(num).indexOf('.') + 1 // 获取小数点的位置
    let b = 0 // 半星个数
    if (y > 0) {
      const ceilnum = String(num).substr(y, 1)
      if (ceilnum >= 5) {
        b = 1
      } else {
        b = 0
      }
      const a = Math.floor(Number(num)) // 满星个数
      return [a, b, 5 - a - b]
    } else if (num > 5) {
      return [5, 0, 0]
    } else {
      return [num, 5 - num, 0]
    }
  },
  timeToSec (time) {
    const hour = time.split(':')[0]
    const min = time.split(':')[1]
    let sec
    if (time.split(':')[2]) {
      sec = time.split(':')[2]
    } else {
      sec = 0
    }

    const s = Number(hour * 3600) + Number(min * 60) + Number(sec)
    return s * 1000
  }
}
