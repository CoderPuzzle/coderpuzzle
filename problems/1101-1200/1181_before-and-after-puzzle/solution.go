import (
	"sort"
	"strings"
)

func beforeAndAfterPuzzles(phrases []string) []string {
	n := len(phrases)
	words := make([][]string, n)
	for i, p := range phrases {
		words[i] = strings.Split(p, " ")
	}
	// File every phrase position under its first word: the bucket a
	// predecessor will search by its own last word.
	byFirst := make(map[string][]int)
	for i := 0; i < n; i++ {
		byFirst[words[i][0]] = append(byFirst[words[i][0]], i)
	}
	results := make(map[string]bool)
	for i := 0; i < n; i++ {
		last := words[i][len(words[i])-1]
		for _, j := range byFirst[last] {
			if j == i {
				continue // a phrase never pairs with its own position
			}
			var builder strings.Builder
			builder.WriteString(phrases[i])
			for k := 1; k < len(words[j]); k++ {
				builder.WriteString(" ")
				builder.WriteString(words[j][k])
			}
			results[builder.String()] = true
		}
	}
	answer := make([]string, 0, len(results))
	for text := range results {
		answer = append(answer, text)
	}
	sort.Strings(answer)
	return answer
}
