// Only the two canonical alternating patterns are targets. Each swap fixes
// exactly two mismatched positions, so a pattern costs mismatches divided by
// two; take the cheaper count-feasible pattern.
func minSwaps(s string) int {
	ones := 0
	n := len(s)
	for i := 0; i < n; i++ {
		ones += int(s[i] - '0')
	}
	if ones*2-n > 1 || n-ones*2 > 1 {
		return -1
	}
	best := -1
	for start := 0; start <= 1; start++ {
		patternOnes := n / 2
		if start == 0 {
			patternOnes = (n + 1) / 2
		}
		if patternOnes != ones {
			continue
		}
		mism := 0
		for i := 0; i < n; i++ {
			want := byte('0' + ((i & 1) ^ start ^ 1))
			if s[i] != want {
				mism++
			}
		}
		if best < 0 || mism/2 < best {
			best = mism / 2
		}
	}
	return best
}
