import "sort"

func topKFrequent(words []string, k int) []string {
	// One counting pass over the array.
	counts := make(map[string]int)
	for _, w := range words {
		counts[w]++
	}
	// Buckets indexed by frequency: a word with count c lands in
	// buckets[c], and no count can exceed n.
	n := len(words)
	buckets := make([][]string, n+1)
	for w, c := range counts {
		buckets[c] = append(buckets[c], w)
	}
	result := make([]string, 0, k)
	// Walk frequencies from the highest possible down; within one bucket
	// sort words ascending, so ties break alphabetically — and stop as
	// soon as k words are in hand.
	for c := n; c >= 1 && len(result) < k; c-- {
		bucket := buckets[c]
		if len(bucket) == 0 {
			continue
		}
		sort.Strings(bucket)
		for _, w := range bucket {
			if len(result) == k {
				break
			}
			result = append(result, w)
		}
	}
	return result
}
