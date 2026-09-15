// Identify the whole connected component first (BFS with an explicit
// queue — depth safety), classifying each member's border status against
// the ORIGINAL grid values. Only after every member has been classified
// does a second pass repaint the collected border cells, so an
// in-progress repaint can never corrupt a later cell's neighbor check.
function colorBorder(grid: number[][], row: number, col: number, color: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    const original = grid[row][col];
    const visited: boolean[] = new Array(m * n).fill(false);
    const queue: number[] = new Array(m * n).fill(0);
    const border: number[] = new Array(m * n).fill(0);
    let borderCount = 0;
    let head = 0;
    let tail = 0;
    visited[row * n + col] = true;
    queue[tail] = row * n + col;
    tail += 1;
    while (head < tail) {
        const cell = queue[head];
        head += 1;
        const r = Math.floor(cell / n);
        const c = cell % n;
        let isBorder = r === 0 || r === m - 1 || c === 0 || c === n - 1;
        if (r > 0) {
            if (grid[r - 1][c] !== original) {
                isBorder = true;
            } else if (!visited[cell - n]) {
                visited[cell - n] = true;
                queue[tail] = cell - n;
                tail += 1;
            }
        }
        if (r + 1 < m) {
            if (grid[r + 1][c] !== original) {
                isBorder = true;
            } else if (!visited[cell + n]) {
                visited[cell + n] = true;
                queue[tail] = cell + n;
                tail += 1;
            }
        }
        if (c > 0) {
            if (grid[r][c - 1] !== original) {
                isBorder = true;
            } else if (!visited[cell - 1]) {
                visited[cell - 1] = true;
                queue[tail] = cell - 1;
                tail += 1;
            }
        }
        if (c + 1 < n) {
            if (grid[r][c + 1] !== original) {
                isBorder = true;
            } else if (!visited[cell + 1]) {
                visited[cell + 1] = true;
                queue[tail] = cell + 1;
                tail += 1;
            }
        }
        if (isBorder) {
            border[borderCount] = cell;
            borderCount += 1;
        }
    }
    for (let i = 0; i < borderCount; i++) {
        const cell = border[i];
        grid[Math.floor(cell / n)][cell % n] = color;
    }
    return grid;
}
