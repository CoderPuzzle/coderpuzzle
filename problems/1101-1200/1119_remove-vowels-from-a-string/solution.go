func removeVowels(s string) string {
	kept := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case 'a', 'e', 'i', 'o', 'u':
			// vowel — dropped
		default:
			kept = append(kept, s[i])
		}
	}
	return string(kept)
}
