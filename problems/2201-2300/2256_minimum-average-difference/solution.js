/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverageDifference = function (nums) {
    const n = nums.length;
    let total = 0;
    for (const x of nums) {
        total += x;
    }
    let prefix = 0;
    let bestIndex = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < n; i++) {
        prefix += nums[i];
        const leftAvg = Math.floor(prefix / (i + 1));
        const rightCount = n - i - 1;
        const rightAvg = rightCount > 0 ? Math.floor((total - prefix) / rightCount) : 0;
        const diff = Math.abs(leftAvg - rightAvg);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestIndex = i;
        }
    }
    return bestIndex;
};
