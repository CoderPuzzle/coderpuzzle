/**
 * @param {number[]} nums
 * @param {number} d
 * @return {number}
 */
var divisibleTripletCount = function (nums, d) {
    // A triplet sum is divisible by d exactly when a middle element's
    // remainder completes the outer two: fix the left index L, sweep R
    // forward keeping remainder counts of the elements strictly between
    // them, and each lookup of the needed remainder counts every such
    // middle at once. Two-element sums stay far below 2^53, so Number
    // arithmetic is exact.
    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const between = new Map();
        for (let j = i + 1; j < n; j++) {
            const need = (d - ((nums[i] + nums[j]) % d)) % d;
            count += between.get(need) || 0;
            const r = nums[j] % d;
            between.set(r, (between.get(r) || 0) + 1);
        }
    }
    return count;
};
