/**
 * @param {number[][]} grid
 * @param {number} stampHeight
 * @param {number} stampWidth
 * @return {boolean}
 */
var possibleToStamp = function (grid, stampHeight, stampWidth) {
    const rows = grid.length;
    const columns = grid[0].length;
    const occupied = Array.from({ length: rows + 1 }, () => new Array(columns + 1).fill(0));
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            occupied[row + 1][column + 1] =
                grid[row][column] + occupied[row][column + 1] + occupied[row + 1][column] - occupied[row][column];
        }
    }

    const difference = Array.from({ length: rows + 1 }, () => new Array(columns + 1).fill(0));
    for (let top = 0; top + stampHeight <= rows; top++) {
        const bottom = top + stampHeight;
        for (let left = 0; left + stampWidth <= columns; left++) {
            const right = left + stampWidth;
            const total = occupied[bottom][right] - occupied[top][right] - occupied[bottom][left] + occupied[top][left];
            if (total === 0) {
                difference[top][left]++;
                difference[bottom][left]--;
                difference[top][right]--;
                difference[bottom][right]++;
            }
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (row > 0) difference[row][column] += difference[row - 1][column];
            if (column > 0) difference[row][column] += difference[row][column - 1];
            if (row > 0 && column > 0) difference[row][column] -= difference[row - 1][column - 1];
            if (grid[row][column] === 0 && difference[row][column] === 0) return false;
        }
    }
    return true;
};
