/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var addNegabinary = function (arr1, arr2) {
    // Walk both arrays from the least-significant digit (the end)
    // toward the most-significant, keeping a running carry. At each
    // column, total = d1 + d2 + carry can temporarily fall outside
    // {0, 1} (it even goes negative), so the digit and the next carry
    // are pulled out with bitwise ops instead of a sign-prone mod/div:
    // total & 1 is the digit, because JavaScript's bitwise operators
    // coerce to a 32-bit two's-complement integer where the low bit
    // already equals total's floor-mod-2 regardless of sign. The next
    // carry is -(total >> 1), a 32-bit arithmetic (sign-extending)
    // shift, matching the base -2 identity total = digit + (-2) *
    // carry. The carry provably stays within {-1, 0, 1} the whole way,
    // so nothing overflows the 32-bit range.
    let i = arr1.length - 1;
    let j = arr2.length - 1;
    let carry = 0;
    const digits = [];
    while (i >= 0 || j >= 0 || carry !== 0) {
        const d1 = i >= 0 ? arr1[i] : 0;
        const d2 = j >= 0 ? arr2[j] : 0;
        const total = d1 + d2 + carry;
        digits.push(total & 1);
        carry = -(total >> 1);
        i--;
        j--;
    }
    digits.reverse();
    let k = 0;
    while (k < digits.length - 1 && digits[k] === 0) {
        k++;
    }
    return digits.slice(k);
};
