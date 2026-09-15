import "strings"

func uncommonFromSentences(s1 string, s2 string) []string {
	// The pinned order is s1's words then s2's, and joining the
	// sentences with one space makes a single stream in that order.
	words := strings.Fields(s1 + " " + s2)
	counts := make(map[string]int)
	for _, word := range words {
		counts[word]++
	}
	result := make([]string, 0, len(words))
	// An uncommon word occurs exactly once overall, so emitting it at
	// its only occurrence is first-appearance order within each
	// sentence — no sort, no seen-list, no map iteration order.
	for _, word := range words {
		if counts[word] == 1 {
			result = append(result, word)
		}
	}
	return result
}
