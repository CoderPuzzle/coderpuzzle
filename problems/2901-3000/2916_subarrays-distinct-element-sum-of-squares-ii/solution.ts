function sumCounts(nums: number[]): number {
    // Fenwick pair over the per-start distinct counts d[j] of the windows
    // ending at the current index: range-add and range-sum of exact counts.
    // Range sums reach n(n+1)/2 ~ 5*10^9; the largest intermediate,
    // running + 2*T + count, stays near 1.1*10^10 — both far under 2^53, so
    // plain numbers carry everything exactly.
    const MOD = 1000000007;
    const n = nums.length;
    const b1 = new Array<number>(n + 2).fill(0);
    const b2 = new Array<number>(n + 2).fill(0);
    const add = (l: number, r: number, v: number): void => {
        for (let x = l; x <= n + 1; x += x & -x) {
            b1[x] += v;
            b2[x] += v * (l - 1);
        }
        for (let x = r + 1; x <= n + 1; x += x & -x) {
            b1[x] -= v;
            b2[x] -= v * r;
        }
    };
    const prefix = (x: number): number => {
        const x0 = x;
        let s1 = 0;
        let s2 = 0;
        while (x > 0) {
            s1 += b1[x];
            s2 += b2[x];
            x -= x & -x;
        }
        return s1 * x0 - s2;
    };
    const last = new Array<number>(100001).fill(-1);
    let answer = 0;
    let running = 0;
    for (let i = 0; i < n; ++i) {
        const lo = last[nums[i]] + 2;
        // Windows opened in (last, i-1] each gain one distinct value, so
        // their squares grow by 2*d + 1; the fresh window contributes 1^2.
        // T is the exact pre-increment sum over the gaining range.
        const t = lo <= i ? prefix(i) - prefix(lo - 1) : 0;
        running = (running + 2 * t + (i - lo + 2)) % MOD;
        answer = (answer + running) % MOD;
        if (lo <= i) {
            add(lo, i, 1);
        }
        add(i + 1, i + 1, 1);
        last[nums[i]] = i;
    }
    return answer;
}
