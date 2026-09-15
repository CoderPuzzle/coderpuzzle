import "strings"

func mostWordsFound(sentences []string) int {
	maximum := 0
	for _, sentence := range sentences {
		words := strings.Count(sentence, " ") + 1
		if words > maximum {
			maximum = words
		}
	}
	return maximum
}
