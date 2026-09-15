func tictactoe(moves [][]int) string {
	// Tally each player's occupancy per row and column as moves land,
	// diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is
	// a completed line. In a valid transcript the game stops at the first
	// completed line, so the mover who completes one wins on the spot and
	// later moves cannot exist.
	rows := [3]int{}
	cols := [3]int{}
	diag, anti := 0, 0
	for i, move := range moves {
		r, c := move[0], move[1]
		step := 1
		if i%2 == 1 {
			step = -1
		}
		rows[r] += step
		cols[c] += step
		if r == c {
			diag += step
		}
		if r+c == 2 {
			anti += step
		}
		reach := rows[r]
		if colTally := cols[c]; abs(colTally) > abs(reach) {
			reach = colTally
		}
		if abs(diag) > abs(reach) {
			reach = diag
		}
		if abs(anti) > abs(reach) {
			reach = anti
		}
		if abs(reach) == 3 {
			if step == 1 {
				return "A"
			}
			return "B"
		}
	}
	if len(moves) == 9 {
		return "Draw"
	}
	return "Pending"
}

func abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}
