/**
 * @param {number} n
 * @return {number}
 */
var largestPrime = function (n) {
    // Sieve once: it answers primality for every prime and for every
    // running total the scan below produces.
    const sieve = new Uint8Array(n + 1).fill(1);
    sieve[0] = 0;
    sieve[1] = 0;
    for (let i = 2; i * i <= n; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) sieve[j] = 0;
        }
    }
    // Prefix sums of the prime sequence are exactly the consecutive prime
    // sums starting from 2; totals only grow, so the last prime one seen
    // before the total exceeds n is the largest. The largest total here is
    // below 3.8 * 10^11, far inside Number's exact integer range of 2^53,
    // so plain arithmetic never loses precision.
    let total = 0;
    let best = 0;
    for (let p = 2; p <= n; p++) {
        if (!sieve[p]) continue;
        total += p;
        if (total > n) break;
        if (sieve[total]) best = total;
    }
    return best;
};
