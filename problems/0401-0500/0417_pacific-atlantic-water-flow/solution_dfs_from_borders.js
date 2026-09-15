/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    const m = heights.length;
    const n = heights[0].length;

    // Reverse the flow: walk inland from the ocean border instead of
    // downhill from every cell, so one traversal finds all draining cells.
    const reachable = (border) => {
        const seen = Array.from({ length: m }, () => new Array(n).fill(false));
        const stack = [];
        for (const [r, c] of border) {
            if (!seen[r][c]) {
                seen[r][c] = true;
            }
            stack.push([r, c]);
        }
        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        while (stack.length > 0) {
            const [r, c] = stack.pop();
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                // Only a neighbor at least as tall could have flowed down
                // into (r, c).
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !seen[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                    // Mark on push so each cell is stacked at most once.
                    seen[nr][nc] = true;
                    stack.push([nr, nc]);
                }
            }
        }
        return seen;
    };

    // Pacific seeds: top row + left column; Atlantic: bottom row + right
    // column. Corners appear in both seed lists.
    const pacificBorder = [];
    for (let c = 0; c < n; c++) pacificBorder.push([0, c]);
    for (let r = 0; r < m; r++) pacificBorder.push([r, 0]);
    const atlanticBorder = [];
    for (let c = 0; c < n; c++) atlanticBorder.push([m - 1, c]);
    for (let r = 0; r < m; r++) atlanticBorder.push([r, n - 1]);

    const pacific = reachable(pacificBorder);
    const atlantic = reachable(atlanticBorder);

    // Row-major intersection of the two reachable sets comes out sorted.
    const result = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }
    return result;
};
