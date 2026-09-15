// A table of prefixes instead of recursion: dp[i] holds every sentence for the
// prefix s[:i], built by appending one last word to a sentence of a shorter
// prefix. A prefix that cannot be segmented stays empty, so every split
// hanging off it is pruned before any substring is cut.
func wordBreak(s string, wordDict []string) []string {
	words := make(map[string]struct{}, len(wordDict))
	for _, word := range wordDict {
		words[word] = struct{}{}
	}
	n := len(s)
	// Every row starts as a non-nil empty slice: a prefix with no valid
	// segmentation must serialize as [], not null, when it reaches the top.
	dp := make([][]string, n+1)
	for i := range dp {
		dp[i] = []string{}
	}
	// The empty prefix segments into exactly one sentence: the empty one.
	dp[0] = []string{""}
	for i := 1; i <= n; i++ {
		// The split j runs downward, so the candidate last word s[j:i] is one
		// character long first and grows: sentences whose last word is shorter
		// come first, and among equal last words the sentences of dp[j] keep
		// their own order. That is exactly the order the statement pins,
		// emitted for free — no sorting pass at the end.
		for j := i - 1; j >= 0; j-- {
			if len(dp[j]) == 0 {
				continue
			}
			last := s[j:i]
			if _, ok := words[last]; !ok {
				continue
			}
			if j == 0 {
				dp[i] = append(dp[i], last)
				continue
			}
			for _, head := range dp[j] {
				dp[i] = append(dp[i], head+" "+last)
			}
		}
	}
	return dp[n]
}
