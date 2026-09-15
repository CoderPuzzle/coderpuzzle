/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function (n, limit) {
    // Inclusion-exclusion on the cap. Unbounded distributions of n candies
    // to 3 children number C(n + 2, 2). A child over the cap has limit + 1
    // or more, so hand that child limit + 1 candies up front and count the
    // rest: C(n - (limit + 1) + 2, 2) per over-cap child, added back in
    // pairs C(3, 2) * C(n - 2 * (limit + 1) + 2, 2). The triple term never
    // fires: it needs n >= 3 * (limit + 1), already past the 3 * limit
    // total capacity, so those inputs are 0. The guard also keeps every
    // live term below 2 * n^2 / 9 + ... < 7 * 10^15, inside Number's exact
    // 2^53 range; the binomial halves its even factor first because the
    // raw product (rest + 2) * (rest + 1) reaches ~10^16.
    if (n > 3 * limit) {
        return 0;
    }
    const binom = [1, 3, 3];
    let total = 0;
    for (let k = 0; k <= 2; ++k) {
        const rest = n - k * (limit + 1);
        if (rest < 0) {
            break;
        }
        const hi = rest + 2;
        const choose2 = hi % 2 === 0 ? (hi / 2) * (hi - 1) : hi * ((hi - 1) / 2);
        total += (k % 2 === 0 ? 1 : -1) * binom[k] * choose2;
    }
    return total;
};
