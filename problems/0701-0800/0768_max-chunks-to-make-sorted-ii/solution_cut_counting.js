/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
    // A boundary is legal exactly when the prefix's largest entry is
    // no greater than every entry after the cut — non-strict, which
    // is what keeps repeated values legal at equal boundaries.
    const suffixMin = arr.slice();
    for (let i = arr.length - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i], suffixMin[i + 1]);
    }
    let blocks = 1;
    let prefixMax = arr[0];
    for (let i = 1; i < arr.length; i++) {
        // The prefix holds the smallest i+1 entries exactly when its
        // running maximum does not exceed the suffix minimum.
        if (prefixMax <= suffixMin[i]) blocks++;
        prefixMax = Math.max(prefixMax, arr[i]);
    }
    return blocks;
};
