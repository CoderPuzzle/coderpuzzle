/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
    // Every land cell owns four unit edges of boundary; each horizontal
    // or vertical pair of land neighbours hides two of them — one edge on
    // each side of the shared border.
    let perimeter = 0;
    for (let r = 0; r < grid.length; ++r) {
        for (let c = 0; c < grid[0].length; ++c) {
            if (grid[r][c] === 1) {
                perimeter += 4;
                // Looking only up and left visits each adjacent pair
                // exactly once, so the later cell charges the pair's
                // full two-edge cost in one place.
                if (r > 0 && grid[r - 1][c] === 1) perimeter -= 2;
                if (c > 0 && grid[r][c - 1] === 1) perimeter -= 2;
            }
        }
    }
    // One island and no lakes: every counted edge lies on the single
    // outer outline, so the sweep total is the whole perimeter.
    return perimeter;
};
