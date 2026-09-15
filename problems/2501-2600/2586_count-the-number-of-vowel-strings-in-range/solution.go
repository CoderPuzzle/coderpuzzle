// A word counts exactly when both endpoints are vowels; a rune classifier
// keeps each endpoint check constant time.
func vowelStrings(words []string, left int, right int) int {
	isVowel := func(c byte) bool {
		return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
	}
	count := 0
	for i := left; i <= right; i++ {
		word := words[i]
		if isVowel(word[0]) && isVowel(word[len(word)-1]) {
			count++
		}
	}
	return count
}
