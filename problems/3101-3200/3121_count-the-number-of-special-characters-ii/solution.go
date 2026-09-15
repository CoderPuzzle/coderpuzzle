func numberOfSpecialChars(word string) int {
	// Special means every lowercase occurrence sits before the first
	// uppercase one, i.e. last-lower index < first-upper index; both
	// positions per letter are captured in a single pass.
	firstUpper := make([]int, 26)
	lastLower := make([]int, 26)
	for k := range firstUpper {
		firstUpper[k] = -1
		lastLower[k] = -1
	}
	for position := 0; position < len(word); position++ {
		ch := word[position]
		if ch >= 'a' {
			lastLower[ch-'a'] = position
		} else if firstUpper[ch-'A'] == -1 {
			firstUpper[ch-'A'] = position
		}
	}
	count := 0
	for k := 0; k < 26; k++ {
		if firstUpper[k] != -1 && lastLower[k] != -1 && lastLower[k] < firstUpper[k] {
			count++
		}
	}
	return count
}
