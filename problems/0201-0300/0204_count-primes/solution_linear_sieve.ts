function countPrimes(n: number): number {
    // No primes strictly below 2.
    if (n < 3) return 0;
    // spf[x] = the smallest prime factor of x (0 while x is untouched); the
    // primes found so far collect in ascending order.
    const spf = new Int32Array(n);
    const primes: number[] = [];
    for (let i = 2; i < n; i++) {
        if (spf[i] === 0) {
            // Nothing smaller ever marked i, so i is prime (and its own
            // smallest prime factor).
            primes.push(i);
            spf[i] = i;
        }
        // Mark i*p composite for every prime p up to spf[i]: each composite
        // gets written exactly once, by its smallest factor.
        const limit = spf[i];
        for (const p of primes) {
            if (p > limit || i * p >= n) break;
            spf[i * p] = p;
        }
    }
    return primes.length;
}
