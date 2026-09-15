/**
 * @param {number[]} arr
 * @return {number[]}
 */
var duplicateZeros = function (arr) {
    // Two-pointer write from the end: every element is written to a
    // position at or to the right of its source, so no unread value is
    // ever overwritten. i reads the original array, j writes into the
    // extended one; writes with j beyond the real length fall off.
    const n = arr.length;
    let zeros = 0;
    for (const v of arr) if (v === 0) zeros++;
    let i = n - 1;
    let j = n + zeros - 1;
    while (i >= 0) {
        if (j < n) arr[j] = arr[i];
        j--;
        if (arr[i] === 0) {
            if (j < n) arr[j] = 0;
            j--;
        }
        i--;
    }
    return arr;
};
