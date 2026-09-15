/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function (nums) {
    const n = nums.length;
    const chars = new Array(n);
    for (let i = 0; i < n; i++) {
        chars[i] = nums[i][i] === "0" ? "1" : "0";
    }
    return chars.join("");
};
