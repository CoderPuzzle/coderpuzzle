/**
 * @param {number[]} nums
 * @return {number}
 */
var minMaxGame = function (nums) {
    let current = nums;
    while (current.length > 1) {
        const nextValues = [];
        for (let i = 0; i < current.length / 2; i++) {
            if (i % 2 === 0) {
                nextValues.push(Math.min(current[2 * i], current[2 * i + 1]));
            } else {
                nextValues.push(Math.max(current[2 * i], current[2 * i + 1]));
            }
        }
        current = nextValues;
    }
    return current[0];
};
