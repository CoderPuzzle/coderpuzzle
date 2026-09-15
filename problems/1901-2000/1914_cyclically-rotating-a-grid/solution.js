/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var rotateGrid = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const out = grid.map((row) => row.slice());
    // Each layer is peeled into a ring walked counter-clockwise from its
    // top-left corner. Rotating the layer k times moves every element k steps
    // along that walk, which is one right-rotation of the ring by
    // k % ring_len; the ring is then written back along the same walk.
    for (let l = 0; l < Math.min(m, n) / 2; l++) {
        const top = l;
        const left = l;
        const bottom = m - 1 - l;
        const right = n - 1 - l;
        const pos = [];
        for (let r = top; r <= bottom; r++) pos.push([r, left]);
        for (let c = left + 1; c <= right; c++) pos.push([bottom, c]);
        for (let r = bottom - 1; r >= top; r--) pos.push([r, right]);
        for (let c = right - 1; c > left; c--) pos.push([top, c]);
        const len = pos.length;
        const s = k % len;
        for (let i = 0; i < len; i++) {
            const [pr, pc] = pos[(i - s + len) % len];
            const [r, c] = pos[i];
            out[r][c] = grid[pr][pc];
        }
    }
    return out;
};
