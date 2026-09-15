/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function (nums) {
    // The judge pins one exact answer: the even values sorted ascending fill
    // the even indices, and the odd values sorted ascending fill the odd
    // indices. One scan splits the values by parity, an explicit numeric
    // comparator sorts each group (the default sort compares strings), and a
    // dealing loop writes them into the answer — values are compared only
    // inside their own parity group.
    const evens = [];
    const odds = [];
    for (const value of nums) {
        if (value % 2 === 0) {
            evens.push(value);
        } else {
            odds.push(value);
        }
    }
    evens.sort((a, b) => a - b);
    odds.sort((a, b) => a - b);
    const answer = new Array(nums.length);
    for (let i = 0; i < evens.length; i++) {
        answer[2 * i] = evens[i];
        answer[2 * i + 1] = odds[i];
    }
    return answer;
};
