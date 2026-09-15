/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
    // XOR is addition without the carries; AND marks every position that
    // produces a carry, and shifting it left one place lines the carries
    // up under the digits they inflate. Repeat until no carry remains.
    // JavaScript's bitwise operators coerce to signed 32-bit two's
    // complement, so the mask is implicit in every operation and negative
    // operands wrap exactly as they should.
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
};
