function countSequences(nums: number[], k: number): number {
    // Every element is 1..6, hence 5-smooth: val is always the rational
    // 2^a * 3^b * 5^c, and each action shifts the exponent triple by +e,
    // -e, or 0, where e is the element's own (2, 3, 5) split. A sequence
    // wins exactly when the final triple matches k's, so k keeping any
    // prime factor above 5 is an immediate 0. A triple packs into one key
    // ((a + 40) * 41 + b + 20) * 41 + (c + 20): |a| <= 2n <= 38 and
    // |b|, |c| <= n <= 19 keep the low digits inside a stride of 41, so
    // key +/- the element's packed step never borrows across digits.
    const primes: number[] = [2, 3, 5];
    const t: number[] = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        while (k % primes[i] === 0) {
            k /= primes[i];
            t[i]++;
        }
    }
    if (k !== 1) {
        return 0;
    }
    const target = ((t[0] + 40) * 41 + (t[1] + 20)) * 41 + (t[2] + 20);
    let dp: Map<number, number> = new Map();
    dp.set((40 * 41 + 20) * 41 + 20, 1);
    for (const v of nums) {
        const e: number[] = [0, 0, 0];
        let w = v;
        for (let i = 0; i < 3; i++) {
            while (w % primes[i] === 0) {
                w /= primes[i];
                e[i]++;
            }
        }
        const step = (e[0] * 41 + e[1]) * 41 + e[2];
        const ndp: Map<number, number> = new Map();
        for (const [key, wt] of dp) {
            // multiply by v, leave val alone, divide by v
            for (const nk of [key + step, key, key - step]) {
                ndp.set(nk, (ndp.get(nk) || 0) + wt);
            }
        }
        dp = ndp;
    }
    // Every count is bounded by the total sequence count
    // 3^19 = 1,162,261,467 < 2^53, exact as a JS number.
    const ans = dp.get(target);
    return ans === undefined ? 0 : ans;
}
