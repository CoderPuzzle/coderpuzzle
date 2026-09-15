import (
	"sort"
	"strings"
)

func sortFeatures(features []string, responses []string) []string {
	// A response contributes to a feature at most once: count each
	// distinct word of the response that names a feature.
	popularity := make(map[string]int, len(features))
	for _, f := range features {
		popularity[f] = 0
	}
	for _, response := range responses {
		seen := make(map[string]bool)
		for _, word := range strings.Fields(response) {
			if !seen[word] {
				seen[word] = true
				if _, ok := popularity[word]; ok {
					popularity[word]++
				}
			}
		}
	}
	order := make([]int, len(features))
	for i := range order {
		order[i] = i
	}
	// Total order: higher popularity first, then the earlier original
	// index — the comparator fully orders every pair, so no sort
	// stability is relied on.
	sort.Slice(order, func(a, b int) bool {
		pa, pb := popularity[features[order[a]]], popularity[features[order[b]]]
		if pa != pb {
			return pa > pb
		}
		return order[a] < order[b]
	})
	result := make([]string, 0, len(features))
	for _, i := range order {
		result = append(result, features[i])
	}
	return result
}
