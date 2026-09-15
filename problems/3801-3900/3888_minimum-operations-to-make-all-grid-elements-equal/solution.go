func minOperations(grid [][]int, k int) int64 {
	m := len(grid)
	n := len(grid[0])
	// Every operation count is an affine function A*T + B of the target T,
	// with A always 0 or 1. Two 2D prefix sums answer the "coverage from
	// already-placed blocks" query for each cell in O(1).
	pa := make([][]int64, m+1)
	pb := make([][]int64, m+1)
	for i := range pa {
		pa[i] = make([]int64, n+1)
		pb[i] = make([]int64, n+1)
	}
	hasFixed := false
	var fixedT int64 // T fixed by a boundary cell
	hasLow := false
	var lowT int64 // lower bound on T from X >= 0 (A == 1 cells)
	var sumA int64
	var sumB int64
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			r1 := i - k + 1
			if r1 < 0 {
				r1 = 0
			}
			c1 := j - k + 1
			if c1 < 0 {
				c1 = 0
			}
			covA := rect(pa, r1, i-1, c1, j) + rect(pa, i, i, c1, j-1)
			covB := rect(pb, r1, i-1, c1, j) + rect(pb, i, i, c1, j-1)
			var a, b int64
			if i <= m-k && j <= n-k {
				a = 1 - covA
				b = -int64(grid[i][j]) - covB
				if a == 1 {
					if !hasLow || -b > lowT {
						lowT = -b
						hasLow = true
					}
				} else if a == 0 {
					if b < 0 {
						return -1
					}
				} else {
					return -1
				}
				sumA += a
				sumB += b
			} else {
				// Boundary cell: grid[i][j] + cov must equal T.
				if covA == 1 {
					if int64(grid[i][j])+covB != 0 {
						return -1
					}
				} else if covA == 0 {
					t := int64(grid[i][j]) + covB
					if !hasFixed {
						hasFixed = true
						fixedT = t
					} else if fixedT != t {
						return -1
					}
				} else {
					return -1
				}
				a = 0
				b = 0
			}
			pa[i+1][j+1] = pa[i][j+1] + pa[i+1][j] - pa[i][j] + a
			pb[i+1][j+1] = pb[i][j+1] + pb[i+1][j] - pb[i][j] + b
		}
	}
	if hasFixed {
		if hasLow && fixedT < lowT {
			return -1
		}
		return sumA*fixedT + sumB
	}
	t := lowT
	if !hasLow {
		t = 0
	}
	return sumA*t + sumB
}

func rect(p [][]int64, r1, r2, c1, c2 int) int64 {
	if r1 > r2 || c1 > c2 {
		return 0
	}
	return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]
}
