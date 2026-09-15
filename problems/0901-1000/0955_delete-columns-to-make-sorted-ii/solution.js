/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    let deletions = 0;
    const rows = strs.length;
    const cols = strs[0].length;
    // cut[i]: rows i and i + 1 are already strictly ordered on the kept
    // prefix, so later columns no longer constrain that pair.
    const cut = new Array(rows - 1).fill(false);
    for (let j = 0; j < cols; j++) {
        let bad = false;
        for (let i = 0; i + 1 < rows; i++) {
            if (!cut[i] && strs[i][j] > strs[i + 1][j]) {
                // A still-undecided pair drops here: the column must go.
                bad = true;
                break;
            }
        }
        if (bad) {
            deletions++;
            continue;
        }
        for (let i = 0; i + 1 < rows; i++) {
            if (!cut[i] && strs[i][j] < strs[i + 1][j]) {
                // A strict rise settles the pair for every later column.
                cut[i] = true;
            }
        }
    }
    return deletions;
};
