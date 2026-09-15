/**
 * @param {number[]} arr
 * @return {number[]}
 */
var prevPermOpt1 = function (arr) {
    const n = arr.length;
    // Rightmost index i with arr[i] > arr[i + 1]: everything after it is
    // already non-decreasing, so i is the latest position whose value
    // can still be lowered by a single swap.
    let i = -1;
    for (let k = n - 2; k >= 0; k--) {
        if (arr[k] > arr[k + 1]) {
            i = k;
            break;
        }
    }
    if (i === -1) {
        return arr;
    }
    // Track the largest value strictly less than arr[i]; scanning left
    // to right and updating only on a strictly larger candidate keeps
    // the leftmost occurrence of that maximum among ties, which is what
    // maximizes the resulting array.
    let j = -1;
    let best = -1;
    for (let k = i + 1; k < n; k++) {
        if (arr[k] < arr[i] && arr[k] > best) {
            best = arr[k];
            j = k;
        }
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
};
