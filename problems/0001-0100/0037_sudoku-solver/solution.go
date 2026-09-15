func solveSudoku(board [][]string) [][]string {
	// One pass collects the empty cells and records the digits already used
	// in 27 bitmasks -- one per row, column, and 3x3 box -- with digit d
	// encoded as bit 1 << d.
	rows := make([]int, 9)
	cols := make([]int, 9)
	boxes := make([]int, 9)
	type cell struct{ r, c int }
	empties := make([]cell, 0, 81)
	for r := 0; r < 9; r++ {
		for c := 0; c < 9; c++ {
			ch := board[r][c]
			if ch == "." {
				empties = append(empties, cell{r, c})
			} else {
				bit := 1 << int(ch[0]-'0')
				rows[r] |= bit
				cols[c] |= bit
				// Box index flattens the 3x3 block grid.
				boxes[(r/3)*3+c/3] |= bit
			}
		}
	}

	var backtrack func(k int) bool
	backtrack = func(k int) bool {
		// Past the last empty cell: a complete consistent assignment. True
		// unwinds the whole stack immediately, so the solver stops at the
		// first solution (the puzzle is guaranteed unique).
		if k == len(empties) {
			return true
		}
		r, c := empties[k].r, empties[k].c
		b := (r/3)*3 + c/3
		for d := 1; d <= 9; d++ {
			bit := 1 << d
			// Legality is three constant-time ANDs against the masks,
			// instead of re-scanning 27 cells.
			if rows[r]&bit != 0 || cols[c]&bit != 0 || boxes[b]&bit != 0 {
				continue
			}
			// Place d: set its three bits, write the cell, attack k + 1.
			rows[r] |= bit
			cols[c] |= bit
			boxes[b] |= bit
			board[r][c] = string(rune('0' + d))
			if backtrack(k + 1) {
				return true
			}
			// Every choice downstream failed: undo the placement -- XOR
			// clears each bit and the cell reverts to '.'.
			rows[r] ^= bit
			cols[c] ^= bit
			boxes[b] ^= bit
			board[r][c] = "."
		}
		return false
	}

	backtrack(0)
	// The board was solved in place and is the answer as-is.
	return board
}
