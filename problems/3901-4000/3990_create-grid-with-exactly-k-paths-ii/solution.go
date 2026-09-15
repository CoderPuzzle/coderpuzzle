import "strings"

func createGrid(k int) []string {
	e := bitsLen(k) - 1 // highest set bit; doublers 1..e form the chain
	if e == 0 {
		return []string{"."}
	}

	width := 2*e + 4 // collector column 2e+3 at the right edge
	grid := make([][]byte, 2*e+1)
	for i := range grid {
		grid[i] = []byte(strings.Repeat("#", width))
	}
	grid[0][0] = '.' // start feeds doubler 1's entry (0, 2)
	grid[0][1] = '.'
	for d := 1; d <= e; d++ {
		for _, i := range [2]int{2*d - 2, 2*d - 1} { // open 2x2 doubler
			for _, j := range [2]int{2 * d, 2*d + 1} {
				grid[i][j] = '.'
			}
		}
		if d < e {
			// forced down-then-right connector; the alternative cell
			// (2d-1, 2d+2) stays an obstacle
			grid[2*d][2*d+1] = '.'
		}
	}

	top := 2 * e
	for b := 0; b < e; b++ { // bit b shunts from doubler (b+1)'s top-right
		if (k>>b)&1 == 1 {
			for j := 2*b + 4; j < width; j++ {
				grid[2*b][j] = '.'
			}
			if 2*b < top {
				top = 2 * b
			}
		}
	}
	// leading bit e: the chain exit drops one row, below every other shunt,
	// then runs right to the collector column
	grid[2*e][2*e+1] = '.'
	for j := 2*e + 2; j < width; j++ {
		grid[2*e][j] = '.'
	}
	for i := top; i <= 2*e; i++ { // collector descends to (2e, 2e+3)
		grid[i][2*e+3] = '.'
	}
	rows := make([]string, len(grid))
	for i, row := range grid {
		rows[i] = string(row)
	}
	return rows
}

func bitsLen(k int) int {
	n := 0
	for k > 0 {
		n++
		k >>= 1
	}
	return n
}
