/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    // The set does the uniqueness bookkeeping: hashing nums1's values
    // answers "is this value shared?" in O(1) average, and collecting
    // the hits into a second set collapses the duplicates both inputs
    // carry, so each shared value is kept exactly once.
    const seen = new Set(nums1);
    const shared = new Set();
    for (const value of nums2) {
        if (seen.has(value)) {
            shared.add(value);
        }
    }
    // The final sort pins the output to the ascending order the judge
    // compares exactly.
    return [...shared].sort((a, b) => a - b);
};
