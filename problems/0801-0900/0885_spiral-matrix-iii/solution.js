/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function (rows, cols, rStart, cStart) {
    // The walk is a turtle: it runs east, south, west, north, east, ...
    // in turn, and every second turn the straight runs grow by one step
    // (1, 1, 2, 2, 3, 3, ...). A step that lands outside the grid is
    // still taken — the spiral reaches the far cells only by leaving
    // and re-entering — but only in-grid positions are recorded, and
    // once rows * cols of them are, the whole grid is visited and the
    // walk stops.
    const total = rows * cols;
    const order = [[rStart, cStart]];
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    let r = rStart;
    let c = cStart;
    let d = 0;
    let step = 1;
    while (order.length < total) {
        for (let side = 0; side < 2; ++side) {
            const [dr, dc] = directions[d];
            for (let i = 0; i < step; ++i) {
                r += dr;
                c += dc;
                if (0 <= r && r < rows && 0 <= c && c < cols) {
                    order.push([r, c]);
                }
            }
            d = (d + 1) % 4;
        }
        ++step;
    }
    return order;
};
