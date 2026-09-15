/**
 * @param {number[]} nums
 * @return {number}
 */
var duplicateNumbersXOR = function (nums) {
    // One pass with a value -> count tally; values seen exactly twice
    // contribute to the XOR. XOR is its own inverse and self-canceling,
    // so values occurring once must be excluded by the count, not
    // folded in blindly.
    const counts = new Map();
    for (const value of nums) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    let answer = 0;
    for (const [value, count] of counts) {
        if (count === 2) answer ^= value;
    }
    return answer;
};
