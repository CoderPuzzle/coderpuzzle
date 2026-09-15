func lengthOfLongestSubstring(s string) int {
	// last[c] holds the most recent index of byte c; -1 means never seen,
	// which folds the membership check into the guard below.
	last := make([]int, 128)
	for i := range last {
		last[i] = -1
	}
	start, best := 0, 0
	for i := 0; i < len(s); i++ {
		c := s[i]
		// The >= start guard ignores occurrences left of the window;
		// without it start could be dragged backwards.
		if last[c] >= start {
			// The window can no longer include that older occurrence, so
			// start leaps over the conflict instead of shrinking by one.
			start = last[c] + 1
		}
		last[c] = i
		// Window s[start:i+1] is duplicate-free again: record its length.
		if i-start+1 > best {
			best = i - start + 1
		}
	}
	return best
}
