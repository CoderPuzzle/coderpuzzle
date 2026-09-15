/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let result = 0;
    for (let i = 0; i < 32; ++i) {
        // Triples contribute 0 or 3 set bits at position i (a multiple of
        // three); the unique value contributes 0 or 1 — so count % 3 is
        // exactly bit i of the answer.
        let count = 0;
        for (const value of nums) {
            count += (value >> i) & 1;
        }
        if (count % 3 !== 0) {
            result |= 1 << i;
        }
    }
    return result;
};
