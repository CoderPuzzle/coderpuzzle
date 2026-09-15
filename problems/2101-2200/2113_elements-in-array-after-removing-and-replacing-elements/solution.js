/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var elementInNums = function (nums, queries) {
    const length = nums.length;
    const cycle = 2 * length;
    return queries.map(([time, index]) => {
        const phase = time % cycle;
        if (phase < length) {
            const originalIndex = phase + index;
            return originalIndex < length ? nums[originalIndex] : -1;
        }
        const restored = phase - length;
        return index < restored ? nums[index] : -1;
    });
};
