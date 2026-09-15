function numPrimeArrangements(n: number): number {
    const MOD = 1000000007;

    // Sieve of Eratosthenes up to n.
    const isPrime = new Array<boolean>(n + 1).fill(true);
    isPrime[0] = false;
    if (n >= 1) {
        isPrime[1] = false;
    }
    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let multiple = p * p; multiple <= n; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }
    let primes = 0;
    for (let m = 0; m <= n; m++) {
        if (isPrime[m]) {
            primes++;
        }
    }

    // Primes may permute over prime indices; everything else (1 and the
    // composites) permutes over the rest. Independent choices.
    let result = 1;
    for (let k = 2; k <= primes; k++) {
        result = (result * k) % MOD;
    }
    for (let k2 = 2; k2 <= n - primes; k2++) {
        result = (result * k2) % MOD;
    }
    return result;
}
