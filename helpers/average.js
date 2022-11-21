const average = (rating) => {
  const total = rating.reduce((prev, current) => {
    return prev + current
  }, 0)

  if (total === 0) {
    return 0
  }

  let sum = 0
  let k = 1
  rating.forEach((item) => {
    sum += item * k
    k++
  })
  const r = sum / total
  return Number(r.toFixed(1))
}

module.exports = { average }
