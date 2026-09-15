// Binary search the answer m: m == 1 needs full alternation, so the cost is
// the smaller Hamming distance to one of the two alternating targets; for
// m >= 2 a run of length L independently costs floor(L/(m+1)) flips, all
// placeable strictly inside the run so runs never merge.
func minLength(s string, numOps int) int {
	n := len(s)
	ok := func(m int) bool {
		if m == 1 {
			alt := 0
			for i := 0; i < n; i++ {
				if s[i] != "01"[i%2] {
					alt++
				}
			}
			return min(alt, n-alt) <= numOps
		}
		flips, run := 0, 1
		for i := 1; i < n; i++ {
			if s[i] == s[i-1] {
				run++
			} else {
				flips += run / (m + 1)
				run = 1
			}
		}
		return flips+run/(m+1) <= numOps
	}
	lo, hi := 1, n
	for lo < hi {
		mid := lo + (hi-lo)/2
		if ok(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
