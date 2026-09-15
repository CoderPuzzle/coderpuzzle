func ladderLength(beginWord string, endWord string, wordList []string) int {
	words := make(map[string]bool, len(wordList))
	for _, word := range wordList {
		words[word] = true
	}
	// No sequence can end outside the dictionary.
	if !words[endWord] {
		return 0
	}
	length := len(beginWord)
	patternOf := func(word string, i int) string {
		return word[:i] + "*" + word[i+1:]
	}

	// Bucket every word under each wildcard pattern ("hot" -> "*ot", "h*t",
	// "ho*"): all one-letter neighbors share one of its patterns.
	buckets := make(map[string][]string)
	for _, word := range wordList {
		for i := 0; i < length; i++ {
			key := patternOf(word, i)
			buckets[key] = append(buckets[key], word)
		}
	}

	// Level-order BFS; steps starts at 1 because beginWord itself counts.
	visited := map[string]bool{beginWord: true}
	queue := []string{beginWord}
	steps := 1
	for len(queue) > 0 {
		next := []string{}
		for _, word := range queue {
			if word == endWord {
				return steps
			}
			for i := 0; i < length; i++ {
				key := patternOf(word, i)
				// Each word is enqueued at most once.
				for _, neighbor := range buckets[key] {
					if !visited[neighbor] {
						visited[neighbor] = true
						next = append(next, neighbor)
					}
				}
				// Delete the bucket so it is read once overall and never
				// re-read via a same-level word sharing the pattern.
				delete(buckets, key)
			}
		}
		queue = next
		steps++
	}
	return 0
}
