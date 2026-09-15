impl Solution {
    pub fn solve_sudoku(mut board: Vec<Vec<String>>) -> Vec<Vec<String>> {
        let mut grid = [[b'.'; 9]; 9];
        for r in 0..9 {
            for c in 0..9 {
                grid[r][c] = board[r][c].as_bytes()[0];
            }
        }
        // One pass collects the empty cells and records the digits already
        // used in 27 bitmasks -- one per row, column, and 3x3 box -- with
        // digit d encoded as bit 1 << d.
        let mut rows = [0u16; 9];
        let mut cols = [0u16; 9];
        let mut boxes = [0u16; 9];
        let mut empties: Vec<(usize, usize)> = Vec::new();
        for r in 0..9 {
            for c in 0..9 {
                let ch = grid[r][c];
                if ch == b'.' {
                    empties.push((r, c));
                } else {
                    let bit = 1u16 << (ch - b'0');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    // Box index flattens the 3x3 block grid.
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }
        Self::backtrack(&mut grid, &mut rows, &mut cols, &mut boxes, &empties, 0);
        for r in 0..9 {
            for c in 0..9 {
                board[r][c] = String::from_utf8(vec![grid[r][c]]).unwrap();
            }
        }
        board
    }

    fn backtrack(
        grid: &mut [[u8; 9]; 9],
        rows: &mut [u16; 9],
        cols: &mut [u16; 9],
        boxes: &mut [u16; 9],
        empties: &[(usize, usize)],
        k: usize,
    ) -> bool {
        // Past the last empty cell: a complete consistent assignment. True
        // unwinds the whole stack immediately, so the solver stops at the
        // first solution (the puzzle is guaranteed unique).
        if k == empties.len() {
            return true;
        }
        let (r, c) = empties[k];
        let b = (r / 3) * 3 + c / 3;
        for d in 1u16..=9 {
            let bit = 1u16 << d;
            // Legality is three constant-time ANDs against the masks,
            // instead of re-scanning 27 cells.
            if rows[r] & bit != 0 || cols[c] & bit != 0 || boxes[b] & bit != 0 {
                continue;
            }
            // Place d: set its three bits, write the cell, attack k + 1.
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            grid[r][c] = b'0' + d as u8;
            if Self::backtrack(grid, rows, cols, boxes, empties, k + 1) {
                return true;
            }
            // Every choice downstream failed: undo the placement -- XOR
            // clears each bit and the cell reverts to '.'.
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
            grid[r][c] = b'.';
        }
        false
    }
}
