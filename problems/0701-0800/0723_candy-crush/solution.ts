function candyCrush(board: number[][]): number[][] {
    // One round: flag every candy inside a horizontal or vertical run of
    // three or more equal values, empty the flagged cells, then let gravity
    // settle every column. Both sweeps read the untouched board, so the
    // flags land simultaneously — an L or T of one candy type loses all of
    // its cells in a single round. Repeat until a round flags nothing; that
    // board is stable.
    const rows = board.length;
    const cols = board[0].length;
    while (true) {
        const marked: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
        let crushed = false;
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j + 2 < cols; ++j) {
                const value = board[i][j];
                if (value !== 0 && value === board[i][j + 1] && value === board[i][j + 2]) {
                    marked[i][j] = true;
                    marked[i][j + 1] = true;
                    marked[i][j + 2] = true;
                    crushed = true;
                }
            }
        }
        for (let j = 0; j < cols; ++j) {
            for (let i = 0; i + 2 < rows; ++i) {
                const value = board[i][j];
                if (value !== 0 && value === board[i + 1][j] && value === board[i + 2][j]) {
                    marked[i][j] = true;
                    marked[i + 1][j] = true;
                    marked[i + 2][j] = true;
                    crushed = true;
                }
            }
        }
        if (!crushed) {
            return board;
        }
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                if (marked[i][j]) {
                    board[i][j] = 0;
                }
            }
        }
        // Gravity: each column compacts downward in place — candies fall
        // past the holes, holes bubble to the top.
        for (let j = 0; j < cols; ++j) {
            let write = rows - 1;
            for (let i = rows - 1; i >= 0; --i) {
                if (board[i][j] !== 0) {
                    board[write][j] = board[i][j];
                    --write;
                }
            }
            for (let i = write; i >= 0; --i) {
                board[i][j] = 0;
            }
        }
    }
}
