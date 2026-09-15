/**
 * @param {number[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} k
 * @return {number[][]}
 */
var reverseSubmatrix = function (grid, x, y, k) {
    // Two pointers walk inward from the square's top and bottom rows;
    // each step exchanges the k columns the square spans. A middle row
    // of an odd-sided square pairs with itself and needs no work.
    let top = x;
    let bottom = x + k - 1;
    while (top < bottom) {
        for (let j = y; j < y + k; ++j) {
            const tmp = grid[top][j];
            grid[top][j] = grid[bottom][j];
            grid[bottom][j] = tmp;
        }
        ++top;
        --bottom;
    }
    return grid;
};
