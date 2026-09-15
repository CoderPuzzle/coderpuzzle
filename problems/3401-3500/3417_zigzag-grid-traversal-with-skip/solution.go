func zigzagTraversal(grid [][]int) []int {
	// Sweep the rows in zigzag order (even rows left-to-right, odd rows
	// reversed) flipping a take/skip toggle at every cell.
	var result []int
	take := true
	for i, row := range grid {
		if i%2 == 0 {
			for _, value := range row {
				if take {
					result = append(result, value)
				}
				take = !take
			}
		} else {
			for j := len(row) - 1; j >= 0; j-- {
				if take {
					result = append(result, row[j])
				}
				take = !take
			}
		}
	}
	return result
}
