func maxSideLength(mat [][]int, threshold int) int {
	m := len(mat)
	n := len(mat[0])
	// prefix[i][j] = sum of the rectangle from (0,0) to (i-1, j-1)
	prefix := make([][]int64, m+1)
	for i := range prefix {
		prefix[i] = make([]int64, n+1)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			prefix[i+1][j+1] = prefix[i+1][j] + prefix[i][j+1] - prefix[i][j] + int64(mat[i][j])
		}
	}

	// inclusion-exclusion of four corners: any square sum in O(1)
	squareSum := func(i, j, k int) int64 {
		p := prefix
		return p[i+k][j+k] - p[i][j+k] - p[i+k][j] + p[i][j]
	}

	// one global answer; each top-left corner only tries to extend it
	ans := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			// try side ans+1 while it fits the matrix and the threshold;
			// ans never shrinks, so failures cost a single O(1) check and
			// each side length is paid at most once across the scan
			for i+ans < m && j+ans < n && squareSum(i, j, ans+1) <= int64(threshold) {
				ans++
			}
		}
	}
	return ans
}
