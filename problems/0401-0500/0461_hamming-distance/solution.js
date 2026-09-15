/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    // XOR writes a 1 exactly at the positions where x and y differ and a
    // 0 wherever they agree, so the distance is the number of set bits
    // in the pattern. Count them by testing the lowest bit and shifting
    // right until the pattern empties. JavaScript's bitwise operators
    // coerce to signed 32-bit two's complement, which the non-negative
    // 31-bit pattern never leaves.
    let z = x ^ y;
    let distance = 0;
    while (z !== 0) {
        distance += z & 1;
        z >>= 1;
    }
    return distance;
};
