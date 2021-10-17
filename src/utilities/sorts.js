/*
    mapOder() : Order an array of object based on another array order

*/
const mapOrder = (arr, order, key) => {
    arr.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return arr
}
export { mapOrder }