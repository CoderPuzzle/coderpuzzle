func wordBreak(s string, wordDict []string) bool {
	words := make(map[string]struct{}, len(wordDict))
	for _, word := range wordDict {
		words[word] = struct{}{}
	}
	n := len(s)
	// reachable[i]: the prefix s[0..i) can be segmented; the empty prefix is
	// trivially segmentable.
	reachable := make([]bool, n+1)
	reachable[0] = true
	for i := 1; i <= n; i++ {
		// Any segmentation of s[0..i) ends with a last word s[j..i).
		for j := 0; j < i; j++ {
			if reachable[j] {
				if _, ok := words[s[j:i]]; ok {
					reachable[i] = true
					// Only feasibility matters, so stop at the first split.
					break
				}
			}
		}
	}
	return reachable[n]
}
