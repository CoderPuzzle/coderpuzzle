/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function (mat) {
    const m = mat.length;
    const n = m > 0 ? mat[0].length : 0;
    let total = 0;
    // height[c]: run of consecutive ones ending at the current row in
    // column c — extended by a one, reset to zero by a zero.
    const height = new Array(n).fill(0);
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (mat[r][c] === 1) {
                height[c] += 1;
            } else {
                height[c] = 0;
            }
        }
        // Anchor submatrices at their bottom row: a span [left, right]
        // admits exactly min(height) of them (every height up to the
        // minimum works), and each submatrix has a unique bottom row and
        // span, so nothing is double-counted.
        for (let left = 0; left < n; left++) {
            let minH = height[left];
            // Widening the span can only lower the minimum, so one
            // running variable tracks it.
            for (let right = left; right < n; right++) {
                if (height[right] < minH) {
                    minH = height[right];
                }
                total += minH;
            }
        }
    }
    return total;
};
