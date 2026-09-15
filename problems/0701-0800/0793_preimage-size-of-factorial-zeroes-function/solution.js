/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function (k) {
    function zeta(x) {
        // Trailing zeroes of x! come from factors of 5 (2s are
        // plentiful): each multiple of p = 5, 25, 125, ... adds one.
        let count = 0;
        let p = 5;
        while (p <= x) {
            count += Math.floor(x / p);
            p *= 5;
        }
        return count;
    }

    // zeta is nondecreasing, so bisect for the smallest x with
    // zeta(x) >= k; zeta(5*(k+1)) >= k+1 makes this bound safe.
    let lo = 0;
    let hi = 5 * (k + 1) + 10;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (zeta(mid) < k) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    // Each block 5m..5m+4 shares one zeta value, so an achieved k
    // has exactly five preimages; a k skipped at a multiple of 25
    // has none.
    return zeta(lo) === k ? 5 : 0;
};
