func minWindow(s string, t string) string {
	if len(t) == 0 || len(t) > len(s) {
		return ""
	}
	var quota [128]int
	kinds := 0
	for i := 0; i < len(t); i++ {
		if quota[t[i]] == 0 {
			kinds++
		}
		quota[t[i]]++
	}
	// Slide one window of exactly `length` across s. `below` counts
	// demanded letters still short of quota, so below == 0 means this
	// window covers t; letters absent from t never touch it.
	covers := func(length int) int {
		var have [128]int
		below := kinds
		for i := 0; i < length; i++ {
			ch := s[i]
			if quota[ch] > 0 {
				have[ch]++
				if have[ch] == quota[ch] {
					below--
				}
			}
		}
		if below == 0 {
			return 0
		}
		for start := 1; start+length <= len(s); start++ {
			in := s[start+length-1]
			if quota[in] > 0 {
				have[in]++
				if have[in] == quota[in] {
					below--
				}
			}
			out := s[start-1]
			if quota[out] > 0 {
				// Dropping from exactly-at-quota to one short reopens the
				// debt; deeper surpluses change nothing.
				if have[out] == quota[out] {
					below++
				}
				have[out]--
			}
			if below == 0 {
				return start
			}
		}
		return -1
	}
	// Coverage is monotone in the length: a covering window of length L
	// sits inside a covering window of length L + 1, so "some window of
	// length L covers t" is false below the answer and true from it
	// upward. Binary search for the smallest surviving length.
	lo, hi := len(t), len(s)
	bestStart, bestLen := -1, -1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		start := covers(mid)
		if start >= 0 {
			bestStart, bestLen = start, mid
			hi = mid - 1
		} else {
			lo = mid + 1
		}
	}
	// Within the minimal length the scan reports the leftmost cover, the
	// same window the shrinking sweep settles on.
	if bestLen == -1 {
		return ""
	}
	return s[bestStart : bestStart+bestLen]
}
