/**
 * @param {number[]} nums
 * @param {number[]} numsDivide
 * @return {number}
 */
var minOperations = function (nums, numsDivide) {
    // An element x can head nums only if it divides every value in
    // numsDivide; one common divisor divides their GCD, so reduce the
    // target once and count the sorted elements below the smallest
    // divisor of it.
    let g = 0;
    for (const value of numsDivide) {
        g = gcd(g, value);
    }
    nums.sort((a, b) => a - b);
    let deletions = 0;
    for (const value of nums) {
        if (g % value === 0) {
            return deletions;
        }
        ++deletions;
    }
    return -1;
};

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
