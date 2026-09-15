/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maximumTeamSize = function (startTime, endTime) {
    // A team is valid when one member overlaps everyone else, so the largest
    // team is the largest set of intervals all overlapping a single interval.
    // For each interval i that is exactly the intervals j with
    // startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
    const upperBound = (arr, target) => {
        // first index > target (count of values <= target)
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const lowerBound = (arr, target) => {
        // first index >= target (count of values < target)
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const n = startTime.length;
    const starts = startTime.slice().sort((a, b) => a - b);
    const ends = endTime.slice().sort((a, b) => a - b);
    let best = 0;
    for (let i = 0; i < n; i++) {
        // Count starts no later than end minus ends earlier than start; the
        // second set is a subset of the first, so the difference is exactly
        // the overlapping intervals, including i itself.
        const overlap = upperBound(starts, endTime[i]) - lowerBound(ends, startTime[i]);
        if (overlap > best) best = overlap;
    }
    return best;
};
