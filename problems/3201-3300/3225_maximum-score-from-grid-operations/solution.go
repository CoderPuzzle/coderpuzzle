func maximumScore(grid [][]int) int64 {
	n := len(grid)
	// pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a column
	// is the difference of two such monotone prefixes. Answers reach
	// n*n*10^9 ≈ 10^13, so all sums are int64.
	pre := make([][]int64, n)
	for j := range pre {
		pre[j] = make([]int64, n+1)
		for r := 0; r < n; r++ {
			pre[j][r+1] = pre[j][r] + int64(grid[r][j])
		}
	}

	const neg int64 = -(1 << 60)
	// A play is fully described by one height h[j] in [0, n] per column
	// (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
	// (r >= h[j]) and some horizontal neighbor is black (r < taller
	// neighbor height), so column j is worth the segment of column sums
	// [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying the
	// last two heights; choosing the next height settles the middle
	// column's flanks, crediting it exactly once. dp[c][a]: best score
	// after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
	dp := make([][]int64, n+1)
	for c := range dp {
		dp[c] = make([]int64, n+1)
		for a := range dp[c] {
			dp[c][a] = neg
		}
		dp[c][0] = 0
	}

	for t := 1; t < n; t++ {
		pcol := pre[t-1]
		ndp := make([][]int64, n+1)
		for c := range ndp {
			ndp[c] = make([]int64, n+1)
			for a := range ndp[c] {
				ndp[c][a] = neg
			}
		}
		for a := 0; a <= n; a++ {
			row := dp[a]
			// Credit for choosing h[t] = c is
			//   row[b] + pcol[max(a, b, c)] - pcol[a]
			// over previous heights b. Splitting b against K = max(a, c)
			// makes this an O(1) pair of lookup maxima: b <= K adds the
			// constant pcol[K] to a prefix maximum, while b > K keeps its
			// own pcol[b] in a suffix maximum.
			pm := make([]int64, n+1)
			sp := make([]int64, n+2)
			m := neg
			for b := 0; b <= n; b++ {
				if row[b] > m {
					m = row[b]
				}
				pm[b] = m
			}
			for b := n; b >= 0; b-- {
				if w := row[b] + pcol[b]; w > sp[b+1] {
					sp[b] = w
				} else {
					sp[b] = sp[b+1]
				}
			}
			for c := 0; c <= n; c++ {
				k := a
				if c > k {
					k = c
				}
				best := pm[k] + pcol[k]
				if sp[k+1] > best {
					best = sp[k+1]
				}
				if v := best - pcol[a]; v > ndp[c][a] {
					ndp[c][a] = v
				}
			}
		}
		dp = ndp
	}

	// Final virtual choice: the last column has no right neighbor, so it is
	// credited against max(h[n-2], 0).
	plast := pre[n-1]
	ans := int64(-1)
	for a := 0; a <= n; a++ {
		row := dp[a]
		pm := make([]int64, n+1)
		sp := make([]int64, n+2)
		m := neg
		for b := 0; b <= n; b++ {
			if row[b] > m {
				m = row[b]
			}
			pm[b] = m
		}
		for b := n; b >= 0; b-- {
			if w := row[b] + plast[b]; w > sp[b+1] {
				sp[b] = w
			} else {
				sp[b] = sp[b+1]
			}
		}
		best := pm[a] + plast[a]
		if sp[a+1] > best {
			best = sp[a+1]
		}
		if v := best - plast[a]; v > ans {
			ans = v
		}
	}
	return ans
}
