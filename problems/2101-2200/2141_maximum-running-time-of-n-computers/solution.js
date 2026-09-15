/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
var maxRunTime = function (n, batteries) {
    const feasible = (t) => {
        // Over a t-minute horizon a battery powers one computer at a time,
        // so it contributes at most min(b, t) computer-minutes; the capped
        // pool is freely schedulable, and n computers for t minutes need
        // exactly n*t.
        let total = 0;
        for (const b of batteries) {
            total += Math.min(b, t);
        }
        return total >= n * t;
    };

    let sum = 0;
    for (const b of batteries) {
        sum += b;
    }
    // Feasibility is monotone in t, so binary search the largest t; the
    // total charge over n computers is an absolute ceiling.
    let lo = 0;
    let hi = Math.floor(sum / n);
    while (lo < hi) {
        // Upper-mid keeps the search converging on the max feasible value.
        const mid = Math.floor((lo + hi + 1) / 2);
        if (feasible(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
