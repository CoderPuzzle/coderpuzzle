/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
    // Every super ugly number past 1 is a listed prime times a smaller
    // one, so build the sequence in order: one pointer per prime into
    // the built prefix, plus its cached candidate primes[p] * ugly[index[p]].
    // The next value is the smallest candidate; advancing EVERY pointer
    // whose candidate hit that minimum keeps duplicates (6 = 2 * 3 = 3 * 2)
    // out of the sequence. Products stay exact: even a candidate past the
    // answer by one factor of the largest prime fits a double's 53 bits.
    const ugly = new Array(n).fill(1);
    const index = new Array(primes.length).fill(0);
    const candidate = primes.slice();
    for (let i = 1; i < n; ++i) {
        let next = candidate[0];
        for (let j = 1; j < candidate.length; ++j) {
            if (candidate[j] < next) next = candidate[j];
        }
        ugly[i] = next;
        for (let p = 0; p < primes.length; ++p) {
            if (candidate[p] === next) candidate[p] = primes[p] * ugly[++index[p]];
        }
    }
    return ugly[n - 1];
};
