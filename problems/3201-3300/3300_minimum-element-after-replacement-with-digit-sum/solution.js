/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function (nums) {
    // Replacement acts per element, and a number's digit sum is never
    // larger than the number itself, so the answer is the smallest
    // per-element digit sum.
    let best = -1;
    for (const value of nums) {
        // Math.floor: / alone is float division and would loop forever.
        let rest = value;
        let digitSum = 0;
        while (rest > 0) {
            digitSum += rest % 10;
            rest = Math.floor(rest / 10);
        }
        // The running minimum can only decrease: every replacement
        // shrinks (or keeps) its element.
        if (best < 0 || digitSum < best) {
            best = digitSum;
        }
    }
    return best;
};
