func isValid(word string) bool {
	// One scan: reject any character outside digits/letters while tracking
	// whether a vowel and a consonant were both seen.
	if len(word) < 3 {
		return false
	}
	hasVowel := false
	hasConsonant := false
	for _, ch := range []byte(word) {
		low := ch | 0x20
		switch {
		case (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'):
			if low == 'a' || low == 'e' || low == 'i' || low == 'o' || low == 'u' {
				hasVowel = true
			} else {
				hasConsonant = true
			}
		case ch >= '0' && ch <= '9':
			continue
		default:
			return false
		}
	}
	return hasVowel && hasConsonant
}
