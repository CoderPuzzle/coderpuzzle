function countBattleships(board: string[][]): number {
    // Battleships are straight horizontal or vertical runs of 'X', and
    // no two ships touch, so each ship has exactly one cell with no 'X'
    // above it and no 'X' to its left: its head, the first of its cells
    // in reading order. Counting heads counts ships.
    const m = board.length;
    const n = board[0].length;
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== "X") continue;
            if (i > 0 && board[i - 1][j] === "X") continue;
            if (j > 0 && board[i][j - 1] === "X") continue;
            count++;
        }
    }
    return count;
}
