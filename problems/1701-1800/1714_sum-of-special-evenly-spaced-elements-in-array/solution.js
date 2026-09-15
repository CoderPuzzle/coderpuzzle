/**
 * A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per query
 * when walked directly, which stays cheap only for large y. Split the
 * queries on B ~ sqrt(n): every y <= B gets a residue table pre[y]
 * built right-to-left with pre[y][i] = (nums[i] + pre[y][i+y]) % MOD,
 * making each such query one lookup, while any y > B strides at most
 * n/B ~ B indices. A full suffix sums to 5*10^4 * 10^9 = 5*10^13 before
 * the modulus — exact in a double — and table rows store plain 32-bit
 * mod values in one flat Int32Array.
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var solve = function (nums, queries) {
    const MOD = 1_000_000_007;
    const n = nums.length;
    const limit = Math.floor(Math.sqrt(n));
    // pre[y * n + i] = (nums[i] + pre[y * n + i + y]) % MOD — query (i, y)'s answer
    const pre = new Int32Array((limit + 1) * n);
    for (let y = 1; y <= limit; y++) {
        for (let i = n - 1; i >= 0; i--) {
            const tail = i + y < n ? pre[y * n + i + y] : 0;
            pre[y * n + i] = (nums[i] + tail) % MOD;
        }
    }
    const answer = new Array(queries.length);
    for (let q = 0; q < queries.length; q++) {
        const x = queries[q][0];
        const y = queries[q][1];
        if (y <= limit) {
            answer[q] = pre[y * n + x];
        } else {
            let total = 0;
            for (let j = x; j < n; j += y) {
                total += nums[j];
            }
            answer[q] = total % MOD;
        }
    }
    return answer;
};
