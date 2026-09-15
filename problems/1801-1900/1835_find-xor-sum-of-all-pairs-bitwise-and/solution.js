/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var getXORSum = function (arr1, arr2) {
    // AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
    // repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
    let x = 0;
    for (const a of arr1) {
        x ^= a;
    }
    let y = 0;
    for (const b of arr2) {
        y ^= b;
    }
    return x & y;
};
