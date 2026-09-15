function minimumIncrements(nums: number[], target: number[]): number {
    // An optimal plan serves each group of targets with a single element
    // (a multiple of the group's lcm), so it uses at most m elements in
    // total, and an exchange argument keeps every group's element among
    // the m cheapest servants of that group — the dp below only sweeps
    // those few candidates. Subsets whose lcm exceeds CAP are skipped:
    // serving such a subset with one element costs more than serving its
    // targets separately ever can, and the lcm fold stays below 10^9 —
    // every value is exact as a Number, far below 2^53.
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const n = nums.length;
    const m = target.length;
    const full = (1 << m) - 1;
    const CAP = 100000;
    const INF = Infinity;
    const lcms: number[] = new Array(full + 1).fill(1);
    for (let mask = 1; mask <= full; mask++) {
        const low = mask & -mask;
        let l = lcms[mask ^ low];
        let idx = 0;
        for (let b = low; b > 1; b >>= 1) {
            idx++;
        }
        l = (l / gcd(l, target[idx])) * target[idx];
        lcms[mask] = l <= CAP ? l : 0;
    }
    const cand = new Array<boolean>(n).fill(false);
    for (let sub = 1; sub <= full; sub++) {
        const l = lcms[sub];
        if (l === 0) {
            continue;
        }
        const bestCost: number[] = new Array(m).fill(INF);
        const bestIdx: number[] = new Array(m).fill(-1);
        for (let i = 0; i < n; i++) {
            const cost = (l - (nums[i] % l)) % l;
            if (cost >= bestCost[m - 1]) {
                continue;
            }
            let r = m - 1;
            while (r > 0 && bestCost[r - 1] > cost) {
                bestCost[r] = bestCost[r - 1];
                bestIdx[r] = bestIdx[r - 1];
                r--;
            }
            bestCost[r] = cost;
            bestIdx[r] = i;
        }
        for (const idx of bestIdx) {
            if (idx >= 0) {
                cand[idx] = true;
            }
        }
    }
    let dp: number[] = new Array(full + 1).fill(INF);
    dp[0] = 0;
    let ndp: number[] = new Array(full + 1).fill(INF);
    for (let i = 0; i < n; i++) {
        if (!cand[i]) {
            continue;
        }
        const x = nums[i];
        for (let k = 0; k <= full; k++) {
            ndp[k] = dp[k];
        }
        for (let mask = 0; mask <= full; mask++) {
            const base = dp[mask];
            if (base === INF) {
                continue;
            }
            const comp = full ^ mask;
            for (let sub = comp; sub !== 0; sub = (sub - 1) & comp) {
                const l = lcms[sub];
                if (l === 0) {
                    continue;
                }
                const candCost = base + ((l - (x % l)) % l);
                if (candCost < ndp[mask | sub]) {
                    ndp[mask | sub] = candCost;
                }
            }
        }
        const tmp = dp;
        dp = ndp;
        ndp = tmp;
    }
    return dp[full];
}
