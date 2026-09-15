func minimizeConcatenatedLength(words []string) int {
	// dp[first][last] = shortest length of a concatenation of the words
	// processed so far starting with `first` and ending with `last`.
	const inf = 1 << 30
	dp := make([][26]int, 26)
	for f := range dp {
		for l := range dp[f] {
			dp[f][l] = inf
		}
	}
	dp[int(words[0][0]-'a')][int(words[0][len(words[0])-1]-'a')] = len(words[0])
	for _, word := range words[1:] {
		wordFirst := int(word[0] - 'a')
		wordLast := int(word[len(word)-1] - 'a')
		length := len(word)
		ndp := make([][26]int, 26)
		for f := range ndp {
			for l := range ndp[f] {
				ndp[f][l] = inf
			}
		}
		for f := 0; f < 26; f++ {
			for l := 0; l < 26; l++ {
				current := dp[f][l]
				if current == inf {
					continue
				}
				// Append on the right: seam merges when our last char
				// equals the word's first char.
				appended := current + length
				if l == wordFirst {
					appended--
				}
				if appended < ndp[f][wordLast] {
					ndp[f][wordLast] = appended
				}
				// Prepend on the left: seam merges when the word's last
				// char equals our first char.
				prepended := current + length
				if wordLast == f {
					prepended--
				}
				if prepended < ndp[wordFirst][l] {
					ndp[wordFirst][l] = prepended
				}
			}
		}
		dp = ndp
	}
	best := inf
	for f := range dp {
		for l := range dp[f] {
			if dp[f][l] < best {
				best = dp[f][l]
			}
		}
	}
	return best
}
