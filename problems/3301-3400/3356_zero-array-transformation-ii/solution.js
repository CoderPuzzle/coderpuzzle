/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var minZeroArray = function (nums, queries) {
    // After the first k queries an index can reach zero exactly when the
    // total val of the queries covering it is at least nums[i] — each
    // index can spend every covering query's allowance independently, and
    // extra queries never hurt, so feasibility is monotone in k. Binary
    // search k; each probe folds the first k queries into a difference
    // array and checks one prefix sweep, O(n + q).
    const n = nums.length;
    const feasible = (k) => {
        const delta = new Array(n + 1).fill(0);
        for (let j = 0; j < k; j++) {
            delta[queries[j][0]] += queries[j][2];
            delta[queries[j][1] + 1] -= queries[j][2];
        }
        let cover = 0;
        for (let i = 0; i < n; i++) {
            cover += delta[i];
            if (cover < nums[i]) {
                return false;
            }
        }
        return true;
    };
    let lo = 0;
    let hi = queries.length;
    if (!feasible(hi)) {
        return -1;
    }
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
