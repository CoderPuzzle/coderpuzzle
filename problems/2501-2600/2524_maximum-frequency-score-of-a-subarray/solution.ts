function maxFrequencyScore(nums: number[], k: number): number {
    const MOD = 1000000007;
    // MOD < 2^30. With a, b < MOD the split multiply keeps every
    // intermediate under 2^46 < 2^53, so Number arithmetic stays exact;
    // a direct a * b could reach ~10^18 and silently lose low bits.
    const mulmod = (a: number, b: number): number => {
        const aHi = Math.floor(a / 32768);
        const aLo = a % 32768;
        return (((aHi * b) % MOD) * 32768 + aLo * b) % MOD;
    };
    const qpow = (base: number, exp: number): number => {
        let result = 1;
        while (exp > 0) {
            if (exp & 1) result = mulmod(result, base);
            base = mulmod(base, base);
            exp >>= 1;
        }
        return result;
    };
    // Sliding window maintaining the score as the sum of per-value power
    // terms; a slide replaces only the entering and leaving values'
    // terms, which is O(log MOD) modular multiplications per step.
    const counts = new Map<number, number>();
    const terms = new Map<number, number>();
    let score = 0;
    let best = 0;
    for (let i = 0; i < nums.length; ++i) {
        const value = nums[i];
        const c = (counts.get(value) || 0) + 1;
        counts.set(value, c);
        const term = qpow(value, c);
        score = (score + term - (terms.get(value) || 0) + MOD) % MOD;
        terms.set(value, term);
        if (i >= k) {
            const leaving = nums[i - k];
            const lc = counts.get(leaving)!;
            counts.set(leaving, lc - 1);
            if (lc === 1) {
                // the leaving value exits entirely; its term vanishes
                score = (score - terms.get(leaving)! + MOD) % MOD;
                terms.delete(leaving);
            } else {
                const lt = qpow(leaving, lc - 1);
                score = (score + lt - terms.get(leaving)! + MOD) % MOD;
                terms.set(leaving, lt);
            }
        }
        if (i >= k - 1 && score > best) best = score;
    }
    return best;
}
