function minCost(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;
    const INF = Infinity;
    // Layer 0 is the plain right/down minimum path sum: every move pays
    // its destination cell, and standing on the start costs nothing.
    let d: number[][] = Array.from({ length: m }, () => new Array(n).fill(INF));
    d[0][0] = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i === 0 && j === 0) continue;
            let best = i > 0 ? d[i - 1][j] : INF;
            if (j > 0 && d[i][j - 1] < best) best = d[i][j - 1];
            d[i][j] = best + grid[i][j];
        }
    }
    // Each further layer opens with one teleport: land anywhere whose
    // value is at least mine, at the previous layer's price of that launch
    // cell. Cells sorted by value descending turn the scan into a running
    // prefix minimum; ties share one prefix because the test is >=.
    const cells: number[][] = [];
    for (let i = 0; i < m; ++i) for (let j = 0; j < n; ++j) cells.push([i, j]);
    cells.sort((a, b) => grid[b[0]][b[1]] - grid[a[0]][a[1]]);
    let answer = d[m - 1][n - 1];
    for (let step = 0; step < k; ++step) {
        const seed = Array.from({ length: m }, () => new Array(n).fill(INF));
        let run = INF;
        let p = 0;
        for (const [i, j] of cells) {
            while (p < cells.length && grid[cells[p][0]][cells[p][1]] >= grid[i][j]) {
                const [si, sj] = cells[p];
                if (d[si][sj] < run) run = d[si][sj];
                ++p;
            }
            seed[i][j] = run;
        }
        // Then ordinary right/down moves carry each landing spot through
        // the rest of the layer, as in the plain path-sum pass above.
        for (let i = 0; i < m; ++i) {
            for (let j = 0; j < n; ++j) {
                let best = seed[i][j];
                const g = grid[i][j];
                if (i > 0 && seed[i - 1][j] + g < best) best = seed[i - 1][j] + g;
                if (j > 0 && seed[i][j - 1] + g < best) best = seed[i][j - 1] + g;
                seed[i][j] = best;
            }
        }
        d = seed;
        if (d[m - 1][n - 1] < answer) answer = d[m - 1][n - 1];
    }
    return answer;
}
