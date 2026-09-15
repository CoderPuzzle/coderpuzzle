/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDegrees = function (matrix) {
    return matrix.map((row) => row.reduce((degree, edge) => degree + edge, 0));
};
