import "math"

func maxSumSubmatrix(matrix [][]int, k int) int {
	m := len(matrix)
	n := len(matrix[0])
	// prefix[r][c] = sum of the r x c rectangle in the top-left corner;
	// any block is four lookups against this table.
	prefix := make([][]int, m+1)
	for r := range prefix {
		prefix[r] = make([]int, n+1)
	}
	for r := 1; r <= m; r++ {
		for c := 1; c <= n; c++ {
			prefix[r][c] = prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1] + matrix[r-1][c-1]
		}
	}
	// Walk every block by its four corner coordinates and keep the largest
	// total that respects the cap.
	best := math.MinInt
	for top := 0; top < m; top++ {
		for bottom := top; bottom < m; bottom++ {
			for left := 0; left < n; left++ {
				pt := prefix[top]
				pb := prefix[bottom+1]
				for right := left; right < n; right++ {
					total := pb[right+1] - pt[right+1] - pb[left] + pt[left]
					if total <= k && total > best {
						best = total
					}
				}
			}
		}
	}
	return best
}
