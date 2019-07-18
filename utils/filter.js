export function fill(val, de) {
  const cur = de
  return val || val === 0 ? val : (de ? cur : '--')
}
