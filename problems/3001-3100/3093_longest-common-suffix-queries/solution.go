func stringIndices(wordsContainer []string, wordsQuery []string) []int {
	m := len(wordsContainer)
	lens := make([]int, m)
	for i, w := range wordsContainer {
		lens[i] = len(w)
	}
	// Tie-break: shorter word wins, then the smaller index.
	better := func(a, b int) bool {
		if b == -1 {
			return true
		}
		if lens[a] != lens[b] {
			return lens[a] < lens[b]
		}
		return a < b
	}

	// Trie over reversed words; node 0 is the root (empty suffix).
	children := make([]map[byte]int, 1)
	children[0] = make(map[byte]int)
	best := make([]int, 1)
	best[0] = -1

	// Insert each word backwards, annotating every visited node, root included.
	for i, word := range wordsContainer {
		cur := 0
		if better(i, best[0]) {
			best[0] = i
		}
		for j := len(word) - 1; j >= 0; j-- {
			ch := word[j]
			nxt, ok := children[cur][ch]
			if !ok {
				nxt = len(children)
				children = append(children, make(map[byte]int))
				best = append(best, -1)
				children[cur][ch] = nxt
			}
			cur = nxt
			if better(i, best[cur]) {
				best[cur] = i
			}
		}
	}

	ans := make([]int, 0, len(wordsQuery))
	// Walk the reversed query as deep as the trie allows; deepest node's best wins.
	for _, word := range wordsQuery {
		cur := 0
		// Root's best answers the empty-suffix case (no child matched).
		res := best[0]
		for j := len(word) - 1; j >= 0; j-- {
			nxt, ok := children[cur][word[j]]
			if !ok {
				break
			}
			cur = nxt
			res = best[cur]
		}
		ans = append(ans, res)
	}
	return ans
}
