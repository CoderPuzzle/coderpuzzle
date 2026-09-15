func lengthOfLongestSubstringKDistinct(s string, k int) int {
	// Feasibility of a fixed length: does any window of exactly L symbols
	// carry at most k distinct ones? One sweep maintains the multiplicities
	// of the current window, sliding its left edge out one step behind its
	// right edge.
	feasible := func(length int) bool {
		if length == 0 {
			return true
		}
		counts := make(map[byte]int)
		distinct := 0
		for i := 0; i < len(s); i++ {
			counts[s[i]]++
			if counts[s[i]] == 1 {
				distinct++
			}
			if i >= length {
				outgoing := s[i-length]
				counts[outgoing]--
				if counts[outgoing] == 0 {
					distinct--
				}
			}
			if i >= length-1 && distinct <= k {
				return true
			}
		}
		return false
	}
	// A substring of a valid window is valid too, so feasibility is
	// monotone in the length — binary search for the longest feasible.
	lo, hi := 0, len(s)
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
