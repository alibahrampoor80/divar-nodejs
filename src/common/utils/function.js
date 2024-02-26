const isTrue = (value) => value === ["true", 1, true].includes(value)
const isFalse = (value) => value === ["false", 0, false].includes(value)

const removeProperty = (target, properties = []) => {
    for (const item of properties) {
        delete target[item]
    }
    return target
}
module.exports = {isFalse, isTrue,removeProperty}