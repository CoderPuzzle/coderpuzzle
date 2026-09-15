func minimumOperationsToWriteY(grid [][]int) int {
	n := len(grid)
	mid := n / 2
	yCount := [3]int{}
	otherCount := [3]int{}
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			onY := (r == c && r <= mid) ||
				(c == n-1-r && r <= mid) ||
				(c == mid && r >= mid)
			if onY {
				yCount[grid[r][c]]++
			} else {
				otherCount[grid[r][c]]++
			}
		}
	}
	best := n * n
	for yValue := 0; yValue < 3; yValue++ {
		for otherValue := 0; otherValue < 3; otherValue++ {
			if yValue == otherValue {
				continue
			}
			cost := 0
			for value := 0; value < 3; value++ {
				if value != yValue {
					cost += yCount[value]
				}
				if value != otherValue {
					cost += otherCount[value]
				}
			}
			if cost < best {
				best = cost
			}
		}
	}
	return best
}
