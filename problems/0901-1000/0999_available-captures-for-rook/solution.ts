function numRookCaptures(board: string[][]): number {
    let rookRow = -1;
    let rookCol = -1;
    for (let row = 0; row < 8; ++row) {
        for (let col = 0; col < 8; ++col) {
            if (board[row][col] === "R") {
                rookRow = row;
                rookCol = col;
            }
        }
    }

    let captures = 0;
    for (const [deltaRow, deltaCol] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ]) {
        let row = rookRow + deltaRow;
        let col = rookCol + deltaCol;
        // Walk while the path is still empty; stop at the first piece or the edge.
        while (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] === ".") {
            row += deltaRow;
            col += deltaCol;
        }
        if (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] === "p") ++captures;
    }
    return captures;
}
