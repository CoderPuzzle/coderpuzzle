func countPrefixSuffixPairs(words []string) int64 {
	// Trie over paired characters (first+last, second+second-last, ...).
	// Node counters stay below 10^5, but the total can reach ~5 * 10^9,
	// so the accumulator is an int64.
	edges := make(map[int]int)
	counts := make([]int, 1, 500001)
	var total int64
	for _, word := range words {
		size := len(word)
		node := 0
		for j := 0; j < size; j++ {
			key := node*676 + int(word[j]-'a')*26 + int(word[size-1-j]-'a')
			next, ok := edges[key]
			if !ok {
				next = len(counts)
				edges[key] = next
				counts = append(counts, 0)
			}
			node = next
			total += int64(counts[node])
		}
		counts[node]++
	}
	return total
}
