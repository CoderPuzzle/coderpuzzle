/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
    const averages = new Array(nums.length).fill(-1);
    const width = 2 * k + 1;
    if (width > nums.length) {
        return averages;
    }

    let windowSum = 0;
    for (let index = 0; index < width; index++) {
        windowSum += nums[index];
    }
    averages[k] = Math.floor(windowSum / width);
    for (let center = k + 1; center < nums.length - k; center++) {
        windowSum += nums[center + k];
        windowSum -= nums[center - k - 1];
        averages[center] = Math.floor(windowSum / width);
    }
    return averages;
};
