import "sort"
import "strings"

func generateSentences(synonyms [][]string, text string) []string {
	// Union-find over every word mentioned in a pair.
	parent := make(map[string]string)
	var find func(x string) string
	find = func(x string) string {
		if _, ok := parent[x]; !ok {
			parent[x] = x
		}
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	for _, pair := range synonyms {
		parent[find(pair[0])] = find(pair[1])
	}

	groups := make(map[string][]string)
	for word := range parent {
		root := find(word)
		groups[root] = append(groups[root], word)
	}
	for _, group := range groups {
		sort.Strings(group)
	}

	// Expand position by position.
	sentences := []string{""}
	for _, word := range strings.Split(text, " ") {
		options, ok := parent[word]
		var members []string
		if ok {
			members = groups[find(options)]
		} else {
			members = []string{word}
		}
		next := make([]string, 0, len(sentences)*len(members))
		for _, prefix := range sentences {
			for _, option := range members {
				next = append(next, prefix+" "+option)
			}
		}
		sentences = next
	}
	result := make([]string, len(sentences))
	for i, s := range sentences {
		result[i] = s[1:]
	}
	sort.Strings(result)
	return result
}
