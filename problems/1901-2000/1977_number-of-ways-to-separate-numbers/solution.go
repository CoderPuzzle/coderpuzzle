func numberOfCombinations(num string) int {
	const MOD = 1_000_000_007
	n := len(num)
	if n == 0 || num[0] == '0' {
		return 0
	}

	// lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
	lcp := make([][]uint16, n+1)
	for i := range lcp {
		lcp[i] = make([]uint16, n+1)
	}
	for i := n - 1; i >= 0; i-- {
		row := lcp[i]
		nxt := lcp[i+1]
		ci := num[i]
		for j := n - 1; j >= 0; j-- {
			if ci == num[j] {
				row[j] = nxt[j+1] + 1
			}
		}
	}

	// pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD), where dp[i][j] counts
	// separations of num[:i] whose last number is num[i-j:i].
	// dp is recovered from consecutive pre differences mod MOD.
	pre := make([][]int32, n+1)
	for i := range pre {
		pre[i] = make([]int32, n+1)
	}
	for i := 1; i <= n; i++ {
		preI := pre[i]
		for j := 1; j <= i; j++ {
			var val int32
			if j == i {
				val = 1 // whole prefix num[:i] is a single number
			} else if num[i-j] == '0' {
				val = 0 // leading zero not allowed
			} else {
				m := i - j
				lim := j - 1
				if m < lim {
					lim = m
				}
				val = pre[m][lim]
				if m >= j {
					a := i - 2*j
					b := m
					l := int(lcp[a][b])
					if l >= j || num[a+l] <= num[b+l] {
						add := pre[m][j] - pre[m][j-1]
						if add < 0 {
							add += MOD
						}
						val += add
						if val >= MOD {
							val -= MOD
						}
					}
				}
			}
			preI[j] = preI[j-1] + val
			if preI[j] >= MOD {
				preI[j] -= MOD
			}
		}
	}
	return int(pre[n][n])
}
