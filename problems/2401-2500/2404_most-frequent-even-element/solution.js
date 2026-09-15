/**
 * @param {number[]} nums
 * @return {number}
 */
var mostFrequentEven = function (nums) {
    const counts = new Map();
    for (const num of nums) {
        if (num % 2 === 0) {
            counts.set(num, (counts.get(num) || 0) + 1);
        }
    }
    let bestValue = -1;
    let bestCount = 0;
    for (const [value, count] of counts) {
        if (count > bestCount || (count === bestCount && value < bestValue)) {
            bestCount = count;
            bestValue = value;
        }
    }
    return bestValue;
};
