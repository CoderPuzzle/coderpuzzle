func countCoveredBuildings(n int, buildings [][]int) int {
	// Per x-line: extreme y values; per y-line: extreme x values. A
	// building is covered exactly when it is strictly inside both.
	rowMinY := make([]int, n+1)
	rowMaxY := make([]int, n+1)
	colMinX := make([]int, n+1)
	colMaxX := make([]int, n+1)
	for i := range rowMinY {
		rowMinY[i] = n + 1
		colMinX[i] = n + 1
	}
	for _, b := range buildings {
		x, y := b[0], b[1]
		if y < rowMinY[x] {
			rowMinY[x] = y
		}
		if y > rowMaxY[x] {
			rowMaxY[x] = y
		}
		if x < colMinX[y] {
			colMinX[y] = x
		}
		if x > colMaxX[y] {
			colMaxX[y] = x
		}
	}
	covered := 0
	for _, b := range buildings {
		x, y := b[0], b[1]
		if rowMinY[x] < y && y < rowMaxY[x] && colMinX[y] < x && x < colMaxX[y] {
			covered++
		}
	}
	return covered
}
