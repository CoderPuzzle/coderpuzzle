/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var nthMagicalNumber = function (n, a, b) {
    // Divisible by a or b, so inclusion-exclusion counts the magical
    // numbers up to x as x/a + x/b - x/lcm(a, b) — the overlap holds
    // exactly the multiples of the least common multiple. That count
    // never decreases and rises by one exactly on magical numbers, so
    // the nth magical number is the smallest x whose count reaches n.
    // Binary search over [1, n*min(a, b)] finds it — the top is the nth
    // multiple of the smaller value, itself magical, so it is a valid
    // ceiling. The answer reaches 4e13 at the bound, exact as a double
    // far below 2^53.
    let g = a;
    let y = b;
    while (y !== 0) {
        const t = g % y;
        g = y;
        y = t;
    }
    const lcm = (a / g) * b;
    let lo = 1;
    let hi = n * Math.min(a, b);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm) >= n) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo % 1_000_000_007;
};
