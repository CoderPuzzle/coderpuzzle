/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctPrimeFactors = function (nums) {
    // The product never gets built (per the hint, it is astronomically
    // large): a prime divides the product exactly when it divides some
    // single element. Factor each element by trial division, peeling every
    // copy of a found factor so only primes escape the loop; values are
    // <= 1000, far inside Number's exact range.
    const primes = new Set();
    for (const value of nums) {
        let rest = value;
        for (let d = 2; d * d <= rest; ++d) {
            if (rest % d === 0) {
                primes.add(d);
                while (rest % d === 0) rest /= d;
            }
        }
        if (rest > 1) primes.add(rest);
    }
    return primes.size;
};
