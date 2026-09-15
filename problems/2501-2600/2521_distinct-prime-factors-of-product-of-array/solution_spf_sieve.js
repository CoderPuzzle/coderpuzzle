/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctPrimeFactors = function (nums) {
    // The prime-support pin is the same; the factor source changes. One
    // sieve pass records the smallest prime factor of every value up to
    // max(nums), and each element then falls apart by repeated division:
    // the next piece of the remaining quotient is always a table lookup,
    // never a candidate search. Peeling each prime out completely keeps
    // the walk on sieve entries; values are <= 1000, so an element holds
    // at most 9 prime pieces (2^10 overshoots).
    const limit = Math.max(...nums);
    const spf = new Array(limit + 1);
    for (let i = 0; i <= limit; ++i) spf[i] = i;
    for (let i = 2; i * i <= limit; ++i) {
        if (spf[i] === i) {
            for (let j = i * i; j <= limit; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }
    const primes = new Set();
    for (const value of nums) {
        let rest = value;
        while (rest > 1) {
            const p = spf[rest];
            primes.add(p);
            while (rest % p === 0) rest /= p;
        }
    }
    return primes.size;
};
