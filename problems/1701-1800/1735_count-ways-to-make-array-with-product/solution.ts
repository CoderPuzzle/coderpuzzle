function waysToFillArray(queries: number[][]): number[] {
    const MOD = 1000000007n;
    const MAX = 20000;

    const fact: bigint[] = new Array(MAX + 1);
    const invFact: bigint[] = new Array(MAX + 1);
    fact[0] = 1n;
    for (let i = 1; i <= MAX; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    }
    const modPow = (base: bigint, exp: bigint): bigint => {
        let result = 1n;
        let b = base % MOD;
        let e = exp;
        while (e > 0n) {
            if (e & 1n) result = (result * b) % MOD;
            b = (b * b) % MOD;
            e >>= 1n;
        }
        return result;
    };
    // One Fermat inversion at the top; running it backwards yields every
    // smaller inverse factorial with a single multiplication each.
    invFact[MAX] = modPow(fact[MAX], MOD - 2n);
    for (let i = MAX; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % MOD;
    }

    const comb = (n: number, r: number): bigint => {
        if (r < 0 || r > n) return 0n;
        return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
    };

    const primeExponents = (k: number): number[] => {
        // Trial division up to sqrt(k) collects each prime's exponent.
        const exponents: number[] = [];
        let d = 2;
        let v = k;
        while (d * d <= v) {
            if (v % d === 0) {
                let count = 0;
                while (v % d === 0) {
                    v = Math.floor(v / d);
                    count++;
                }
                exponents.push(count);
            }
            d++;
        }
        // A leftover greater than 1 is a prime of exponent 1.
        if (v > 1) exponents.push(1);
        return exponents;
    };

    const answers: number[] = [];
    for (const [n, k] of queries) {
        let ways = 1n;
        // Primes never interact, so the per-prime counts multiply: spreading
        // x copies of one prime over n slots is stars and bars,
        // C(x + n - 1, n - 1).
        for (const exponent of primeExponents(k)) {
            ways = (ways * comb(exponent + n - 1, n - 1)) % MOD;
        }
        answers.push(Number(ways));
    }
    return answers;
}
