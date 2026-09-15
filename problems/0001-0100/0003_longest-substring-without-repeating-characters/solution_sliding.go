func lengthOfLongestSubstring(s string) int {
	// inWindow marks the characters currently inside the window
	// s[start:i+1], which never contains a duplicate.
	var inWindow [128]bool
	start, best := 0, 0
	for i := 0; i < len(s); i++ {
		c := s[i]
		// Evict characters from the left until c can enter without
		// duplicating: the window shrinks one step at a time.
		for inWindow[c] {
			inWindow[s[start]] = false
			start++
		}
		inWindow[c] = true
		// The window is duplicate-free again: record its length.
		if i-start+1 > best {
			best = i - start + 1
		}
	}
	return best
}
