function totalNQueens(n: number): number {
    // One queen per row means rows can never clash; marks for the column
    // and the two diagonal families make "attacked?" a constant-time check.
    const columns = new Array<boolean>(n).fill(false);
    const diagonals = new Array<boolean>(2 * n - 1).fill(false);
    const antiDiagonals = new Array<boolean>(2 * n - 1).fill(false);
    // Every row has a queen: one complete, conflict-free placement.
    const walk = (row: number): number => {
        if (row === n) return 1;
        let count = 0;
        for (let column = 0; column < n; ++column) {
            // r - c is constant along a main diagonal (shifted up by n - 1
            // to stay a valid index), r + c along an anti-diagonal.
            const diagonal = row + n - 1 - column;
            const antiDiagonal = row + column;
            if (columns[column] || diagonals[diagonal] || antiDiagonals[antiDiagonal]) continue;
            columns[column] = diagonals[diagonal] = antiDiagonals[antiDiagonal] = true;
            count += walk(row + 1);
            // Undo the marks so sibling branches start from the same board.
            columns[column] = diagonals[diagonal] = antiDiagonals[antiDiagonal] = false;
        }
        return count;
    };
    return walk(0);
}
