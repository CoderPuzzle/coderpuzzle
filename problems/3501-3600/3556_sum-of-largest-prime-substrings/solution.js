/**
 * @param {string} s
 * @return {number}
 */
var sumOfLargestPrimes = function (s) {
    // Collect distinct substring values (leading zeros vanish on parse),
    // walk them from the largest down, and primality-test each by trial
    // division until three primes have been summed. Every substring of a
    // length-10 digit string is <= 9999999999 < 2^53, so Number arithmetic
    // (including f*f in the trial division) is exact throughout.
    const n = s.length;
    const values = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            values.add(Number(s.slice(i, j)));
        }
    }
    const isPrime = (v) => {
        if (v < 2) return false;
        if (v % 2 === 0) return v === 2;
        for (let f = 3; f * f <= v; f += 2) {
            if (v % f === 0) return false;
        }
        return true;
    };
    let total = 0;
    let found = 0;
    for (const v of [...values].sort((a, b) => b - a)) {
        if (isPrime(v)) {
            total += v;
            found++;
            if (found === 3) {
                break;
            }
        }
    }
    return total;
};
