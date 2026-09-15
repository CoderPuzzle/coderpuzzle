function solveSudoku(board: string[][]): string[][] {
    // One pass collects the empty cells and records the digits already used
    // in 27 bitmasks -- one per row, column, and 3x3 box -- with digit d
    // encoded as bit 1 << d.
    const rows = new Array<number>(9).fill(0);
    const cols = new Array<number>(9).fill(0);
    const boxes = new Array<number>(9).fill(0);
    const empties: Array<[number, number]> = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const ch = board[r][c];
            if (ch === ".") {
                empties.push([r, c]);
            } else {
                const bit = 1 << (ch.charCodeAt(0) - 48);
                rows[r] |= bit;
                cols[c] |= bit;
                // Box index flattens the 3x3 block grid.
                boxes[((r / 3) | 0) * 3 + ((c / 3) | 0)] |= bit;
            }
        }
    }

    function backtrack(k: number): boolean {
        // Past the last empty cell: a complete consistent assignment. True
        // unwinds the whole stack immediately, so the solver stops at the
        // first solution (the puzzle is guaranteed unique).
        if (k === empties.length) {
            return true;
        }
        const [r, c] = empties[k];
        const b = ((r / 3) | 0) * 3 + ((c / 3) | 0);
        for (let d = 1; d <= 9; d++) {
            const bit = 1 << d;
            // Legality is three constant-time ANDs against the masks,
            // instead of re-scanning 27 cells.
            if (rows[r] & bit || cols[c] & bit || boxes[b] & bit) {
                continue;
            }
            // Place d: set its three bits, write the cell, attack k + 1.
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            board[r][c] = String(d);
            if (backtrack(k + 1)) {
                return true;
            }
            // Every choice downstream failed: undo the placement -- XOR
            // clears each bit and the cell reverts to '.'.
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
            board[r][c] = ".";
        }
        return false;
    }

    backtrack(0);
    // The board was solved in place and is the answer as-is.
    return board;
}
