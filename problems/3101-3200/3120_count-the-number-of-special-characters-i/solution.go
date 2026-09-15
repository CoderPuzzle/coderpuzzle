func numberOfSpecialChars(word string) int {
	// A letter is special iff both of its cases occur somewhere; mark the
	// two 26-slot case flags in one pass, then count full pairs.
	var lower, upper [26]bool
	for i := 0; i < len(word); i++ {
		ch := word[i]
		if ch >= 'a' {
			lower[ch-'a'] = true
		} else {
			upper[ch-'A'] = true
		}
	}
	count := 0
	for k := 0; k < 26; k++ {
		if lower[k] && upper[k] {
			count++
		}
	}
	return count
}
