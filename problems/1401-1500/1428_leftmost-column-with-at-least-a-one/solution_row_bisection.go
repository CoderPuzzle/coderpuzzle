package main

type Solution struct{}

func (solution *Solution) leftMostColumnWithOne(matrix *BinaryMatrix) int {
	size := matrix.Dimensions()
	rows, cols := size[0], size[1]
	// Per-row binary search for the first 1: a 1 at mid is the best column
	// seen in this row so far (keep searching left of it), a 0 at mid means
	// the row switches strictly right of mid (skip mid and its left); the
	// answer is the minimum over rows.
	answer := -1
	for row := 0; row < rows; row++ {
		lo, hi, first := 0, cols-1, -1
		for lo <= hi {
			mid := (lo + hi) / 2
			if matrix.Get(row, mid) == 1 {
				first = mid
				hi = mid - 1
			} else {
				lo = mid + 1
			}
		}
		if first != -1 && (answer == -1 || first < answer) {
			answer = first
		}
	}
	return answer
}
