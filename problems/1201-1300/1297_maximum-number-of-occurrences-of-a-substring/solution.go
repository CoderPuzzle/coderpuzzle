func maxFreq(s string, maxLetters int, minSize int, maxSize int) int {
	// A length-L qualifying substring (L > minSize) has a minSize prefix
	// occurring at least as often, so only exact-minSize windows count.
	counts := make(map[string]int)
	best := 0
	for start := 0; start+minSize <= len(s); start++ {
		window := s[start : start+minSize]
		var seen [26]bool
		distinct := 0
		for i := 0; i < len(window); i++ {
			if !seen[window[i]-'a'] {
				seen[window[i]-'a'] = true
				distinct++
			}
		}
		if distinct <= maxLetters {
			counts[window]++
			if counts[window] > best {
				best = counts[window]
			}
		}
	}
	return best
}
