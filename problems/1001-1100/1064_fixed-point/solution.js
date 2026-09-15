/**
 * @param {number[]} arr
 * @return {number}
 */
var fixedPoint = function (arr) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] - mid >= 0) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return arr[lo] === lo ? lo : -1;
};
