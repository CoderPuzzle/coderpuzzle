function numMagicSquaresInside(grid: number[][]): number {
    // Every 3 x 3 window is judged independently, so the scan visits
    // each window's top-left corner and tests it; a grid shorter than
    // three rows or columns leaves the sweep empty.
    const rows = grid.length;
    const cols = grid[0].length;
    const isMagic = (r: number, c: number): boolean => {
        // Nine distinct values 1..9 total 45, so the four lines through
        // the center add to 4*15 = 45 + 3*center — the center must be 5.
        // One comparison clears most windows.
        if (grid[r + 1][c + 1] !== 5) {
            return false;
        }
        // Every row, column, and both diagonals must sum to 15.
        for (let i = 0; i < 3; i += 1) {
            if (grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2] !== 15) {
                return false;
            }
            if (grid[r][c + i] + grid[r + 1][c + i] + grid[r + 2][c + i] !== 15) {
                return false;
            }
        }
        if (grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] !== 15) {
            return false;
        }
        if (grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] !== 15) {
            return false;
        }
        // The sums cannot see which values produced them: a seen-set
        // confirms the nine entries are distinct and within 1..9.
        const seen = new Array<boolean>(10).fill(false);
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                const v = grid[r + i][c + j];
                if (v < 1 || v > 9 || seen[v]) {
                    return false;
                }
                seen[v] = true;
            }
        }
        return true;
    };
    let count = 0;
    for (let r = 0; r + 2 < rows; r += 1) {
        for (let c = 0; c + 2 < cols; c += 1) {
            if (isMagic(r, c)) {
                count += 1;
            }
        }
    }
    return count;
}
