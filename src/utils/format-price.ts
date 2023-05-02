export const formatPriceVND = (input: number | string, isTrunc = true) => {
  if (!input) return ''
  input = isTrunc ? Math.trunc(Number(input)) : input
  return input
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
