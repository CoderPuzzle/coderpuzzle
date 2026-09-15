function isValidSudoku(board: string[][]): boolean {
    // One seen-set per row, column, and 3x3 box: insert each filled cell's
    // digit into the three units it belongs to, and the first repeat
    // anywhere is the answer.
    const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set<string>());
    const columns: Set<string>[] = Array.from({ length: 9 }, () => new Set<string>());
    const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set<string>());
    for (let r = 0; r < 9; ++r) {
        for (let c = 0; c < 9; ++c) {
            const digit = board[r][c];
            if (digit === ".") continue;
            // Rows and columns are chunked in threes, so this numbers
            // the 3x3 boxes 0 through 8.
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            if (rows[r].has(digit) || columns[c].has(digit) || boxes[b].has(digit)) {
                return false;
            }
            rows[r].add(digit);
            columns[c].add(digit);
            boxes[b].add(digit);
        }
    }
    return true;
}
