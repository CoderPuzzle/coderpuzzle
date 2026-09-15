// A leading 1 outweighs the rest of its row combined, so every row is
// flipped to a 1 head and contributes 2^(n-1) up front; after the head pass,
// cell (i, j) is 1 exactly where the row agreed with its own head, so a
// column toggle trades k for m - k.
function matrixScore(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    let score = m << (n - 1);
    for (let j = 1; j < n; ++j) {
        let agree = 0;
        for (const row of grid) {
            if (row[j] === row[0]) {
                ++agree;
            }
        }
        score += Math.max(agree, m - agree) << (n - 1 - j);
    }
    return score;
}
