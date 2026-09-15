/**
 * @param {number[]} nums
 * @return {number}
 */
var triangularSum = function (nums) {
    let current = nums.slice();
    while (current.length > 1) {
        const next = new Array(current.length - 1);
        for (let i = 0; i < next.length; i++) {
            next[i] = (current[i] + current[i + 1]) % 10;
        }
        current = next;
    }
    return current[0];
};
