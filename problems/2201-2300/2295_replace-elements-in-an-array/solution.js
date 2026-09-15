/**
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
var arrayChange = function (nums, operations) {
    const finalName = new Map();
    for (let index = operations.length - 1; index >= 0; index--) {
        const [replaced, replacement] = operations[index];
        finalName.set(replaced, finalName.has(replacement) ? finalName.get(replacement) : replacement);
    }
    return nums.map((value) => (finalName.has(value) ? finalName.get(value) : value));
};
