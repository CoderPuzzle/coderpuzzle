/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var solveQueries = function (nums, queries) {
    // Group indices by value; each occurrence list is sorted. Per
    // query, binary-search the list and take the nearer of the two
    // circular neighbors. Indices and distances stay below 10^5, so
    // plain numbers are exact.
    const pos = new Map();
    for (let i = 0; i < nums.length; i++) {
        const list = pos.get(nums[i]);
        if (list === undefined) {
            pos.set(nums[i], [i]);
        } else {
            list.push(i);
        }
    }
    const n = nums.length;
    const ans = new Array(queries.length);
    for (let t = 0; t < queries.length; t++) {
        const q = queries[t];
        const p = pos.get(nums[q]);
        if (p.length === 1) {
            ans[t] = -1;
            continue;
        }
        let lo = 0;
        let hi = p.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (p[mid] < q) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        const prev = lo > 0 ? p[lo - 1] : p[p.length - 1];
        const nxt = lo + 1 < p.length ? p[lo + 1] : p[0];
        const dprev = (q - prev + n) % n;
        const dnxt = (nxt - q + n) % n;
        ans[t] = Math.min(dprev, dnxt);
    }
    return ans;
};
