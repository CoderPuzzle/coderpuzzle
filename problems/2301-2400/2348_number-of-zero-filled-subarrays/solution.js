/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
    // Every zero-filled subarray ends at exactly one index, and the ones
    // ending at i are exactly the run of consecutive zeros through i —
    // add the current run length at every zero. The maximum total is
    // 100000 * 100001 / 2 ≈ 5e9, far inside Number's exact range.
    let total = 0;
    let run = 0;
    for (const value of nums) {
        if (value === 0) {
            ++run;
            total += run;
        } else {
            run = 0;
        }
    }
    return total;
};
