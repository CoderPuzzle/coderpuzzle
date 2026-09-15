import "strings"

// Morse code of 'a'..'z' in alphabetical order; a letter's entry sits at
// word[i] - 'a'.
var morseTable = [...]string{
	".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
	"..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
	"--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
	"-.--", "--..",
}

func uniqueMorseRepresentations(words []string) int {
	// A word's transformation is its letters' codes joined in order; the
	// set counts distinct results, so equal transformations fold.
	seen := make(map[string]bool)
	for _, word := range words {
		var transformation strings.Builder
		for i := 0; i < len(word); i++ {
			transformation.WriteString(morseTable[word[i]-'a'])
		}
		seen[transformation.String()] = true
	}
	return len(seen)
}
