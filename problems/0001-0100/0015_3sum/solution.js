/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // Sorted copy leaves the caller's array untouched; sorting makes every
    // emitted triplet ascending and the i-scan lexicographic.
    const arr = [...nums].sort((a, b) => a - b);
    const n = arr.length;
    const result = [];
    for (let i = 0; i + 2 < n; i++) {
        // Reusing the same value for the fixed element would re-find the
        // same pairs, so skip runs of equal values.
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        // Early exit: the smallest remaining value is already positive, so
        // no triplet from here on can sum to zero.
        if (arr[i] * 3 > 0) break;
        let left = i + 1,
            right = n - 1;
        while (left < right) {
            const total = arr[i] + arr[left] + arr[right];
            // Below zero the sum must grow, so left moves right; above
            // zero, right retreats.
            if (total < 0) {
                left++;
            } else if (total > 0) {
                right--;
            } else {
                result.push([arr[i], arr[left], arr[right]]);
                // Both advance, then run past any runs of equal values, so
                // the same pair is never emitted twice for one i.
                left++;
                right--;
                while (left < right && arr[left] === arr[left - 1]) left++;
                while (left < right && arr[right] === arr[right + 1]) right--;
            }
        }
    }
    return result;
};
