/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function (nums) {
    const answer = [];
    let rem = 0;
    for (const bit of nums) {
        rem = (rem * 2 + bit) % 5;
        answer.push(rem === 0);
    }
    return answer;
};
