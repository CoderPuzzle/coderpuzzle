import "strings"

// Straight scan: count the words whose leading characters match pref
// exactly.
func prefixCount(words []string, pref string) int {
	count := 0
	for _, word := range words {
		if strings.HasPrefix(word, pref) {
			count++
		}
	}
	return count
}
