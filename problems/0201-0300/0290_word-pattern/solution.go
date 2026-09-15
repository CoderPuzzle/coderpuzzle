import "strings"

// The pattern holds under a bijection: each letter names exactly one word,
// and no two letters share a word. Each clause is one map, checked together
// in a single pass over letter/word pairs.
func wordPattern(pattern string, s string) bool {
	words := strings.Split(s, " ")
	if len(pattern) != len(words) {
		// With counts different, letters and words cannot pair one-to-one.
		return false
	}
	letterToWord := make(map[byte]string)
	wordToLetter := make(map[string]byte)
	for index, word := range words {
		letter := pattern[index]
		// One branch per direction: the letter already names a different
		// word, or the word is already claimed by a different letter.
		if bound, ok := letterToWord[letter]; ok && bound != word {
			return false
		}
		if owner, ok := wordToLetter[word]; ok && owner != letter {
			return false
		}
		letterToWord[letter] = word
		wordToLetter[word] = letter
	}
	return true
}
