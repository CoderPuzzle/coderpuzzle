// Rows are Bob's last move; columns are diff = Bob's points minus Alice's,
// shifted by n + 1 so -n..n indexes 0..2n+2. Each round, target row t is
// fed by the two other rows — both moved by the same delta(t, alice) — so
// one elementwise add plus one shifted copy advances every diff at once,
// keeping the bottom-up pass at O(n^2) with no recursion.
func countWinningSequences(s string) int {
	const mod = 1_000_000_007
	delta := [3][3]int{{0, -1, 1}, {1, 0, -1}, {-1, 1, 0}} // target x alice
	n := len(s)
	offset := n + 1
	width := 2*n + 3
	dp := make([][]int64, 3)
	for m := range dp {
		dp[m] = make([]int64, width)
	}
	for m := 0; m < 3; m++ {
		dp[m][offset+delta[m][code(s[0])]] = 1
	}
	for i := 1; i < n; i++ {
		a := code(s[i])
		ndp := make([][]int64, 3)
		for m := range ndp {
			ndp[m] = make([]int64, width)
		}
		for t := 0; t < 3; t++ {
			u, v := (t+1)%3, (t+2)%3
			d := delta[t][a]
			for j := 0; j < width; j++ {
				nj := j + d
				if nj < 0 || nj >= width {
					continue
				}
				value := dp[u][j] + dp[v][j]
				if value >= mod {
					value -= mod
				}
				ndp[t][nj] = value
			}
		}
		dp = ndp
	}
	// Entries stay below mod, so the triple-row total stays below
	// 6 * 10^3 * mod and int64 absorbs it before the final reduction.
	var total int64
	for m := 0; m < 3; m++ {
		for j := offset + 1; j < width; j++ {
			total += dp[m][j]
		}
	}
	return int(total % mod)
}

func code(c byte) int {
	if c == 'F' {
		return 0
	} else if c == 'W' {
		return 1
	}
	return 2
}
