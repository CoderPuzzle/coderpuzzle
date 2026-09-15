import "strings"

func reverseWords(s string) string {
	// The first word only fixes the target vowel count; each later word
	// matching it is reversed in place, everything else (word order,
	// separators) stays as-is.
	words := strings.Split(s, " ")
	countVowels := func(word string) int {
		count := 0
		for i := 0; i < len(word); i++ {
			switch word[i] {
			case 'a', 'e', 'i', 'o', 'u':
				count++
			}
		}
		return count
	}
	target := countVowels(words[0])
	for i := 1; i < len(words); i++ {
		if countVowels(words[i]) == target {
			letters := []byte(words[i])
			for l, r := 0, len(letters)-1; l < r; l, r = l+1, r-1 {
				letters[l], letters[r] = letters[r], letters[l]
			}
			words[i] = string(letters)
		}
	}
	return strings.Join(words, " ")
}
