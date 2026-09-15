/**
 * @param {number[]} startPos
 * @param {number[]} homePos
 * @param {number[]} rowCosts
 * @param {number[]} colCosts
 * @return {number}
 */
var minCost = function (startPos, homePos, rowCosts, colCosts) {
    let total = 0;
    let row = startPos[0];
    while (row !== homePos[0]) {
        row += row < homePos[0] ? 1 : -1;
        total += rowCosts[row];
    }

    let col = startPos[1];
    while (col !== homePos[1]) {
        col += col < homePos[1] ? 1 : -1;
        total += colCosts[col];
    }
    return total;
};
