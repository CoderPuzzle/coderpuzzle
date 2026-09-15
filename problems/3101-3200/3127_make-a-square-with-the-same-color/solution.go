func canMakeSquare(grid [][]string) bool {
	// A 2x2 square becomes monochrome with at most one recolor exactly
	// when it is not split 2-2, i.e. one color already owns at least three
	// of its four cells; a single flip then absorbs the odd cell out. Four
	// candidate squares to check.
	for r := 0; r < 2; r++ {
		for c := 0; c < 2; c++ {
			black := 0
			for dr := 0; dr < 2; dr++ {
				for dc := 0; dc < 2; dc++ {
					if grid[r+dr][c+dc] == "B" {
						black++
					}
				}
			}
			if black != 2 {
				return true
			}
		}
	}
	return false
}
