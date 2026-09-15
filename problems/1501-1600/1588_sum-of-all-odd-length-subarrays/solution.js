/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function (arr) {
    // For each index i, left = i + 1 choices for the subarray's start and
    // right = n - i choices for its end; among those left * right
    // subarrays through i, exactly ceil(left * right / 2) have odd
    // length. Sum arr[i] times that count over every index.
    const n = arr.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        const left = i + 1;
        const right = n - i;
        const oddCount = Math.floor((left * right + 1) / 2);
        total += arr[i] * oddCount;
    }
    return total;
};
