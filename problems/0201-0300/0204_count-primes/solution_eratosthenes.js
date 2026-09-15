/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    // No primes strictly below 2.
    if (n < 3) return 0;
    // Sieve of Eratosthenes: whatever is never marked composite was not a
    // multiple of anything smaller, so it is prime.
    const isComposite = new Uint8Array(n);
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (!isComposite[i]) {
            count++;
            // Cross off multiples starting at i*i — smaller multiples were
            // marked by their smaller factors.
            if (i * i < n) {
                for (let j = i * i; j < n; j += i) {
                    isComposite[j] = 1;
                }
            }
        }
    }
    return count;
};
