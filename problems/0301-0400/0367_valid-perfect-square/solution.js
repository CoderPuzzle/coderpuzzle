/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    // Squares march upward in lockstep — 1, 4, 9, 16, … — the map
    // r -> r * r is strictly increasing over the positives, so "is num a
    // perfect square" asks whether one sorted row contains num, and a
    // sorted row is exactly what binary search interrogates. Keep the root
    // candidates in lo..hi (starting 1..num — a root never exceeds its own
    // number), square each midpoint, and move lo above a probe that fell
    // short or hi below one that overshot. An empty interval means no root;
    // only an exact hit ever returned true. Numbers here are doubles, exact
    // on integers only through 2⁵³, and a wide probe would square past
    // that — so a probe never squares: it compares mid against num / mid,
    // a quotient that stays in range and reads exact at this width.
    let lo = 1;
    let hi = num;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const quotient = num / mid;
        if (quotient === mid) {
            return true;
        }
        if (quotient > mid) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return false;
};
