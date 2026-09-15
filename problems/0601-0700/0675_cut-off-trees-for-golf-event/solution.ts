// Shortest walk from (startRow, startCol) to the tree at (targetRow,
// targetCol): a plain BFS over walkable cells.
function walk(forest: number[][], startRow: number, startCol: number, targetRow: number, targetCol: number): number {
    // A wall under the walker means the leg never begins; only the initial
    // (0, 0) can actually be a 0 cell.
    if (forest[startRow][startCol] === 0) {
        return -1;
    }
    if (startRow === targetRow && startCol === targetCol) {
        return 0;
    }
    const rows = forest.length;
    const cols = forest[0].length;
    const pending: number[][] = [[startRow, startCol]];
    const distance: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-1));
    distance[startRow][startCol] = 0;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    for (let head = 0; head < pending.length; ++head) {
        const cell = pending[head];
        const near = distance[cell[0]][cell[1]] + 1;
        for (let d = 0; d < 4; ++d) {
            const r = cell[0] + dr[d];
            const c = cell[1] + dc[d];
            // Trees and empty cells are both walkable; only 0 is not.
            if (r < 0 || r >= rows || c < 0 || c >= cols || forest[r][c] === 0 || distance[r][c] >= 0) {
                continue;
            }
            if (r === targetRow && c === targetCol) {
                return near;
            }
            distance[r][c] = near;
            pending.push([r, c]);
        }
    }
    return -1;
}

function cutOffTree(forest: number[][]): number {
    // The order is not a choice: the trees must fall shortest to tallest.
    // What is left to plan is only the walk between consecutive trees, and
    // each of those legs is an unweighted shortest path. Cutting a tree
    // rewrites its cell to 1, which is still walkable, so every leg can
    // search the original forest unchanged.
    const trees: number[][] = [];
    for (let row = 0; row < forest.length; ++row) {
        for (let col = 0; col < forest[0].length; ++col) {
            if (forest[row][col] > 1) {
                trees.push([forest[row][col], row, col]);
            }
        }
    }
    trees.sort((a, b) => a[0] - b[0]);
    let total = 0;
    let row = 0;
    let col = 0;
    for (const tree of trees) {
        const steps = walk(forest, row, col, tree[1], tree[2]);
        if (steps < 0) {
            return -1;
        }
        total += steps;
        row = tree[1];
        col = tree[2];
    }
    return total;
}
