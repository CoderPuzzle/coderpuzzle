func minOperations(s1 string, s2 string, x int) int {
	var diffs []int
	for i := 0; i < len(s1); i++ {
		if s1[i] != s2[i] {
			diffs = append(diffs, i)
		}
	}
	m := len(diffs)
	if m%2 == 1 {
		return -1
	}
	const INF = int64(1) << 40
	// pending[i][c]: mismatches before i are resolved, mismatch i is not,
	// and c = 1 when an already-paid x-op covers one future mismatch for
	// free. The credit may stay open across other pairs — nesting an
	// x-pair around an adjacent chain is exactly what beats pairing
	// consecutive mismatches when x is small.
	pending := make([][2]int64, m+1)
	for i := range pending {
		pending[i][0], pending[i][1] = INF, INF
	}
	pending[0][0] = 0
	for i := 0; i < m; i++ {
		free, credited := pending[i][0], pending[i][1]
		// Close a credit: mismatch i flips free with the earlier partner.
		if credited < pending[i+1][0] {
			pending[i+1][0] = credited
		}
		// Open a credit: pay x, mismatch i pairs with a later mismatch.
		if free+int64(x) < pending[i+1][1] {
			pending[i+1][1] = free + int64(x)
		}
		if i+2 <= m {
			pairCost := min64(int64(x), int64(diffs[i+1]-diffs[i]))
			if free+pairCost < pending[i+2][0] {
				pending[i+2][0] = free + pairCost
			}
			if credited+pairCost < pending[i+2][1] {
				pending[i+2][1] = credited + pairCost
			}
		}
	}
	return int(pending[m][0])
}

func min64(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}
