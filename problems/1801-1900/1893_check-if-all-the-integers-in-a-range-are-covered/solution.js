/**
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
var isCovered = function (ranges, left, right) {
    // +1 at start, -1 past end, running sum > 0 means covered.
    const diff = new Array(52).fill(0);
    for (const [s, e] of ranges) {
        diff[s] += 1;
        diff[e + 1] -= 1;
    }
    const cover = new Array(51).fill(false);
    let cur = 0;
    for (let x = 1; x <= 50; x++) {
        cur += diff[x];
        cover[x] = cur > 0;
    }
    for (let x = left; x <= right; x++) {
        if (!cover[x]) {
            return false;
        }
    }
    return true;
};
