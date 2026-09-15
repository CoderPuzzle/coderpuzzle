function updateBoard(board: string[][], click: number[]): string[][] {
    // A revealed mine ends the game on the spot: it becomes 'X' and no
    // other cell changes, so return before any flood starts.
    const rows = board.length;
    const cols = board[0].length;
    const [r0, c0] = click;
    if (board[r0][c0] === "M") {
        board[r0][c0] = "X";
        return board;
    }
    // Breadth-first reveal from the clicked square, on an explicit queue:
    // a blank region can span every cell of a 50 x 50 board, deeper than
    // recursion would safely go.
    const directions: [number, number][] = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    const queue: [number, number][] = [[r0, c0]];
    let head = 0;
    while (head < queue.length) {
        const [r, c] = queue[head++];
        // Two blanks can enqueue the same neighbor; only its first
        // processing reveals it, and this check drops the stale copy.
        if (board[r][c] !== "E") {
            continue;
        }
        // An empty square's face is its count of adjacent mines, and that
        // count is exactly what bounds the flood.
        let mines = 0;
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === "M") {
                mines++;
            }
        }
        if (mines > 0) {
            // Digits are the frontier of the flood: they stop it.
            board[r][c] = String(mines);
            continue;
        }
        board[r][c] = "B";
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === "E") {
                queue.push([nr, nc]);
            }
        }
    }
    // The reveal happened inside the input allocation; the same board, now
    // revealed, is what the judge compares.
    return board;
}
