func greatestLetter(s string) string {
	// present[0..25] = lowercase seen, present[26..51] = uppercase seen.
	present := make([]bool, 52)
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= 'a' {
			present[c-'a'] = true
		} else {
			present[26+c-'A'] = true
		}
	}
	for i := 25; i >= 0; i-- {
		if present[i] && present[26+i] {
			return string(rune('A' + i))
		}
	}
	return ""
}
