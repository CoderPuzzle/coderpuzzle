/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var widestPairOfIndices = function (nums1, nums2) {
    // Track the running prefix difference (sum1 - sum2); a range has equal
    // sums in both arrays iff the difference repeats. Seed the empty
    // prefix's value 0 at -1 so pairs starting at index 0 measure correctly.
    const first = new Map([[0, -1]]);
    let diff = 0;
    let best = 0;
    for (let i = 0; i < nums1.length; i++) {
        diff += nums1[i] - nums2[i];
        // A repeated difference spans a valid pair; keeping only each
        // value's FIRST occurrence maximizes every later span using it.
        if (first.has(diff)) {
            const w = i - first.get(diff);
            if (w > best) best = w;
        } else {
            first.set(diff, i);
        }
    }
    return best;
};
