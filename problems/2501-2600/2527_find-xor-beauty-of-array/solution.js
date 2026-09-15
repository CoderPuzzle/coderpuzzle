/**
 * @param {number[]} nums
 * @return {number}
 */
var xorBeauty = function (nums) {
    // Per bit position b, the XOR of ((nums[i] | nums[j]) & nums[k]) over
    // all triples equals "how many nums have bit b set, mod 2": triples
    // only flip bit b an odd number of times when an odd number of
    // elements carry it. But that is exactly what folding XOR across the
    // array computes in one linear pass — no triplets needed. Every value
    // is < 10^9 and bitwise ops act on the exact 32-bit pattern, so no
    // precision concerns arise anywhere near 2^53.
    let beauty = 0;
    for (const num of nums) {
        beauty ^= num;
    }
    return beauty;
};
