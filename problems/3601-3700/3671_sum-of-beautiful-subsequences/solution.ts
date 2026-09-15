function totalBeauty(nums: number[]): number {
    const MOD = 1_000_000_007;
    let maxa = 0;
    for (const v of nums) maxa = Math.max(maxa, v);
    // Smallest-prime-factor sieve: factorizes every distinct value once so
    // its divisors can be expanded cheaply, and each element's index lands
    // in one bucket per divisor. Bucket g then holds, in original order,
    // every position whose value is divisible by g.
    const spf: number[] = Array.from({ length: maxa + 1 }, (_, i) => i);
    for (let i = 2; i * i <= maxa; ++i) {
        if (spf[i] === i) {
            for (let j = i * i; j <= maxa; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }
    const buckets: number[][] = Array.from({ length: maxa + 1 }, () => []);
    const cache = new Map<number, number[]>();
    for (let index = 0; index < nums.length; ++index) {
        const value = nums[index];
        if (!cache.has(value)) {
            const divisors = [1];
            let rest = value;
            while (rest > 1) {
                const prime = spf[rest];
                let times = 0;
                while (rest % prime === 0) {
                    rest /= prime;
                    rest |= 0;
                    ++times;
                }
                const seed = divisors.length;
                for (let t = 0; t < times; ++t) {
                    const power = Math.pow(prime, t + 1);
                    for (let k = 0; k < seed; ++k) divisors.push(divisors[k] * power);
                }
            }
            cache.set(value, divisors);
        }
        for (const d of cache.get(value)!) buckets[d].push(index);
    }
    // cnt[g] counts strictly increasing subsequences whose elements are all
    // divisible by g — exactly those whose GCD is a multiple of g. Walking
    // bucket g in index order, an element contributes one plus the weight
    // already accumulated at strictly smaller scaled values, which is the
    // prefix sum a Fenwick tree keeps over value ranks. Every stored term
    // is reduced below the modulus at write time, so a prefix sum adds at
    // most ~log2(maxa) sub-modulus terms — far below 2^53, where doubles
    // stay exact.
    const cnt: number[] = new Array(maxa + 1).fill(0);
    for (let g = 1; g <= maxa; ++g) {
        const positions = buckets[g];
        if (positions.length === 0) continue;
        const size = Math.floor(maxa / g);
        const fen: number[] = new Array(size + 1).fill(0);
        let total = 0;
        for (const i of positions) {
            const w = Math.floor(nums[i] / g);
            let acc = 0;
            for (let j = w - 1; j > 0; j &= j - 1) acc += fen[j];
            const ways = (acc + 1) % MOD;
            for (let j = w; j <= size; j += j & -j) fen[j] = (fen[j] + ways) % MOD;
            total += ways;
        }
        cnt[g] = total % MOD;
    }
    // Descending sweep converts divisible-by counts into exactly-g counts:
    // by the time g is reached, every proper multiple has been finalized and
    // can be subtracted out. g * F[g] stays below 7e4 * MOD < 2^53, and the
    // answer is reduced after every term.
    let answer = 0;
    const exact: number[] = new Array(maxa + 1).fill(0);
    for (let g = maxa; g >= 1; --g) {
        let f = cnt[g];
        for (let k = 2 * g; k <= maxa; k += g) f -= exact[k];
        f %= MOD;
        if (f < 0) f += MOD;
        if (f !== 0) answer = (answer + g * f) % MOD;
        exact[g] = f;
    }
    return answer;
}
