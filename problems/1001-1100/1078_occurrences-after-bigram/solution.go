import "strings"

func findOcurrences(text string, first string, second string) []string {
	words := strings.Split(text, " ")
	// Non-nil empty so a no-match result serializes as [].
	thirds := []string{}
	// Bounding at len(words)-2 guarantees words[i+2] always exists, so a
	// bigram landing on the last two words is never inspected.
	for i := 0; i+2 < len(words); i++ {
		if words[i] == first && words[i+1] == second {
			thirds = append(thirds, words[i+2])
		}
	}
	return thirds
}
