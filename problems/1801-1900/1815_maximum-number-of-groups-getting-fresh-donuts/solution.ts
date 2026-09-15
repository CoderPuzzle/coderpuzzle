function maxHappyGroups(batchSize: number, groups: number[]): number {
    // A group is happy when the donut count before it is 0 mod batchSize,
    // so the ordering matters only through remainders. Remainder-0 groups
    // are always happy, complementary remainders pair into zero-sum
    // blocks, and the memoized DP places what is left. Each remainder
    // class count fits 5 bits (n <= 30), so a packed state key stays
    // under 45 bits, exact as a number.
    const k = batchSize;
    const freq = new Array<number>(k).fill(0);
    for (const g of groups) {
        freq[g % k]++;
    }
    let ans = freq[0];
    freq[0] = 0;
    for (let i = 1, j = k - 1; i < j; i++, j--) {
        const m = Math.min(freq[i], freq[j]);
        ans += m;
        freq[i] -= m;
        freq[j] -= m;
    }
    if (k % 2 === 0) {
        const h = k / 2;
        ans += Math.floor(freq[h] / 2);
        freq[h] %= 2;
    }
    let state = 0;
    for (let c = 1; c < k; c++) {
        state += freq[c] * 2 ** (5 * (c - 1));
    }
    const memo = new Map<number, number>();
    const dp = (state: number, r: number): number => {
        if (state === 0) {
            return 0;
        }
        const key = state * 16 + r;
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        let best = 0;
        for (let c = 1; c < k; c++) {
            const count = Math.floor(state / 2 ** (5 * (c - 1))) % 32;
            if (count > 0) {
                const gain = r === 0 ? 1 : 0;
                const cand = gain + dp(state - 2 ** (5 * (c - 1)), (r + c) % k);
                if (cand > best) {
                    best = cand;
                }
            }
        }
        memo.set(key, best);
        return best;
    };
    return ans + dp(state, 0);
}
