/**
 * @param {number} n
 * @param {string[]} commands
 * @return {number}
 */
var finalPositionOfSnake = function (n, commands) {
    // Each command moves exactly one coordinate by one step; the
    // statement's guarantee keeps both within [0, n), so no boundary
    // checks are needed.
    let row = 0;
    let col = 0;
    for (const command of commands) {
        if (command === "UP") {
            row--;
        } else if (command === "DOWN") {
            row++;
        } else if (command === "LEFT") {
            col--;
        } else {
            // "RIGHT"
            col++;
        }
    }
    return row * n + col;
};
