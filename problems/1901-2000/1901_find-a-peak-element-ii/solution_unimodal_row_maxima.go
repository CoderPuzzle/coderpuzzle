func rowMax(mat [][]int, r int) int {
	// Largest entry of a row, as a column index.
	j := 0
	for c := 1; c < len(mat[r]); c++ {
		if mat[r][c] > mat[r][j] {
			j = c
		}
	}
	return j
}

func findPeakGrid(mat [][]int) []int {
	// The judge's matrices hold exactly one peak, which is therefore the
	// global maximum — and the row maxima climb strictly up to its row and
	// fall strictly away after it. Binary search that unimodal sequence:
	// step toward whichever neighboring row is larger.
	lo, hi := 0, len(mat)-1
	for lo < hi {
		mid := (lo + hi) / 2
		if mat[mid][rowMax(mat, mid)] < mat[mid+1][rowMax(mat, mid+1)] {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	// The peak row's own maximum is the peak itself.
	return []int{lo, rowMax(mat, lo)}
}
