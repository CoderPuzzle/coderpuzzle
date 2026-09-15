func findColumnWidth(grid [][]int) []int {
	// Width of a value = digits of its magnitude plus one sign character
	// when negative. Repeated division by 10 counts the digits without
	// materializing strings, and every column keeps a running maximum.
	widths := make([]int, len(grid[0]))
	for _, row := range grid {
		for column, value := range row {
			width := 0
			if value < 0 {
				width++
			}
			rest := value
			if rest < 0 {
				rest = -rest
			}
			for {
				width++
				rest /= 10
				if rest == 0 {
					break
				}
			}
			if width > widths[column] {
				widths[column] = width
			}
		}
	}
	return widths
}
