/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
    // The pinned order is its own recipe: element at index i is i ^ (i >> 1),
    // the standard reflected gray code. One loop, no post-processing.
    const code = [];
    for (let i = 0; i < 1 << n; ++i) {
        code.push(i ^ (i >> 1));
    }
    return code;
};
