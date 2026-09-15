/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
    // Validity of a window is downward-closed in its left end (shrinking
    // can only drop bits) and extending r never invalidates a previously
    // valid l, so the shortest valid left end never regresses: two pointers
    // amortize. OR cannot be undone directly, so per-bit counts rebuild the
    // window OR one counter flip at a time on add/remove.
    const counts = new Array(30).fill(0);
    let best = -1;
    let left = 0;
    const windowOr = () => {
        let v = 0;
        for (let b = 0; b < 30; ++b) {
            if (counts[b]) v |= 1 << b;
        }
        return v;
    };
    for (let right = 0; right < nums.length; ++right) {
        for (let b = 0; b < 30; ++b) {
            counts[b] += (nums[right] >> b) & 1;
        }
        // Shrink while the window stays special; each recorded length is a
        // candidate, and the one recorded just before the window breaks is
        // the shortest ending here.
        while (left <= right && windowOr() >= k) {
            const length = right - left + 1;
            if (best === -1 || length < best) best = length;
            const leaving = nums[left];
            for (let b = 0; b < 30; ++b) {
                counts[b] -= (leaving >> b) & 1;
            }
            ++left;
        }
    }
    return best;
};
