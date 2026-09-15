function canMakeSquare(grid: string[][]): boolean {
    // A 2x2 square becomes monochrome with at most one recolor exactly
    // when it is not split 2-2, i.e. one color already owns at least three
    // of its four cells; a single flip then absorbs the odd cell out. Four
    // candidate squares to check.
    for (let r = 0; r < 2; ++r) {
        for (let c = 0; c < 2; ++c) {
            const black =
                (grid[r][c] === "B" ? 1 : 0) +
                (grid[r][c + 1] === "B" ? 1 : 0) +
                (grid[r + 1][c] === "B" ? 1 : 0) +
                (grid[r + 1][c + 1] === "B" ? 1 : 0);
            if (black !== 2) {
                return true;
            }
        }
    }
    return false;
}
