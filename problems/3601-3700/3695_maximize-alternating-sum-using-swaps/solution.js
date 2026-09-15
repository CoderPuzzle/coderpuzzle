/**
 * @param {number[]} nums
 * @param {number[][]} swaps
 * @return {number}
 */
var maxAlternatingSum = function (nums, swaps) {
    // A pair lets its two indices trade values any number of times, so
    // each connected component of the swap graph rearranges freely:
    // merge the pair's endpoints with a union-find.
    const n = nums.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const sz = new Array(n).fill(1);
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    };
    for (const [p, q] of swaps) {
        let rp = find(p);
        let rq = find(q);
        if (rp === rq) {
            continue;
        }
        if (sz[rp] < sz[rq]) {
            [rp, rq] = [rq, rp];
        }
        parent[rq] = rp;
        sz[rp] += sz[rq];
    }

    // Collect each component's values and count its even-index slots.
    const groups = new Map();
    const evens = new Map();
    for (let i = 0; i < n; i++) {
        const r = find(i);
        if (!groups.has(r)) {
            groups.set(r, []);
            evens.set(r, 0);
        }
        groups.get(r).push(nums[i]);
        if (i % 2 === 0) {
            evens.set(r, evens.get(r) + 1);
        }
    }

    // With E even slots in a component, placing its E largest values on
    // them contributes 2*sumTopE - sumAll; totals reach ~1e14, which stays
    // exact under Number.MAX_SAFE_INTEGER.
    let ans = 0;
    for (const [r, vals] of groups) {
        vals.sort((a, b) => b - a);
        let topE = 0;
        let all = 0;
        for (let j = 0; j < vals.length; j++) {
            all += vals[j];
            if (j < evens.get(r)) {
                topE += vals[j];
            }
        }
        ans += 2 * topE - all;
    }
    return ans;
};
