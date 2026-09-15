/**
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var pathExistenceQueries = function (n, nums, maxDiff, queries) {
    // nums is sorted, so any edge i-j (i < j) forces every consecutive
    // pair between them to be an edge too — components are contiguous
    // segments, cut wherever a gap exceeds maxDiff.
    const comp = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        comp[i] = comp[i - 1] + (nums[i] - nums[i - 1] > maxDiff ? 1 : 0);
    }
    return queries.map(([u, v]) => comp[u] === comp[v]);
};
