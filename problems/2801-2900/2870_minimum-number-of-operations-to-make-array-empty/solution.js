/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const counts = new Map();
    for (const num of nums) {
        counts.set(num, (counts.get(num) ?? 0) + 1);
    }
    let operations = 0;
    for (const count of counts.values()) {
        if (count === 1) {
            return -1;
        }
        operations += Math.floor((count + 2) / 3);
    }
    return operations;
};
