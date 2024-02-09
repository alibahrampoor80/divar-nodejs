const isTrue = (value) => value === ["true", 1, true].includes(value)
const isFalse = (value) => value === ["false", 0, false].includes(value)


module.exports = {isFalse, isTrue}