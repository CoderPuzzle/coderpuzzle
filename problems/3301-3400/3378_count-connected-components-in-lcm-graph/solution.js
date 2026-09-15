/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var countComponents = function (nums, threshold) {
    // Every edge needs lcm(nums[i], nums[j]) <= threshold, and the lcm
    // is a multiple of both values, so values above the threshold are
    // isolated singletons. Enumerate present values ascending, keeping
    // anchor[m] = the smallest present divisor of each multiple m:
    // every later present divisor of m unions with it, and since both
    // divide m the edge is genuine (lcm | m <= threshold). Every
    // genuine edge (a, b) is covered at m = lcm(a, b). The scans cost
    // the harmonic sum ~threshold*ln(threshold). Iterative DSU with
    // path halving and union by size; values up to 1e9 are never
    // multiplied and the answer fits 32 bits.
    const n = nums.length;
    const parent = new Int32Array(n);
    const size = new Int32Array(n).fill(1);
    for (let i = 0; i < n; i++) parent[i] = i;
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a, b) => {
        let ra = find(a);
        let rb = find(b);
        if (ra === rb) return;
        if (size[ra] < size[rb]) {
            const t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    };
    const present = new Int32Array(threshold + 1).fill(-1);
    for (let i = 0; i < n; i++) {
        if (nums[i] <= threshold) present[nums[i]] = i;
    }
    const anchor = new Int32Array(threshold + 1).fill(-1);
    for (let v = 1; v <= threshold; v++) {
        const i = present[v];
        if (i < 0) continue;
        if (anchor[v] >= 0) union(i, anchor[v]);
        for (let m = 2 * v; m <= threshold; m += v) {
            if (anchor[m] >= 0) union(i, anchor[m]);
            else anchor[m] = i;
        }
    }
    let comps = 0;
    for (let i = 0; i < n; i++) {
        if (find(i) === i) comps++;
    }
    return comps;
};
