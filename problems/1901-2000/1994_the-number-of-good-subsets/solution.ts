function numberOfGoodSubsets(nums: number[]): number {
    const MOD = 1000000007;
    const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    const maskOf = (x: number): number => {
        // Map a value <= 30 onto its 10-bit prime mask; -1 marks values
        // divisible by a prime square (4, 8, 9, ...) which can never sit in
        // a good subset.
        let mask = 0;
        for (let i = 0; i < PRIMES.length; i++) {
            if (x % PRIMES[i] === 0) {
                mask |= 1 << i;
                x /= PRIMES[i];
                if (x % PRIMES[i] === 0) {
                    return -1;
                }
            }
        }
        return mask;
    };

    // Compress to frequencies: subsets are distinguished by index, so equal
    // values contribute multiplicity.
    const count = new Map<number, number>();
    for (const v of nums) {
        count.set(v, (count.get(v) || 0) + 1);
    }

    const size = 1 << PRIMES.length;
    // dp[mask] = ways to pick indices whose product's prime set is exactly
    // mask -- a 0/1-knapsack over prime masks.
    const dp = new Array<number>(size).fill(0);
    dp[0] = 1;
    for (const [value, freq] of count) {
        if (value === 1) {
            continue; // empty mask; handled separately at the end
        }
        const mask = maskOf(value);
        if (mask <= 0) {
            continue;
        }
        // Decreasing mask order keeps one value from being used twice in a
        // subset; only disjoint states (no shared prime) may extend.
        for (let prev = size - 1; prev >= 0; prev--) {
            if (dp[prev] !== 0 && (prev & mask) === 0) {
                dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD;
            }
        }
    }
    // Good subsets need at least one prime: sum every non-empty mask.
    let total = 0;
    for (let i = 1; i < size; i++) {
        total = (total + dp[i]) % MOD;
    }
    // Each 1 freely appends to any good subset without changing the
    // product: a factor 2^count[1].
    const ones = count.get(1) || 0;
    let pow = 1;
    for (let i = 0; i < ones; i++) {
        pow = (pow * 2) % MOD;
    }
    // total * pow can exceed 2^53; multiply exactly via doubling
    let a = total;
    let b = pow;
    let product = 0;
    while (b > 0) {
        if (b & 1) {
            product = (product + a) % MOD;
        }
        a = (a + a) % MOD;
        b = Math.floor(b / 2);
    }
    return product;
}
