/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {
    const n = dist.length;
    const H = Math.round(hour * 100); // hour has at most two decimals
    const last = 100 * dist[n - 1];

    const onTime = (speed) => {
        // Every leg but the last must end on an integer hour (the next
        // train departs then), costing ceil(d/s); the final leg has no
        // successor and costs exactly d/s — compared here in hundredths.
        let c = 0;
        for (let i = 0; i + 1 < n; i++) {
            c += Math.floor((dist[i] + speed - 1) / speed);
        }
        const budget = H - 100 * c;
        if (budget < 0) return false;
        return budget >= Math.floor((last + speed - 1) / speed);
    };

    // On-time is monotone in speed — if s works, every faster speed works —
    // so search for the smallest feasible s; 10^7 is the guaranteed
    // ceiling, and -1 if even it fails.
    let lo = 1,
        hi = 10000000;
    if (!onTime(hi)) return -1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (onTime(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};
