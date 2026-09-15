/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var findIntersectionValues = function (nums1, nums2) {
    // answer1 counts indices whose value exists anywhere in the other
    // array; existence, not multiplicity, is what matters, so the only
    // state needed is each array's set of distinct values.
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    let answer1 = 0;
    for (const x of nums1) {
        if (set2.has(x)) ++answer1;
    }
    let answer2 = 0;
    for (const y of nums2) {
        if (set1.has(y)) ++answer2;
    }
    return [answer1, answer2];
};
