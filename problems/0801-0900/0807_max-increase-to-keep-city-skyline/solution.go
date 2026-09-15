// Seen along one axis of the city, every row collapses to its tallest
// building, and seen along the other, every column does — those 2n
// maxima are all four skylines hold. A raise is safe exactly while the
// building stays at or below both of its maxima, so the shorter of the
// two is each cell's ceiling and the answer is the total gap below it.
func maxIncreaseKeepingSkyline(grid [][]int) int {
	n := len(grid)
	rowMax := make([]int, n)
	colMax := make([]int, n)
	for r, row := range grid {
		rowMax[r] = row[0]
		for c := 1; c < n; c++ {
			rowMax[r] = max(rowMax[r], row[c])
		}
	}
	for c := 0; c < n; c++ {
		colMax[c] = grid[0][c]
		for r := 1; r < n; r++ {
			colMax[c] = max(colMax[c], grid[r][c])
		}
	}
	total := 0
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			total += min(rowMax[r], colMax[c]) - grid[r][c]
		}
	}
	return total
}
