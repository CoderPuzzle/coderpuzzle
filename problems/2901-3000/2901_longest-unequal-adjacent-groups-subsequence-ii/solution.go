func getWordsInLongestSubsequence(words []string, groups []int) []string {
	// dp[i] is the length of the longest valid subsequence ending at index
	// i; prev[i] remembers the predecessor that achieved it. Scanning
	// predecessors from i - 1 downward and updating only on a strict
	// improvement keeps the latest compatible index attaining the maximum,
	// which pins one deterministic answer out of the many the statement
	// permits.
	n := len(words)
	dp := make([]int, n)
	prev := make([]int, n)
	for i := range dp {
		dp[i] = 1
		prev[i] = -1
	}
	for i := 0; i < n; i++ {
		for j := i - 1; j >= 0; j-- {
			if groups[j] == groups[i] || len(words[j]) != len(words[i]) {
				continue
			}
			if dp[j]+1 <= dp[i] {
				continue
			}
			// Hamming distance exactly 1: walk the equal-length strings
			// and stop at a second mismatch.
			diffs := 0
			for p := 0; p < len(words[j]) && diffs < 2; p++ {
				if words[j][p] != words[i][p] {
					diffs++
				}
			}
			if diffs == 1 {
				dp[i] = dp[j] + 1
				prev[i] = j
			}
		}
	}
	best := n - 1
	for i := n - 2; i >= 0; i-- {
		if dp[i] > dp[best] {
			best = i
		}
	}
	answer := []string{}
	for i := best; i != -1; i = prev[i] {
		answer = append(answer, words[i])
	}
	for l, r := 0, len(answer)-1; l < r; l, r = l+1, r-1 {
		answer[l], answer[r] = answer[r], answer[l]
	}
	return answer
}
