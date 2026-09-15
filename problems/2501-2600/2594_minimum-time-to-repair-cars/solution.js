/**
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function (ranks, cars) {
    let minRank = Infinity;
    for (const r of ranks) {
        if (r < minRank) minRank = r;
    }
    const isqrt = (x) => {
        let r = Math.floor(Math.sqrt(x));
        while (r > 0 && r * r > x) {
            r--;
        }
        while ((r + 1) * (r + 1) <= x) {
            r++;
        }
        return r;
    };
    const feasible = (t) => {
        // Within budget t, a rank-r mechanic finishes r*n^2 <= t cars, so
        // its capacity is isqrt(t / r); sum capacities with early exit.
        let total = 0;
        for (const r of ranks) {
            total += isqrt(Math.floor(t / r));
            if (total >= cars) {
                return true;
            }
        }
        return total >= cars;
    };
    // Feasibility is monotone in t (mechanics can idle), so binary search the
    // minimum feasible time. Upper bound: the best mechanic repairing every
    // car alone, min(ranks) * cars^2.
    let lo = 1,
        hi = minRank * cars * cars;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
