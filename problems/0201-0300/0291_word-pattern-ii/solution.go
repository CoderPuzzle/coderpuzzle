import "strings"

func wordPatternMatch(pattern string, s string) bool {
	// Depth-first walk over pattern positions with a two-way map:
	// forward (char -> word) keeps every later occurrence of the char
	// honest, backward (word -> char) enforces the bijection.
	charToWord := map[byte]string{}
	wordToChar := map[string]byte{}
	var match func(pi, si int) bool
	match = func(pi, si int) bool {
		if pi == len(pattern) {
			// Every char placed: a match only when s is fully consumed.
			return si == len(s)
		}
		if si == len(s) {
			// Chars remain but s is exhausted; mappings are non-empty.
			return false
		}
		letter := pattern[pi]
		if word, ok := charToWord[letter]; ok {
			// A char already mapped must reproduce its word exactly.
			return strings.HasPrefix(s[si:], word) && match(pi+1, si+len(word))
		}
		for end := si + 1; end <= len(s); end++ {
			word := s[si:end]
			// Bijection: the word is already another char's image.
			if _, ok := wordToChar[word]; ok {
				continue
			}
			charToWord[letter] = word
			wordToChar[word] = letter
			if match(pi+1, end) {
				return true
			}
			delete(charToWord, letter)
			delete(wordToChar, word)
		}
		return false
	}
	return match(0, 0)
}
