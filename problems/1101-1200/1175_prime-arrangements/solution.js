/**
 * @param {number} n
 * @return {number}
 */
var numPrimeArrangements = function (n) {
    var MOD = 1000000007;

    // Sieve of Eratosthenes up to n.
    var isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    if (n >= 1) {
        isPrime[1] = false;
    }
    for (var p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (var multiple = p * p; multiple <= n; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }
    var primes = 0;
    for (var m = 0; m <= n; m++) {
        if (isPrime[m]) {
            primes++;
        }
    }

    // Primes may permute over prime indices; everything else (1 and the
    // composites) permutes over the rest. Independent choices.
    var result = 1;
    for (var k = 2; k <= primes; k++) {
        result = (result * k) % MOD;
    }
    for (var k2 = 2; k2 <= n - primes; k2++) {
        result = (result * k2) % MOD;
    }
    return result;
};
