const createLottiesObject = lotties => {
  return lotties.reduce((prev, el) => {
    return {
      ...prev,
      [Object.keys(el)[0]]: el[Object.keys(el)[0]],
    }
  }, {})
}

export default createLottiesObject
