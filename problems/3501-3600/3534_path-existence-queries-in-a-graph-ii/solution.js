/**
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {number[]}
 */
var pathExistenceQueries = function (n, nums, maxDiff, queries) {
    // In value-sorted order each node reaches a contiguous range of
    // positions, so the farthest position reachable in k hops composes
    // monotonically and binary lifting on the one-hop reach returns hop
    // counts in O(log n) per query.
    const order = [...Array(n).keys()].sort((a, b) => nums[a] - nums[b]);
    const rank = new Array(n).fill(0);
    for (let pos = 0; pos < n; pos++) rank[order[pos]] = pos;
    const comp = new Array(n).fill(0);
    for (let pos = 1; pos < n; pos++) {
        comp[pos] = comp[pos - 1] + (nums[order[pos]] - nums[order[pos - 1]] > maxDiff ? 1 : 0);
    }
    const reach = new Array(n).fill(0);
    let j = 0;
    for (let i = 0; i < n; i++) {
        if (j < i) j = i;
        while (j + 1 < n && nums[order[j + 1]] - nums[order[i]] <= maxDiff) j++;
        reach[i] = j;
    }

    // up[k][i] = farthest position reachable from i in at most 2^k hops.
    let logn = 1;
    while (1 << logn < n) logn++;
    logn++;
    const up = [reach];
    for (let k = 1; k < logn; k++) {
        const prev = up[k - 1];
        const level = new Array(n);
        for (let i = 0; i < n; i++) level[i] = prev[prev[i]];
        up.push(level);
    }

    return queries.map(([u, v]) => {
        let su = rank[u],
            sv = rank[v];
        if (comp[su] !== comp[sv]) return -1;
        if (su === sv) return 0;
        if (su > sv) [su, sv] = [sv, su];
        let hops = 0;
        for (let k = logn - 1; k >= 0; k--) {
            if (up[k][su] < sv) {
                su = up[k][su];
                hops += 1 << k;
            }
        }
        return hops + 1;
    });
};
