/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, diff) {
    const n = nums1.length;
    const values = new Array(n);
    let lo = Infinity,
        hi = -Infinity;
    for (let i = 0; i < n; i++) {
        values[i] = nums1[i] - nums2[i];
        if (values[i] < lo) lo = values[i];
        if (values[i] > hi) hi = values[i];
    }
    const size = hi - lo + 1;
    const tree = new Array(size + 1).fill(0);
    let count = 0;
    for (let i = 0; i < n; i++) {
        const target = values[i] + diff;
        if (target >= lo) {
            let index = Math.min(target, hi) - lo + 1;
            for (; index > 0; index -= index & -index) {
                count += tree[index];
            }
        }
        let index = values[i] - lo + 1;
        for (; index <= size; index += index & -index) {
            tree[index] += 1;
        }
    }
    return count;
};
