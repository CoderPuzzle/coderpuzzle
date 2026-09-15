import "strings"

// One pass over the words. Each word is reshaped by its first letter
// alone: a vowel-initial word survives intact, a consonant-initial word
// rotates its first letter to the end. Every word then takes "ma" plus
// one more 'a' per its 1-based index, so the i-th word ends in exactly
// i 'a's. The vowel test is case-blind: 'I' opens the first example as
// a vowel.
func toGoatLatin(sentence string) string {
	const vowels = "aeiouAEIOU"
	words := strings.Fields(sentence)
	out := make([]string, 0, len(words))
	for index, word := range words {
		if !strings.ContainsRune(vowels, rune(word[0])) {
			word = word[1:] + word[:1]
		}
		out = append(out, word+"ma"+strings.Repeat("a", index+1))
	}
	return strings.Join(out, " ")
}
