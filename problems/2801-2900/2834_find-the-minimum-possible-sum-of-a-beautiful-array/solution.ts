function minimumPossibleSum(n: number, target: number): number {
    const MOD = 1000000007;

    // a * b % MOD with a, b kept below MOD: split b into 15-bit limbs so every
    // partial product stays below 2^46 and Number arithmetic stays exact
    // (< 2^53). The naive forms reach ~7.5e17, far past that exact range.
    const mulMod = (a: number, b: number): number => {
        a %= MOD;
        b %= MOD;
        const hi = Math.floor(b / 32768);
        const lo = b - hi * 32768;
        return (((a * hi) % MOD) * 32768 + a * lo) % MOD;
    };

    // k * (k + 1) / 2 % MOD — halve the even factor while values are still
    // plain integers, then reduce both factors below MOD for mulMod.
    const triMod = (k: number): number => {
        if (k % 2 === 0) return mulMod(k / 2, k + 1);
        return mulMod((k + 1) / 2, k);
    };

    // Cheaply available prefix 1..k: its two largest distinct values sum to
    // k + (k - 1) <= target - 1 < target, so it never self-conflicts. Every
    // value in (k, target) pairs with an already-taken small number, so the
    // greedy jumps straight past target for the remaining m slots; values >=
    // target only pair with non-positive complements or larger values, so the
    // tail target..target+m-1 is also conflict-free.
    const k = Math.min(n, Math.floor(target / 2));
    const m = n - k;
    // Tail sum over m values starting at target: m * target + m * (m - 1) / 2.
    return (triMod(k) + mulMod(m, target) + (m > 0 ? triMod(m - 1) : 0)) % MOD;
}
