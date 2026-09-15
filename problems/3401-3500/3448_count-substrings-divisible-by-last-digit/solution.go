func countSubstrings(s string) int64 {
	var digits []int
	for i := 0; i < len(s); i++ {
		digits = append(digits, int(s[i]-'0'))
	}
	var total int64
	// One independent pass per candidate last digit d; the passes sum.
	// cnt[r] counts suffixes of the already-processed prefix whose value
	// is congruent to r modulo d.
	for d := 1; d < 10; d++ {
		cnt := make([]int64, d)
		for _, di := range digits {
			// Extending a suffix of remainder r by this digit d yields
			// r*10 + d, divisible exactly when (r*10)%d == 0; the +1
			// covers the single-character substring "d".
			if di == d {
				for r := 0; r < d; r++ {
					if (r*10)%d == 0 {
						total += cnt[r]
					}
				}
				total += 1
			}
			// Remap every suffix: appending di sends remainder r to
			// (10*r+di)%d, and di alone starts a fresh suffix.
			newCnt := make([]int64, d)
			for r := 0; r < d; r++ {
				if cnt[r] != 0 {
					newCnt[(r*10+di)%d] += cnt[r]
				}
			}
			newCnt[di%d] += 1
			cnt = newCnt
		}
	}
	return total
}
