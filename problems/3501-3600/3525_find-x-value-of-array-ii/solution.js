/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function (nums, k, queries) {
    // After the update and the forced prefix removal, the operation picks
    // nums[start..j], so a query counts j >= start whose product from start
    // is x mod k. Each segment tree node stores the counts of its segment's
    // prefix products plus the segment product; merging prepends the left
    // product to the right child's counts, and the suffix query merges the
    // decomposition of nums[start..] left to right while carrying the
    // running product. Every stored value is below k <= 5 and every count
    // below n = 10^5, so int32 arrays hold everything exactly.
    const n = nums.length;
    let size = 1;
    while (size < n) size <<= 1;
    const cnt = new Int32Array(2 * size * k);
    const prod = new Int32Array(2 * size).fill(1);
    for (let i = 0; i < n; ++i) {
        prod[size + i] = nums[i] % k;
        cnt[(size + i) * k + (nums[i] % k)] = 1;
    }
    const merge = (u) => {
        const base = u * k;
        const lrow = 2 * u * k;
        const rrow = lrow + k;
        cnt.set(cnt.subarray(lrow, lrow + k), base);
        const lp = prod[u + u];
        for (let p = 0; p < k; ++p) {
            const c = cnt[rrow + p];
            if (c !== 0) cnt[base + ((lp * p) % k)] += c;
        }
        prod[u] = (lp * prod[u + u + 1]) % k;
    };
    for (let u = size - 1; u >= 1; --u) merge(u);
    const result = [];
    for (const [index, value, start, x] of queries) {
        const leaf = size + index;
        const row = leaf * k;
        for (let r = 0; r < k; ++r) cnt[row + r] = 0;
        cnt[row + (value % k)] = 1;
        prod[leaf] = value % k;
        for (let u = leaf >> 1; u >= 1; u >>= 1) merge(u);
        let lo = size + start;
        let hi = 2 * size;
        const cur = new Int32Array(k);
        let running = 1;
        while (lo < hi) {
            if (lo & 1) {
                const base = lo * k;
                for (let p = 0; p < k; ++p) {
                    const c = cnt[base + p];
                    if (c !== 0) cur[(running * p) % k] += c;
                }
                running = (running * prod[lo]) % k;
                lo++;
            }
            lo >>= 1;
            hi >>= 1;
        }
        result.push(cur[x]);
    }
    return result;
};
