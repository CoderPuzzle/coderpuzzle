/**
 * @param {number} n
 * @return {number}
 */
var coloredCells = function (n) {
    // The blue region after minute n is a diamond of Chebyshev radius
    // n-1 around the first cell: ring k adds 4*k cells, so the total is
    // 1 + 4*(0+1+...+(n-1)) = 2n^2 - 2n + 1. At n = 10^5 that is about
    // 2*10^10, which stays exact because Numbers are exact below 2^53.
    return 2 * n * n - 2 * n + 1;
};
