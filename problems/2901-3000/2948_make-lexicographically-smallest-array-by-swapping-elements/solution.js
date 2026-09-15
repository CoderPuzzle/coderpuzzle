/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function (nums, limit) {
    const n = nums.length;
    const pairs = nums.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const result = new Array(n).fill(0);
    let i = 0;
    while (i < n) {
        // A maximal run whose consecutive value gaps are all <= limit is
        // exactly one connected component; any larger gap splits it.
        let j = i;
        while (j + 1 < n && pairs[j + 1][0] - pairs[j][0] <= limit) j++;
        // Within a component any permutation is reachable, so place the
        // run's ascending values at its original indices in ascending order.
        const indices = [];
        for (let pos = i; pos <= j; pos++) indices.push(pairs[pos][1]);
        indices.sort((a, b) => a - b);
        for (let p = 0; p <= j - i; p++) {
            result[indices[p]] = pairs[i + p][0];
        }
        i = j + 1;
    }
    return result;
};
