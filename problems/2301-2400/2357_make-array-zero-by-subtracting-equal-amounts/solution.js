/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    const values = new Set();
    for (const num of nums) {
        if (num > 0) {
            values.add(num);
        }
    }
    return values.size;
};
