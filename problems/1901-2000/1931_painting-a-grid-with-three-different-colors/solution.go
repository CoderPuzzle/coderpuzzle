func colorTheGrid(m int, n int) int {
	const MOD = 1000000007

	// Enumerate all valid column colorings (adjacent rows differ).
	total := 1
	for r := 0; r < m; r++ {
		total *= 3
	}
	var states [][]int
	for code := 0; code < total; code++ {
		col := make([]int, m)
		c := code
		for r := 0; r < m; r++ {
			col[r] = c % 3
			c /= 3
		}
		ok := true
		for r := 0; r+1 < m; r++ {
			if col[r] == col[r+1] {
				ok = false
			}
		}
		if ok {
			states = append(states, col)
		}
	}

	length := len(states)
	// Two columns may be adjacent exactly when they differ in every row;
	// precompute that compatibility table once.
	compat := make([][]int, length)
	for i := 0; i < length; i++ {
		for j := 0; j < length; j++ {
			ok := true
			for r := 0; r < m; r++ {
				if states[i][r] == states[j][r] {
					ok = false
				}
			}
			if ok {
				compat[i] = append(compat[i], j)
			}
		}
	}

	// All ones: the first column can take any valid coloring (this also
	// makes n=1 fall out with the loop body never running).
	cur := make([]int64, length)
	for i := range cur {
		cur[i] = 1
	}
	for step := 0; step < n-1; step++ {
		nxt := make([]int64, length)
		for i := 0; i < length; i++ {
			if cur[i] != 0 { // skip zero-count states (constant-factor saving)
				for _, j := range compat[i] {
					nxt[j] = (nxt[j] + cur[i]) % MOD
				}
			}
		}
		cur = nxt
	}
	// The last column may end in any state, so sum the whole vector.
	var ans int64
	for _, c := range cur {
		ans = (ans + c) % MOD
	}
	return int(ans)
}
