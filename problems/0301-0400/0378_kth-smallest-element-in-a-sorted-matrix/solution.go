func kthSmallest(matrix [][]int, k int) int {
	n := len(matrix)
	countLe := func(x int64) int64 {
		// Staircase walk from bottom-left: elements <= x.
		count := int64(0)
		row, col := n-1, 0
		for row >= 0 && col < n {
			if int64(matrix[row][col]) <= x {
				count += int64(row + 1)
				col++
			} else {
				row--
			}
		}
		return count
	}
	lo, hi := int64(matrix[0][0]), int64(matrix[n-1][n-1])
	for lo < hi {
		mid := lo + (hi-lo)/2 // floor of (lo + hi) / 2
		if countLe(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
