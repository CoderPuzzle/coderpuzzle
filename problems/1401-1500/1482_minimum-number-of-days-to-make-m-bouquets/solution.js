/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minDays = function (bloomDay, m, k) {
    const n = bloomDay.length;
    // Not enough flowers to ever build m bouquets of k flowers each.
    if (m * k > n) {
        return -1;
    }
    const feasible = (day) => {
        let bouquets = 0;
        // Length of the current run of consecutive bloomed flowers.
        let run = 0;
        for (const d of bloomDay) {
            if (d <= day) {
                run++;
                if (run === k) {
                    // A full run completes one bouquet; reset the run.
                    bouquets++;
                    run = 0;
                }
            } else {
                // Bouquets cannot span an unbloomed flower.
                run = 0;
            }
        }
        return bouquets >= m;
    };
    // Feasibility is monotone in the day (blooming only adds flowers), so
    // binary search the first feasible day between the extreme bloom days:
    // no flower opens before the first, and all are open by the last.
    let lo = Infinity;
    let hi = -Infinity;
    for (const d of bloomDay) {
        if (d < lo) {
            lo = d;
        }
        if (d > hi) {
            hi = d;
        }
    }
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
