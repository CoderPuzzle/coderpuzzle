/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    let deletions = 0;
    const rows = strs.length;
    const cols = strs[0].length;
    for (let j = 0; j < cols; j++) {
        for (let i = 1; i < rows; i++) {
            // A column is condemned the moment a character drops below
            // the one above it; equal characters never condemn.
            if (strs[i][j] < strs[i - 1][j]) {
                deletions++;
                break;
            }
        }
    }
    return deletions;
};
