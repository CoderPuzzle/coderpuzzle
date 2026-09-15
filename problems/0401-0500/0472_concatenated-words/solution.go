func findAllConcatenatedWordsInADict(words []string) []string {
	dictionary := make(map[string]bool, len(words))
	for _, word := range words {
		dictionary[word] = true
	}

	isConcatenated := func(word string) bool {
		n := len(word)
		// Word-break DP: dp[i] = the first i chars split entirely into
		// dictionary words (dp[0] = empty prefix).
		dp := make([]bool, n+1)
		dp[0] = true
		for i := 1; i <= n; i++ {
			for j := 0; j < i; j++ {
				// Excluding the whole-word split forces >= 2 pieces; only
				// proper substrings are looked up, so the unfiltered set of
				// all words is safe.
				if j == 0 && i == n {
					continue // the word itself does not count as a part
				}
				if dp[j] && dictionary[word[j:i]] {
					// One valid split per position suffices.
					dp[i] = true
					break
				}
			}
		}
		return dp[n]
	}

	result := []string{}
	for _, word := range words {
		if isConcatenated(word) {
			result = append(result, word)
		}
	}
	return result
}
