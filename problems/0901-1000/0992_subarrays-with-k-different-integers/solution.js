/**
 * A window holding exactly k distinct values has no monotone shrink rule —
 * it can be too wide or too narrow from either side — but a window holding
 * at most t distinct values does. Count the subarrays with at most k
 * distinct values, subtract those with at most k-1, and exactly k is what
 * remains.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function (nums, k) {
    return atMost(nums, k) - atMost(nums, k - 1);
};

var atMost = function (nums, limit) {
    const freq = new Array(nums.length + 1).fill(0); // values lie in [1, n]
    let distinct = 0;
    let left = 0;
    let total = 0;
    for (let right = 0; right < nums.length; right++) {
        const value = nums[right];
        if (freq[value] === 0) {
            distinct++;
        }
        freq[value]++;
        while (distinct > limit) {
            const leaving = nums[left];
            freq[leaving]--;
            if (freq[leaving] === 0) {
                distinct--;
            }
            left++;
        }
        // every suffix of an at-most window also qualifies, so the window's
        // length counts the subarrays ending at right
        total += right - left + 1;
    }
    return total;
};
