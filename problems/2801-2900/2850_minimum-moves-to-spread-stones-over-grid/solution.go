func minimumMoves(grid [][]int) int {
	// Pair every empty cell with a cell still holding at least two stones;
	// the cost of a pair is the Manhattan distance between the cells, and
	// backtracking over all donor choices finds the cheapest perfect
	// pairing.
	var empties [][2]int
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if grid[i][j] == 0 {
				empties = append(empties, [2]int{i, j})
			}
		}
	}
	var fill func(k int) int
	fill = func(k int) int {
		if k == len(empties) {
			return 0
		}
		i := empties[k][0]
		j := empties[k][1]
		best := 99
		for r := 0; r < 3; r++ {
			di := i - r
			if di < 0 {
				di = -di
			}
			for c := 0; c < 3; c++ {
				dj := j - c
				if dj < 0 {
					dj = -dj
				}
				if grid[r][c] >= 2 {
					grid[r][c]--
					total := di + dj + fill(k+1)
					if total < best {
						best = total
					}
					grid[r][c]++
				}
			}
		}
		return best
	}
	return fill(0)
}
