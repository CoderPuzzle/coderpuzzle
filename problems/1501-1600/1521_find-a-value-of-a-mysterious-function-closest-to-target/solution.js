/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var closestToTarget = function (arr, target) {
    // prev holds the distinct AND-values of every subarray ending at the
    // previous index. AND only clears bits, so this set stays small
    // (O(log(max(arr))) entries) and updates cheaply from one index to the
    // next.
    let best = Math.abs(arr[0] - target);
    let prev = new Set([arr[0]]);
    for (let i = 1; i < arr.length; ++i) {
        const value = arr[i];
        const cur = new Set([value]);
        for (const p of prev) cur.add(p & value);
        for (const v of cur) best = Math.min(best, Math.abs(v - target));
        prev = cur;
    }
    return best;
};
