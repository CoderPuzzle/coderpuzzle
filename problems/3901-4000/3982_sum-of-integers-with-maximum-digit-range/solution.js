/**
 * @param {number[]} nums
 * @return {number}
 */
var maxDigitRange = function (nums) {
    const ranges = [];
    let maximum = 0;
    for (const value of nums) {
        let remaining = value;
        let low = 9;
        let high = 0;
        while (remaining > 0) {
            const digit = remaining % 10;
            low = Math.min(low, digit);
            high = Math.max(high, digit);
            remaining = Math.floor(remaining / 10);
        }
        const digitRange = high - low;
        ranges.push(digitRange);
        maximum = Math.max(maximum, digitRange);
    }
    let answer = 0;
    for (let i = 0; i < nums.length; i++) {
        if (ranges[i] === maximum) answer += nums[i];
    }
    return answer;
};
