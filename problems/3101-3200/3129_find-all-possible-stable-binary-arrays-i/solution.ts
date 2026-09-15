function numberOfStableArrays(zero: number, one: number, limit: number): number {
    const MOD = 1000000007;
    // Count prefixes by usage and last character: f0[a][b] ends in 0,
    // f1[a][b] ends in 1. Each new character extends some block of at
    // most `limit` copies; looping over block lengths collapses into a
    // sliding window over pref0, the row-wise prefix sums of f0, keeping
    // the whole build bottom-up and iterative. Every stored value is
    // below MOD and every accumulated window sum below 200 * MOD <
    // 2^38 < 2^53, so number arithmetic stays exact throughout.
    const f0: number[][] = Array.from({ length: zero + 1 }, () => new Array(one + 1).fill(0));
    const f1: number[][] = Array.from({ length: zero + 1 }, () => new Array(one + 1).fill(0));
    const pref0: number[][] = Array.from({ length: zero + 1 }, () => new Array(one + 2).fill(0));
    for (let a = 1; a <= Math.min(limit, zero); ++a) {
        f0[a][0] = 1;
        pref0[a][1] = 1;
    }
    for (let b = 1; b <= one; ++b) {
        const low = Math.max(0, b - limit);
        for (let a = 0; a <= zero; ++a) {
            if (a === 0) {
                f1[a][b] = b <= limit ? 1 : 0;
            } else {
                f1[a][b] = (((pref0[a][b] - pref0[a][low]) % MOD) + MOD) % MOD;
            }
        }
        let running = 0;
        for (let a = 1; a <= zero; ++a) {
            running += f1[a - 1][b];
            if (a - limit - 1 >= 0) {
                running -= f1[a - limit - 1][b];
                running = ((running % MOD) + MOD) % MOD;
            }
            f0[a][b] = running % MOD;
        }
        for (let a = 0; a <= zero; ++a) {
            pref0[a][b + 1] = (pref0[a][b] + f0[a][b]) % MOD;
        }
    }
    return (f0[zero][one] + f1[zero][one]) % MOD;
}
