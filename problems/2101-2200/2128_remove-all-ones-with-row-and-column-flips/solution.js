/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var removeOnes = function (grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if ((grid[row][column] ^ grid[row][0] ^ grid[0][column] ^ grid[0][0]) !== 0) {
                return false;
            }
        }
    }
    return true;
};
