/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function (original, m, n) {
    if (m * n !== original.length) return [];

    const result = Array.from({ length: m }, () => new Array(n));
    for (let row = 0; row < m; ++row) {
        for (let column = 0; column < n; ++column) {
            result[row][column] = original[row * n + column];
        }
    }
    return result;
};
