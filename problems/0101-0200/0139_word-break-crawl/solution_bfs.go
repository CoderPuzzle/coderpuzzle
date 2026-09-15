func wordBreak(s string, wordDict []string) bool {
	words := make(map[string]struct{}, len(wordDict))
	maxLen := 0
	for _, word := range wordDict {
		words[word] = struct{}{}
		// Only entries short enough to fit can ever be a next piece.
		if len(word) > maxLen {
			maxLen = len(word)
		}
	}
	n := len(s)
	// BFS over start indices: start positions reachable by segmenting a
	// prefix of s. visited keeps each index enqueued at most once.
	visited := make([]bool, n+1)
	visited[0] = true
	queue := []int{0}
	for head := 0; head < len(queue); head++ {
		i := queue[head]
		// Try every wordDict entry as the next piece s[i:i+L].
		limit := min(maxLen, n-i)
		for length := 1; length <= limit; length++ {
			if _, ok := words[s[i:i+length]]; ok {
				end := i + length
				// Reaching the far end means the whole string segments.
				if end == n {
					return true
				}
				if !visited[end] {
					visited[end] = true
					queue = append(queue, end)
				}
			}
		}
	}
	// No reachable start ever crossed the finish line.
	return false
}
