import "sort"

func minimumCost(m int, n int, horizontalCut []int, verticalCut []int) int64 {
	// Each line is priced once per perpendicular strip alive when it is
	// cut, and swapping two adjacent cuts of different families changes
	// the total by (cheaper - more expensive), so an optimal schedule
	// always takes the globally most expensive remaining line. Merge both
	// arrays largest-first, charging each horizontal cut times the current
	// vertical strip count and vice versa. Totals reach about 2 * 10^13,
	// so everything widens to int64.
	sort.Ints(horizontalCut)
	sort.Ints(verticalCut)
	var total int64
	rowPieces, colPieces := 1, 1
	i, j := m-2, n-2
	for i >= 0 || j >= 0 {
		if j < 0 || (i >= 0 && horizontalCut[i] >= verticalCut[j]) {
			total += int64(horizontalCut[i]) * int64(colPieces)
			i--
			rowPieces++
		} else {
			total += int64(verticalCut[j]) * int64(rowPieces)
			j--
			colPieces++
		}
	}
	return total
}
