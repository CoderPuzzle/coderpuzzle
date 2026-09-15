/**
 * @param {number[]} nums
 * @return {number}
 */
var maxGoodNumber = function (nums) {
    // Only 3! = 6 orders exist, so try each one exhaustively. Combining is
    // arithmetic: shift the accumulator left by the number's bit width and
    // OR the number into the freed bits. Three 7-bit values concatenate to
    // at most 21 bits, far below the 2^53 exact-integer ceiling.
    const orders = [
        [nums[0], nums[1], nums[2]],
        [nums[0], nums[2], nums[1]],
        [nums[1], nums[0], nums[2]],
        [nums[1], nums[2], nums[0]],
        [nums[2], nums[0], nums[1]],
        [nums[2], nums[1], nums[0]],
    ];
    let best = 0;
    for (const order of orders) {
        let value = 0;
        for (const x of order) {
            value = (value * Math.pow(2, x.toString(2).length)) | x;
        }
        best = Math.max(best, value);
    }
    return best;
};
