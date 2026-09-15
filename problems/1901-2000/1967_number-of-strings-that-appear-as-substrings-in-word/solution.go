import "strings"

// Each pattern is judged on its own: count the ones that occur as a
// contiguous substring of word.
func numOfStrings(patterns []string, word string) int {
	count := 0
	for _, pattern := range patterns {
		if strings.Contains(word, pattern) {
			count++
		}
	}
	return count
}
