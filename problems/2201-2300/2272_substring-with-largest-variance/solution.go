func largestVariance(s string) int {
	var present [26]bool
	for k := 0; k < len(s); k++ {
		present[s[k]-'a'] = true
	}
	answer := 0
	// Variance = max over ordered pairs (high, low) of count(high) -
	// count(low), with both chars present in the substring. Map high to
	// +1, low to -1, everything else to 0, and run Kadane per pair.
	for high := 0; high < 26; high++ {
		if !present[high] {
			continue
		}
		for low := 0; low < 26; low++ {
			if !present[low] || high == low {
				continue
			}
			diff := 0        // max subarray sum ending here (may lack `low`)
			hasLow := false  // whether diffWithLow has been initialized
			diffWithLow := 0 // same but guaranteed to contain at least one `low`
			for k := 0; k < len(s); k++ {
				ch := s[k] - 'a'
				if int(ch) == high {
					diff++
					if hasLow {
						diffWithLow++
					}
				} else if int(ch) == low {
					diff--
					// Extend the best-with-low through this -1, or graft the
					// entire no-`low` prefix ending here onto it — always at
					// least as good as restarting from scratch.
					if hasLow {
						if diffWithLow-1 > diff {
							diffWithLow = diffWithLow - 1
						} else {
							diffWithLow = diff
						}
					} else {
						// First `low`: initialize with diff (which now
						// includes this -1) so the low is truly inside.
						diffWithLow = diff
						hasLow = true
					}
					if diff < 0 {
						diff = 0
					}
				}
				// else: neither char, both values unchanged
				// Only the guaranteed-to-contain-low value is a legal
				// variance candidate.
				if hasLow && diffWithLow > answer {
					answer = diffWithLow
				}
			}
		}
	}
	return answer
}
