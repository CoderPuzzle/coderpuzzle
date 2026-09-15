/**
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */
var maxCount = function (banned, n, maxSum) {
    // Smallest-first greedy computed gap by gap over the sorted,
    // de-duplicated bans: a free run of `avail` candidates starting at
    // `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The first
    // run that cannot fit contains the answer's cutoff — every later
    // candidate is larger — so exactly one binary search caps it and the
    // walk stops there. Cost terms reach ~3*10^18 at the caps (n = 10^9,
    // maxSum = 10^15), past Number precision, so the ladder math runs on
    // bigint; the answer itself is <= sqrt(2*10^15) ~ 4.5e7 and returns
    // as a plain number.
    const stops = Array.from(new Set(banned)).sort((a, b) => a - b);
    const ladder = (lo, cnt) => {
        return (BigInt(cnt) * BigInt(2 * lo + cnt - 1)) / 2n;
    };
    let budget = BigInt(maxSum);
    const bestPrefix = (lo, avail) => {
        let low = 0;
        let high = avail;
        while (low < high) {
            const mid = (low + high + 1) >> 1;
            if (ladder(lo, mid) <= budget) low = mid;
            else high = mid - 1;
        }
        return low;
    };
    let taken = 0;
    let prev = 0;
    let finished = false;
    for (const value of stops) {
        const avail = value - prev - 1;
        if (avail > 0) {
            const lo = prev + 1;
            const cost = ladder(lo, avail);
            if (cost <= budget) {
                taken += avail;
                budget -= cost;
            } else {
                taken += bestPrefix(lo, avail);
                finished = true;
                break;
            }
        }
        prev = value;
    }
    if (!finished && n > prev) {
        const lo = prev + 1;
        const avail = n - prev;
        const cost = ladder(lo, avail);
        if (cost <= budget) taken += avail;
        else taken += bestPrefix(lo, avail);
    }
    return taken;
};
