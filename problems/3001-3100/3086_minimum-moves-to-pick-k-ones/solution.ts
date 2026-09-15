function minimumMoves(nums: number[], k: number, maxChanges: number): number {
    const ones: number[] = [0]; // 1-indexed positions of ones
    const prefix: number[] = [0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            ones.push(i);
            prefix.push(prefix[prefix.length - 1] + i);
        }
    }
    const m = ones.length - 1;
    const INF = Infinity;

    function windowCost(t: number): number {
        if (t === 0) return 0;
        if (t > m) return INF;
        let best = INF;
        for (let l = 1; l <= m - t + 1; l++) {
            const r = l + t - 1;
            const pos = Math.floor((l + r) / 2);
            const leftCnt = pos - l;
            const rightCnt = r - pos;
            const left = leftCnt * ones[pos] - (prefix[pos - 1] - prefix[l - 1]);
            const right = prefix[r] - prefix[pos] - rightCnt * ones[pos];
            const cost = left + right;
            if (cost < best) best = cost;
        }
        return best;
    }

    function total(t: number): number {
        const wc = windowCost(t);
        if (wc === INF) return INF;
        return wc + 2 * (k - t);
    }

    let lo = Math.max(0, k - maxChanges);
    let hi = Math.min(k, m);
    if (lo > hi) return 0;
    while (hi - lo > 4) {
        const m1 = lo + Math.floor((hi - lo) / 3);
        const m2 = hi - Math.floor((hi - lo) / 3);
        if (total(m1) <= total(m2)) {
            hi = m2;
        } else {
            lo = m1;
        }
    }
    let ans = Infinity;
    for (let t = lo; t <= hi; t++) {
        const v = total(t);
        if (v < ans) ans = v;
    }
    return ans;
}
