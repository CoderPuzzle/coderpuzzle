/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function (grid) {
    // Seen along one axis of the city, every row collapses to its tallest
    // building, and seen along the other, every column does — those 2n
    // maxima are all four skylines hold. A raise is safe exactly while the
    // building stays at or below both of its maxima, so the shorter of the
    // two is each cell's ceiling and the answer is the total gap below it.
    const n = grid.length;
    const rowMax = grid.map((row) => Math.max(...row));
    const colMax = [];
    for (let c = 0; c < n; c += 1) {
        let tallest = grid[0][c];
        for (let r = 1; r < n; r += 1) {
            tallest = Math.max(tallest, grid[r][c]);
        }
        colMax.push(tallest);
    }
    let total = 0;
    for (let r = 0; r < n; r += 1) {
        for (let c = 0; c < n; c += 1) {
            total += Math.min(rowMax[r], colMax[c]) - grid[r][c];
        }
    }
    return total;
};
