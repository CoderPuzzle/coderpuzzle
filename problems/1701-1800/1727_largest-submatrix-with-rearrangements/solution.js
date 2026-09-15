/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function (matrix) {
    const m = matrix.length;
    if (m === 0) return 0;
    const n = matrix[0].length;
    const heights = new Array(n).fill(0);
    let best = 0;
    for (const row of matrix) {
        // heights[j] = run of consecutive ones ending at this row.
        for (let j = 0; j < n; j++) {
            heights[j] = row[j] === 1 ? heights[j] + 1 : 0;
        }
        // Columns may be rearranged, so only the multiset of heights
        // matters; descending order puts the (i+1)-th tallest run at i.
        const ordered = heights.slice().sort((a, b) => b - a);
        // The top i+1 columns all reach height h, and the rearrangement
        // places them side by side — width i+1 is real.
        for (let i = 0; i < ordered.length; i++) {
            const h = ordered[i];
            // Descending order: everything after a zero is zero too.
            if (h === 0) break;
            const area = h * (i + 1);
            if (area > best) best = area;
        }
    }
    return best;
};
