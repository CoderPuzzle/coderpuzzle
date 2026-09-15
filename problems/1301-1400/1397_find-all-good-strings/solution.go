func findGoodStrings(n int, s1 string, s2 string, evil string) int {
	const MOD = 1000000007
	m := len(evil)
	fail := make([]int, m)
	k := 0
	for i := 1; i < m; i++ {
		for k > 0 && evil[i] != evil[k] {
			k = fail[k-1]
		}
		if evil[i] == evil[k] {
			k++
		}
		fail[i] = k
	}

	advance := func(state int, code byte) int {
		for state > 0 && evil[state] != code {
			state = fail[state-1]
		}
		if evil[state] == code {
			state++
		}
		return state
	}

	// dp[pos][state][lo][hi]
	dp := make([][][][]int64, n+1)
	for pos := 0; pos <= n; pos++ {
		dp[pos] = make([][][]int64, m+1)
		for st := 0; st <= m; st++ {
			dp[pos][st] = make([][]int64, 2)
			for lo := 0; lo <= 1; lo++ {
				dp[pos][st][lo] = make([]int64, 2)
			}
		}
	}
	for st := 0; st <= m; st++ {
		for lo := 0; lo <= 1; lo++ {
			for hi := 0; hi <= 1; hi++ {
				if st == m {
					dp[n][st][lo][hi] = 0
				} else {
					dp[n][st][lo][hi] = 1
				}
			}
		}
	}
	for pos := n - 1; pos >= 0; pos-- {
		lowBase := s1[pos]
		highBase := s2[pos]
		for st := 0; st <= m; st++ {
			if st == m {
				continue // stays zero
			}
			for lo := 0; lo <= 1; lo++ {
				for hi := 0; hi <= 1; hi++ {
					lowC := byte('a')
					if lo == 1 {
						lowC = lowBase
					}
					highC := byte('z')
					if hi == 1 {
						highC = highBase
					}
					var total int64
					for code := lowC; code <= highC; code++ {
						ns := advance(st, code)
						if ns == m {
							continue
						}
						nlo := 0
						if lo == 1 && code == lowBase {
							nlo = 1
						}
						nhi := 0
						if hi == 1 && code == highBase {
							nhi = 1
						}
						total += dp[pos+1][ns][nlo][nhi]
					}
					dp[pos][st][lo][hi] = total % MOD
				}
			}
		}
	}
	return int(dp[0][0][1][1] % MOD)
}
