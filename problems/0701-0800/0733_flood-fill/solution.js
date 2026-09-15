/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
    // Flood exactly the pixels 4-directionally connected to the seed that
    // still carry the seed's ORIGINAL color. Iterating with an explicit
    // queue is the point — a serpentine component at the bound chains
    // thousands of cells deep, far past any call stack a submission is
    // granted.
    const m = image.length;
    const n = image[0].length;
    const original = image[sr][sc];
    if (original === color) {
        // Recoloring to the color already there changes nothing, and it
        // would erase the distinction the loop below relies on.
        return image;
    }
    // Cells packed as r * n + c in one flat queue; writing the new color
    // as a cell enters it is both the fill and the seen-mark.
    const queue = new Array(m * n).fill(0);
    let tail = 0;
    let head = 0;
    image[sr][sc] = color;
    queue[tail] = sr * n + sc;
    tail += 1;
    while (head < tail) {
        const cell = queue[head];
        head += 1;
        const r = Math.floor(cell / n);
        const c = cell % n;
        if (r > 0 && image[r - 1][c] === original) {
            image[r - 1][c] = color;
            queue[tail] = cell - n;
            tail += 1;
        }
        if (r + 1 < m && image[r + 1][c] === original) {
            image[r + 1][c] = color;
            queue[tail] = cell + n;
            tail += 1;
        }
        if (c > 0 && image[r][c - 1] === original) {
            image[r][c - 1] = color;
            queue[tail] = cell - 1;
            tail += 1;
        }
        if (c + 1 < n && image[r][c + 1] === original) {
            image[r][c + 1] = color;
            queue[tail] = cell + 1;
            tail += 1;
        }
    }
    return image;
};
