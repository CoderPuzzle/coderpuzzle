/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var minAbsDifference = function (nums, goal) {
    const subsetSums = (arr) => {
        // Doubling: each value extends the list with a shifted copy of
        // itself, turning t sums into 2t (0 included — empty set covered).
        let sums = [0];
        for (const value of arr) {
            const next = sums.slice();
            for (const s of sums) {
                next.push(s + value);
            }
            sums = next;
        }
        return sums;
    };

    const lowerBound = (arr, target) => {
        let lo = 0;
        let hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    // Meet in the middle: 2^40 is hopeless, but two halves of <= 20
    // elements enumerate ~10^6 sums each, and every subsequence sum is
    // sL + sR with one part from each side.
    const half = Math.floor(nums.length / 2);
    const left = subsetSums(nums.slice(0, half)).sort((a, b) => a - b);
    const right = subsetSums(nums.slice(half));
    let best = null;
    for (const s of right) {
        // The best partner is the left sum nearest goal - s; anything other
        // than the floor and ceiling around the insertion point lies
        // strictly farther away.
        const need = goal - s;
        const idx = lowerBound(left, need);
        for (const j of [idx - 1, idx]) {
            if (j >= 0 && j < left.length) {
                const diff = Math.abs(left[j] + s - goal);
                if (best === null || diff < best) {
                    best = diff;
                }
            }
        }
    }
    return best;
};
