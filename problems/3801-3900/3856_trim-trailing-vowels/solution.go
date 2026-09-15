func trimTrailingVowels(s string) string {
	end := len(s)
	for end > 0 && isVowel(s[end-1]) {
		end--
	}
	return s[:end]
}

func isVowel(c byte) bool {
	return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
}
