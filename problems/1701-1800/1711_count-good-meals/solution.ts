function countPairs(deliciousness: number[]): number {
    // A good meal needs two values summing to a power of two. Values
    // are capped at 2^20, so a sum never exceeds 2^21: exactly the 22
    // powers 2^0 .. 2^21 are possible targets and nothing else.
    // Counting how often each value occurs settles every pair at once.
    // For a distinct value v and a power p, the mate w = p - v
    // contributes count(v) * count(w) pairs when w > v, while w == v
    // (p equal to 2v exactly) contributes count(v) choose 2: the pairs
    // of equal-valued items at different indices. The raw total
    // reaches n * (n - 1) / 2, about 5 * 10^9, exact as a number since
    // every term stays under 2^53, and reduces mod 10^9 + 7 at the end.
    const MOD = 1_000_000_007;
    const count = new Map<number, number>();
    for (const value of deliciousness) {
        count.set(value, (count.get(value) ?? 0) + 1);
    }
    let total = 0;
    for (const [value, c] of count) {
        for (let power = 1; power <= 1 << 21; power <<= 1) {
            const mate = power - value;
            if (mate > value) {
                total += c * (count.get(mate) ?? 0);
            } else if (mate === value) {
                total += (c * (c - 1)) / 2;
            }
        }
    }
    return total % MOD;
}
