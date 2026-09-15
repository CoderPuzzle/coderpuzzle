// Two indexes walk word and abbr together: a letter must match exactly, a
// digit run is one skip, and both walks must end together.
func validWordAbbreviation(word string, abbr string) bool {
	i, j := 0, 0
	for i < len(word) && j < len(abbr) {
		c := abbr[j]
		if c >= '0' && c <= '9' {
			// A digit run may not open with '0': that is a leading zero (and
			// a zero skip would replace an empty substring).
			if c == '0' {
				return false
			}
			skip := 0
			// Consume the whole run: "12" and "55" are single skips, so
			// adjacent replacements can never masquerade as two.
			for j < len(abbr) && abbr[j] >= '0' && abbr[j] <= '9' {
				skip = skip*10 + int(abbr[j]-'0')
				j++
			}
			i += skip
		} else {
			if word[i] != c {
				return false
			}
			i++
			j++
		}
	}
	// A skip past the end, leftover word, or leftover abbr all fail here.
	return i == len(word) && j == len(abbr)
}
