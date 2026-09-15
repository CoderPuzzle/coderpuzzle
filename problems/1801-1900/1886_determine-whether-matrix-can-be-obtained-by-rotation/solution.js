/**
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
 */
var findRotation = function (mat, target) {
    // Try each of the four orientations. Clockwise rotation:
    // new[r][c] = old[n-1-c][r].
    const n = mat.length;
    let cur = mat;
    for (let t = 0; t < 4; t++) {
        let same = true;
        for (let r = 0; r < n && same; r++) {
            for (let c = 0; c < n && same; c++) {
                if (cur[r][c] !== target[r][c]) {
                    same = false;
                }
            }
        }
        if (same) {
            return true;
        }
        const nxt = Array.from({ length: n }, () => new Array(n).fill(0));
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                nxt[r][c] = cur[n - 1 - c][r];
            }
        }
        cur = nxt;
    }
    return false;
};
