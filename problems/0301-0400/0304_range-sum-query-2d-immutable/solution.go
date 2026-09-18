package main

type NumMatrix struct {
	prefix [][]int64
}

func NewNumMatrixTyped(matrix [][]int) *NumMatrix {
	rows, cols := len(matrix), len(matrix[0])
	// Integral image: prefix[r][c] sums rows 0..r-1 and columns 0..c-1.
	// The guard row and column of zeros remove every boundary special
	// case from the index arithmetic. Held in int64: the worst-case
	// total is 4*10^8.
	prefix := make([][]int64, rows+1)
	for r := range prefix {
		prefix[r] = make([]int64, cols+1)
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			// Inclusion-exclusion over three already-computed
			// neighbors; the top-left term is subtracted because
			// both the row strip and column strip contain it.
			prefix[r+1][c+1] = int64(matrix[r][c]) + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]
		}
	}
	return &NumMatrix{prefix: prefix}
}

func (design *NumMatrix) sumRegion(top int, left int, bottom int, right int) int64 {
	// The same inclusion-exclusion in reverse: the strips above and
	// left of the query cancel, leaving the rectangle in O(1).
	prefix := design.prefix
	return prefix[bottom+1][right+1] - prefix[top][right+1] - prefix[bottom+1][left] + prefix[top][left]
}
