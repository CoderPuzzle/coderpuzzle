func minimizedStringLength(s string) int {
	seen := make([]bool, 26)
	for _, ch := range s {
		seen[ch-'a'] = true
	}
	count := 0
	for _, present := range seen {
		if present {
			count++
		}
	}
	return count
}
