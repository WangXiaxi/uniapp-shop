/**
 * @name 过滤
 * @param {String} val 值
 * @param {String} de 填充值
 */
export function fill(val, de) {
  const cur = de
  return val || val === 0 ? val : (de ? cur : '--')
}

/**
 * @name 数字保留位数
 * @param {Number} val 值
 * @param {Number} bit 位数
 */
export function nf(val, bit) {
  const bitx = bit || bit === 0 ? bit : 2
  if (!val) return (0).toFixed(bitx)
  if (!Number(val)) return (0).toFixed(bitx)
  return Number(val).toFixed(bitx)
}
