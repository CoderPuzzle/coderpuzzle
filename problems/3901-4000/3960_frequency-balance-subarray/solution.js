/**
 * @param {number[]} nums
 * @return {number}
 */
var getLength = function (nums) {
    const n = nums.length;
    let best = 1;
    for (let left = 0; left < n; ++left) {
        const counts = new Map();
        const frequencyGroups = new Array(n + 1).fill(0);
        let levelCount = 0;
        let levelSum = 0;
        let levelSquareSum = 0;

        for (let right = left; right < n; ++right) {
            const value = nums[right];
            const oldFrequency = counts.get(value) ?? 0;
            if (oldFrequency > 0) {
                --frequencyGroups[oldFrequency];
                if (frequencyGroups[oldFrequency] === 0) {
                    --levelCount;
                    levelSum -= oldFrequency;
                    levelSquareSum -= oldFrequency * oldFrequency;
                }
            }

            const newFrequency = oldFrequency + 1;
            if (frequencyGroups[newFrequency] === 0) {
                ++levelCount;
                levelSum += newFrequency;
                levelSquareSum += newFrequency * newFrequency;
            }
            ++frequencyGroups[newFrequency];
            counts.set(value, newFrequency);

            let balanced = counts.size === 1;
            if (levelCount === 2 && levelSum % 3 === 0) {
                const lower = levelSum / 3;
                balanced = levelSquareSum === 5 * lower * lower;
            }
            if (balanced) best = Math.max(best, right - left + 1);
        }
    }
    return best;
};
