/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function (time, totalTrips) {
    const tripsDone = (t) => {
        // Buses run independently: each finishes floor(t / x) trips by
        // minute t, so the floor-sum is the exact trip count — no simulation.
        let total = 0;
        for (const x of time) {
            total += Math.floor(t / x);
        }
        return total;
    };

    let mn = Infinity;
    for (const x of time) {
        mn = Math.min(mn, x);
    }
    // The completed-trip total is non-decreasing in t, so binary search the
    // first feasible minute; the fastest bus alone bounds the answer.
    let lo = 1;
    let hi = mn * totalTrips;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (tripsDone(mid) >= totalTrips) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
