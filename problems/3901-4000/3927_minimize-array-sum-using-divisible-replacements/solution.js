/**
 * @param {number[]} nums
 * @return {number}
 */
var minArraySum = function (nums) {
    const limit = 100000;
    const present = new Array(limit + 1).fill(false);
    for (const value of nums) present[value] = true;

    const best = new Array(limit + 1).fill(0);
    for (let divisor = 1; divisor <= limit; divisor++) {
        if (!present[divisor]) continue;
        for (let multiple = divisor; multiple <= limit; multiple += divisor) {
            if (present[multiple] && (best[multiple] === 0 || divisor < best[multiple])) {
                best[multiple] = divisor;
            }
        }
    }

    return nums.reduce((sum, value) => sum + best[value], 0);
};
