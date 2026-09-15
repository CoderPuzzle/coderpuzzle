import "strings"

// Broken keys form a boolean table; a word is typable only when none of
// its letters are marked broken.
func canBeTypedWords(text string, brokenLetters string) int {
	var broken [26]bool
	for i := 0; i < len(brokenLetters); i++ {
		broken[brokenLetters[i]-'a'] = true
	}
	count := 0
	for _, word := range strings.Split(text, " ") {
		ok := true
		for i := 0; i < len(word); i++ {
			if broken[word[i]-'a'] {
				ok = false
				break
			}
		}
		if ok {
			count++
		}
	}
	return count
}
