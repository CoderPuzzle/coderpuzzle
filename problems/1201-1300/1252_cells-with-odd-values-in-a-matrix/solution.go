func oddCells(m int, n int, indices [][]int) int {
	rowOdd := make([]bool, m)
	colOdd := make([]bool, n)
	for _, rc := range indices {
		// Only parity survives; the cell value is row count + column count.
		rowOdd[rc[0]] = !rowOdd[rc[0]]
		colOdd[rc[1]] = !colOdd[rc[1]]
	}
	oddRows, oddCols := 0, 0
	for _, b := range rowOdd {
		if b {
			oddRows++
		}
	}
	for _, b := range colOdd {
		if b {
			oddCols++
		}
	}
	return oddRows*(n-oddCols) + (m-oddRows)*oddCols
}
