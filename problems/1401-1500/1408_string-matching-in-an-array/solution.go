import "strings"

func stringMatching(words []string) []string {
	result := make([]string, 0)
	for i, word := range words {
		for j, other := range words {
			if j != i && strings.Contains(other, word) {
				result = append(result, word)
				break
			}
		}
	}
	return result
}
