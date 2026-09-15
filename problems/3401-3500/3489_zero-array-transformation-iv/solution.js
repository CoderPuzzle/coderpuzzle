/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var minZeroArray = function (nums, queries) {
    // Stream queries once; per index keep subset-sum reachability of
    // the vals seen so far (0/1 knapsack, one item per query) as a
    // boolean table, and stop updating an index once its target is
    // reachable. Sums stay <= 1000, far below 2^53.
    const n = nums.length;
    const reach = new Map();
    const done = new Array(n).fill(false);
    let remaining = 0;
    for (let i = 0; i < n; i++) {
        const t = nums[i];
        if (t === 0) {
            done[i] = true;
        } else {
            const row = new Uint8Array(t + 1);
            row[0] = 1;
            reach.set(i, row);
            remaining++;
        }
    }
    if (remaining === 0) {
        return 0;
    }
    for (let k = 0; k < queries.length; k++) {
        const [l, r, val] = queries[k];
        for (let i = l; i <= r; i++) {
            if (done[i] || val > nums[i]) {
                continue;
            }
            const row = reach.get(i);
            for (let s = nums[i] - val; s >= 0; s--) {
                if (row[s] === 1) {
                    row[s + val] = 1;
                }
            }
            if (row[nums[i]] === 1) {
                done[i] = true;
                remaining--;
            }
        }
        if (remaining === 0) {
            return k + 1;
        }
    }
    return -1;
};
