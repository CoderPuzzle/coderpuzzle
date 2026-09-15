import "sort"

// The three rooks occupy three distinct rows; pick the middle row i.
// top[i][j] is the best cell in column j above row i and bottom[i][j] the
// best below. A placement takes one column from the top band, one from row
// i, one from the bottom band, all distinct — and only each band's three
// best columns can matter, so 27 combinations per middle row are exact.
// Sums reach 3 * 10^9, so accumulate in int64.
func maximumValueSum(board [][]int) int64 {
	m, n := len(board), len(board[0])
	top := make([][]int64, m)
	bottom := make([][]int64, m)
	for i := 0; i < m; i++ {
		top[i] = make([]int64, n)
		bottom[i] = make([]int64, n)
	}
	for j := 0; j < n; j++ {
		top[0][j] = int64(board[0][j])
		for i := 1; i < m; i++ {
			top[i][j] = max(top[i-1][j], int64(board[i][j]))
		}
		bottom[m-1][j] = int64(board[m-1][j])
		for i := m - 2; i >= 0; i-- {
			bottom[i][j] = max(bottom[i+1][j], int64(board[i][j]))
		}
	}
	const neg int64 = -(1 << 62)
	ans := neg
	for i := 1; i < m-1; i++ {
		t := pick(top[i-1])
		mid := pickInt(board[i])
		b := pick(bottom[i+1])
		for _, ca := range t {
			for _, cb := range mid {
				if cb == ca {
					continue
				}
				for _, cc := range b {
					if cc == ca || cc == cb {
						continue
					}
					ans = max(ans, top[i-1][ca]+int64(board[i][cb])+bottom[i+1][cc])
				}
			}
		}
	}
	return ans
}

// pick returns the up-to-3 column indices of the largest values in vals.
func pick(vals []int64) []int {
	idx := make([]int, len(vals))
	for c := range vals {
		idx[c] = c
	}
	sort.Slice(idx, func(a, b int) bool { return vals[idx[a]] > vals[idx[b]] })
	return idx[:3]
}

// pickInt is pick for a board row of int32 values.
func pickInt(vals []int) []int {
	idx := make([]int, len(vals))
	for c := range vals {
		idx[c] = c
	}
	sort.Slice(idx, func(a, b int) bool { return vals[idx[a]] > vals[idx[b]] })
	return idx[:3]
}
