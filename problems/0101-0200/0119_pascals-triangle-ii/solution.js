/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
    // One array of edge 1s, folded forward row by row: after pass i its
    // first i + 1 cells hold row i exactly, so the returned array is the
    // only one ever allocated — the O(rowIndex) space the follow-up asks for.
    const row = new Array(rowIndex + 1).fill(1);
    for (let length = 2; length <= rowIndex; ++length) {
        // Right-to-left: row[j - 1] still holds the previous row's value
        // when row[j] is updated, so row[j] += row[j - 1] is exactly the
        // sum-of-the-two-cells-directly-above recurrence.
        for (let j = length - 1; j > 0; --j) {
            row[j] += row[j - 1];
        }
    }
    return row;
};
