/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function (candies, k) {
    // feasibility is monotone in c: if every child can get c, any smaller
    // amount works too, so binary search the largest feasible pile size
    function can(c) {
        // c == 0 is vacuously feasible: pins the search's lower end at 0
        if (c === 0) return true;
        let cnt = 0;
        for (const p of candies) {
            // a pile of size p splits into exactly floor(p / c) portions
            cnt += Math.floor(p / c);
            if (cnt >= k) return true;
        }
        return cnt >= k;
    }

    let lo = 0,
        hi = 0;
    for (const p of candies) {
        if (p > hi) hi = p;
    }
    while (lo < hi) {
        // upper mid: feasible moves lo up to mid; the +1 avoids stalling
        const mid = lo + Math.floor((hi - lo + 1) / 2);
        if (can(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
