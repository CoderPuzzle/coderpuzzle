import "sort"

func longestStrChain(words []string) int {
	// dedupe first (duplicates never extend each other), then process
	// shortest first: every one-deletion predecessor is already in dp
	// when its successor is reached
	unique := make([]string, 0, len(words))
	seen := make(map[string]bool)
	for _, w := range words {
		if !seen[w] {
			seen[w] = true
			unique = append(unique, w)
		}
	}
	sort.Slice(unique, func(a, b int) bool {
		return len(unique[a]) < len(unique[b])
	})
	dp := make(map[string]int)
	best := 0
	for _, word := range unique {
		// dp[word] = longest chain ending at word: 1 + the best value
		// among its one-deletion variants present in dp (1 = alone)
		current := 1
		for i := 0; i < len(word); i++ {
			predecessor := word[:i] + word[i+1:]
			if prev, ok := dp[predecessor]; ok && prev+1 > current {
				current = prev + 1
			}
		}
		dp[word] = current
		if current > best {
			best = current
		}
	}
	return best
}
