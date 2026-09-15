function maxIncreasingGroups(usageLimits: number[]): number {
    // Strictly increasing lengths force the optimal sizes to be 1..x —
    // trimming a larger group down keeps every condition valid. Number i
    // may appear at most once per group, so across any chosen m groups
    // it supplies at most min(limits[i], m) elements, while the m largest
    // groups (sizes x-m+1..x) demand m*(2*x-m+1)/2. That supply test must
    // hold for EVERY m <= x (the full total alone lies: [4,4,1,1] sums to
    // exactly what four groups need yet cannot staff a 4-group plus a
    // 3-group), and when all of them hold an assignment exists (bipartite
    // feasibility / integral flow). Sort ascending, sweep g[m] =
    // sum(min(v, m)) with a forward pointer, binary search the largest x.
    const arr = [...usageLimits].sort((a, b) => a - b);
    const n = arr.length;
    // g[m] peaks near 10^14 — exact as a Number, which stays exact < 2^53.
    const g: number[] = new Array(n + 1).fill(0);
    let p = 0;
    for (let m = 1; m <= n; m++) {
        while (p < n && arr[p] < m) {
            p += 1;
        }
        // n - p is the count of entries >= m; each adds one element.
        g[m] = g[m - 1] + (n - p);
    }
    const feasible = (x: number): boolean => {
        for (let m = 1; m <= x; m++) {
            if (g[m] < (m * (2 * x - m + 1)) / 2) {
                return false;
            }
        }
        return true;
    };
    let lo = 0;
    let hi = n;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
