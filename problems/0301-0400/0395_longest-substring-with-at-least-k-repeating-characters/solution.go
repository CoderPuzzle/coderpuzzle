func longestSubstring(s string, k int) int {
	var longest func(lo, hi int) int
	longest = func(lo, hi int) int {
		if lo >= hi {
			return 0
		}
		var counts [128]int
		for i := lo; i < hi; i++ {
			counts[s[i]]++
		}
		// A character rarer than k inside this piece can never reach k by
		// shortening the substring, so it is a hard splitter.
		allFrequent := true
		for c := 0; c < 128; c++ {
			if counts[c] > 0 && counts[c] < k {
				allFrequent = false
				break
			}
		}
		if allFrequent {
			// No splitter: the whole piece is already valid.
			return hi - lo
		}
		best := 0
		start := lo
		// Recurse on the pieces between consecutive rare characters; each
		// level eliminates at least one letter, so depth is bounded by 26.
		for i := lo; i < hi; i++ {
			if counts[s[i]] < k {
				if l := longest(start, i); l > best {
					best = l
				}
				start = i + 1
			}
		}
		if l := longest(start, hi); l > best {
			best = l
		}
		return best
	}
	return longest(0, len(s))
}
