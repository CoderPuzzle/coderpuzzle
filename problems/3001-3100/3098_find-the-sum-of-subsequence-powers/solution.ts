function sumOfPowers(nums: number[], k: number): number {
    const MOD = 1000000007;
    const sorted = nums.slice().sort((a, b) => a - b);
    const n = sorted.length;
    const diffSet = new Set<number>();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            diffSet.add(sorted[j] - sorted[i]);
        }
    }
    const diffs = Array.from(diffSet).sort((a, b) => a - b);

    function mulmod(a: number, b: number): number {
        let res = 0;
        a %= MOD;
        while (b > 0) {
            if (b & 1) res = (res + a) % MOD;
            a = (a * 2) % MOD;
            b = Math.floor(b / 2);
        }
        return res;
    }

    function countAtLeast(d: number): number {
        // number of length-k subsequences with all adjacent gaps >= d
        const splits: number[] = [];
        for (let j = 0; j < n; j++) {
            const target = sorted[j] - d;
            let lo = 0;
            let hi = j;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (sorted[mid] <= target) lo = mid + 1;
                else hi = mid;
            }
            splits.push(lo);
        }
        let prev: number[] = new Array(n).fill(1);
        for (let length = 2; length <= k; length++) {
            const pref: number[] = new Array(n + 1).fill(0);
            for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + prev[i];
            if (pref[n] === 0) return 0;
            const cur: number[] = new Array(n);
            for (let j = 0; j < n; j++) cur[j] = pref[splits[j]] % MOD;
            prev = cur;
        }
        let total = 0;
        for (let i = 0; i < n; i++) total += prev[i];
        return total % MOD;
    }

    let ans = 0;
    let prevF = 0;
    for (let idx = diffs.length - 1; idx >= 0; idx--) {
        const d = diffs[idx];
        const f = countAtLeast(d);
        let g = (f - prevF) % MOD;
        if (g < 0) g += MOD;
        ans = (ans + mulmod(d % MOD, g)) % MOD;
        prevF = f;
    }
    return ans;
}
