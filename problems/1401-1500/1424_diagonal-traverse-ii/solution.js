/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function (nums) {
    const buckets = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums[i].length; j++) {
            const key = i + j;
            while (buckets.length <= key) {
                buckets.push([]);
            }
            buckets[key].push(nums[i][j]);
        }
    }
    const result = [];
    for (const bucket of buckets) {
        for (let i = bucket.length - 1; i >= 0; i--) {
            result.push(bucket[i]);
        }
    }
    return result;
};
