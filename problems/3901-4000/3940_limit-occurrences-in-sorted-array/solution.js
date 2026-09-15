/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var limitOccurrences = function (nums, k) {
    const answer = [];
    let seen = 0;
    let previous;
    for (const value of nums) {
        if (value !== previous) {
            previous = value;
            seen = 0;
        }
        if (seen < k) {
            answer.push(value);
            seen++;
        }
    }
    return answer;
};
