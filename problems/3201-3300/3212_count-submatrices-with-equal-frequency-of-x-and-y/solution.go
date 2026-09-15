// Every counted submatrix contains grid[0][0], so each candidate is exactly
// the top-left rectangle ending at some cell. A running sum over the current
// row plus the previous row's prefix sums gives each rectangle's signed
// balance (X = +1, Y = -1); a parallel slice gives its X-count. Count cells
// whose balance is zero but which hold at least one X.
func numberOfSubmatrices(grid [][]string) int {
	cols := len(grid[0])
	prevSum := make([]int, cols)
	prevX := make([]int, cols)
	total := 0
	for r := 0; r < len(grid); r++ {
		curSum := make([]int, cols)
		curX := make([]int, cols)
		runSum, runX := 0, 0
		for c := 0; c < cols; c++ {
			switch cell := grid[r][c]; cell {
			case "X":
				runSum++
				runX++
			case "Y":
				runSum--
			}
			curSum[c] = runSum + prevSum[c]
			curX[c] = runX + prevX[c]
			if curSum[c] == 0 && curX[c] > 0 {
				total++
			}
		}
		prevSum = curSum
		prevX = curX
	}
	return total
}
