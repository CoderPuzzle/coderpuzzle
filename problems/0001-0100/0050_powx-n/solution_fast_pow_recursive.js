/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    const power = (base, exp) => {
        // Exponentiation by halving: compute the square of the half-size
        // subproblem once, then use it once (even exp) or twice (odd) —
        // x^n = (x^(n/2))^2, times x when exp is odd.
        if (exp === 0) {
            // Base case: any nonzero base to the zero is 1.0.
            return 1.0;
        }
        const half = power(base, Math.floor(exp / 2));
        if (exp % 2 === 0) {
            return half * half;
        }
        // One leftover factor of x for the odd exponent.
        return half * half * base;
    };
    // By symmetry x^n = 1 / x^(-n); doubles hold 2^31 with no overflow.
    if (n < 0) return 1.0 / power(x, -n);
    return power(x, n);
};
