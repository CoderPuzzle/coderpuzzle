/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumXOR = function (nums) {
    let answer = 0;
    for (const value of nums) {
        answer |= value;
    }
    return answer;
};
