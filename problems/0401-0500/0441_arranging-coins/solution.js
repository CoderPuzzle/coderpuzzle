/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
    // The answer is the largest k whose triangular total T(k) = k*(k+1)/2
    // fits inside n (rows 1..k cost 1+2+...+k coins, and the leftover coins
    // cannot finish row k+1). T is strictly increasing, so the predicate
    // T(mid) <= n is monotone: binary search the boundary, and hi ends on the
    // largest row count that fits. In these doubles the early probes lose
    // their low bits, but their products sit far above n; every comparison
    // the answer turns on has mid <= 65536, where mid*(mid+1) is exact.
    let lo = 1;
    let hi = n;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if ((mid * (mid + 1)) / 2 <= n) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return hi;
};
