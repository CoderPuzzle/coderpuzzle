import "strings"

// A word qualifies exactly when x occurs in it; strings.Contains answers
// that in one call, so a single pass over words collects the matching
// indices in order.
func findWordsContaining(words []string, x string) []int {
	result := []int{}
	for i, word := range words {
		if strings.Contains(word, x) {
			result = append(result, i)
		}
	}
	return result
}
