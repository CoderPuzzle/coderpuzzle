func numberOfStableArrays(zero int, one int, limit int) int {
	const MOD = int64(1000000007)
	// Count prefixes by usage and last character: f0[a][b] ends in 0,
	// f1[a][b] ends in 1. Each new character extends some block of at
	// most `limit` copies; looping over block lengths collapses into a
	// sliding window over pref0, the row-wise prefix sums of f0, keeping
	// the whole build bottom-up and iterative. Tables and window
	// accumulators are int64: a window sums up to `limit` residues
	// (~10^9), reaching ~2 x 10^11 > 2^31.
	f0 := make([][]int64, zero+1)
	f1 := make([][]int64, zero+1)
	pref0 := make([][]int64, zero+1)
	for a := 0; a <= zero; a++ {
		f0[a] = make([]int64, one+1)
		f1[a] = make([]int64, one+1)
		pref0[a] = make([]int64, one+2)
	}
	for a := 1; a <= min(limit, zero); a++ {
		f0[a][0] = 1
		pref0[a][1] = 1
	}
	for b := 1; b <= one; b++ {
		low := max(0, b-limit)
		for a := 0; a <= zero; a++ {
			if a == 0 {
				if b <= limit {
					f1[a][b] = 1
				}
			} else {
				f1[a][b] = (pref0[a][b] - pref0[a][low] + MOD) % MOD
			}
		}
		var running int64
		for a := 1; a <= zero; a++ {
			running += f1[a-1][b]
			if a-limit-1 >= 0 {
				running -= f1[a-limit-1][b]
				running = ((running % MOD) + MOD) % MOD
			}
			f0[a][b] = running % MOD
		}
		for a := 0; a <= zero; a++ {
			pref0[a][b+1] = (pref0[a][b] + f0[a][b]) % MOD
		}
	}
	return int((f0[zero][one] + f1[zero][one]) % MOD)
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
