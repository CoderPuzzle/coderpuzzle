func equalFrequency(word string) bool {
	// Count all 26 letters, then try removing one occurrence of each
	// present letter and test whether the surviving frequencies collapse
	// to a single value. 26 candidates x O(26) check.
	freq := [26]int{}
	for _, ch := range word {
		freq[ch-'a']++
	}
	for c := 0; c < 26; c++ {
		if freq[c] == 0 {
			continue
		}
		freq[c]--
		remaining := map[int]bool{}
		for _, f := range freq {
			if f > 0 {
				remaining[f] = true
			}
		}
		if len(remaining) <= 1 {
			return true
		}
		freq[c]++
	}
	return false
}
