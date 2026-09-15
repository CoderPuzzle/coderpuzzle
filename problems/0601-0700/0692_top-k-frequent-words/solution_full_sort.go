import "sort"

func topKFrequent(words []string, k int) []string {
	// One counting pass over the array.
	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}
	type rankedEntry struct {
		word  string
		count int
	}
	ranked := make([]rankedEntry, 0, len(counts))
	for word, count := range counts {
		ranked = append(ranked, rankedEntry{word, count})
	}
	// Sort every unique word under the statement's total order — count
	// descending, then word ascending — and keep the first k.
	sort.Slice(ranked, func(i, j int) bool {
		if ranked[i].count != ranked[j].count {
			return ranked[i].count > ranked[j].count
		}
		return ranked[i].word < ranked[j].word
	})
	result := make([]string, 0, k)
	for _, e := range ranked {
		if len(result) == k {
			break
		}
		result = append(result, e.word)
	}
	return result
}
