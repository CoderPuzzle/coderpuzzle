function minOperations(nums: number[], x: number, k: number): number {
    // Equalizing a window costs sum(|v - t|), minimized when t is a median.
    // A sliding window over a Fenwick tree (compressed values) yields every
    // x-window's cost in O(log n): kth finds the median and prefix count/sum
    // split the window about it. A rolling DP then picks k non-overlapping
    // windows. Max cost ~ x * 2e6 * k = 3e12 < 2^53, so plain numbers are
    // exact throughout.
    const vals = [...new Set(nums)].sort((a, b) => a - b);
    const m = vals.length;
    const comp = new Map<number, number>();
    vals.forEach((v, i) => comp.set(v, i + 1));
    const cnt = new Array<number>(m + 1).fill(0);
    const sm = new Array<number>(m + 1).fill(0);

    const n = nums.length;
    const winCount = n - x + 1;
    const costs = new Array<number>(winCount).fill(0);
    let total = 0;
    for (let i = 0; i < n; i++) {
        let p = comp.get(nums[i])!;
        for (; p <= m; p += p & -p) {
            cnt[p]++;
            sm[p] += nums[i];
        }
        total += nums[i];
        if (i >= x) {
            let q = comp.get(nums[i - x])!;
            for (; q <= m; q += q & -q) {
                cnt[q]--;
                sm[q] -= nums[i - x];
            }
            total -= nums[i - x];
        }
        if (i >= x - 1) {
            const kpos = Math.floor((x + 1) / 2);
            let pos = 0;
            let acc = 0;
            let step = 1;
            while (step * 2 <= m) step *= 2;
            for (; step > 0; step >>= 1) {
                const nxt = pos + step;
                if (nxt <= m && acc + cnt[nxt] < kpos) {
                    pos = nxt;
                    acc += cnt[nxt];
                }
            }
            const midIdx = pos + 1;
            let c = 0;
            let s = 0;
            for (let p = midIdx; p > 0; p -= p & -p) {
                c += cnt[p];
                s += sm[p];
            }
            const med = vals[midIdx - 1];
            costs[i - x + 1] = med * c - s + (total - s) - med * (x - c);
        }
    }

    const INF = Infinity;
    let prev = new Array<number>(winCount).fill(0); // t = 0 windows: cost 0 everywhere
    for (let t = 1; t <= k; t++) {
        const cur = new Array<number>(winCount).fill(INF);
        for (let i = 0; i < winCount; i++) {
            let best = i > 0 ? cur[i - 1] : INF;
            if (t === 1) {
                if (costs[i] < best) {
                    best = costs[i];
                }
            } else if (i >= x) {
                const take = costs[i] + prev[i - x];
                if (take < best) {
                    best = take;
                }
            }
            cur[i] = best;
        }
        prev = cur;
    }
    return prev[winCount - 1];
}
