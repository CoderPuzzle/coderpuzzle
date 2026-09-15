function minimumMoves(grid: number[][]): number {
    // Pair every empty cell with a cell still holding at least two stones;
    // the cost of a pair is the Manhattan distance between the cells, and
    // backtracking over all donor choices finds the cheapest perfect
    // pairing.
    const empties: [number, number][] = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === 0) {
                empties.push([i, j]);
            }
        }
    }
    const fill = (k: number): number => {
        if (k === empties.length) {
            return 0;
        }
        const [i, j] = empties[k];
        let best = 99;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[r][c] >= 2) {
                    grid[r][c]--;
                    best = Math.min(best, Math.abs(i - r) + Math.abs(j - c) + fill(k + 1));
                    grid[r][c]++;
                }
            }
        }
        return best;
    };
    return fill(0);
}
