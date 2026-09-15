type trieNode struct {
	next map[byte]*trieNode
	cnt  int
}

func sumPrefixScores(words []string) []int {
	// one shared trie: node.cnt equals the score of the prefix it ends
	root := &trieNode{next: make(map[byte]*trieNode)}
	for _, word := range words {
		node := root
		for i := 0; i < len(word); i++ {
			ch := word[i]
			nxt := node.next[ch]
			if nxt == nil {
				nxt = &trieNode{next: make(map[byte]*trieNode)}
				node.next[ch] = nxt
			}
			node = nxt
			// count at every depth: the word itself scores its own prefixes
			node.cnt++
		}
	}
	// second pass: a word's answer is the sum of cnt along its trie path
	scores := make([]int, len(words))
	for w, word := range words {
		node := root
		total := 0
		for i := 0; i < len(word); i++ {
			node = node.next[word[i]]
			// cnt of the reached node is the score of the prefix so far
			total += node.cnt
		}
		scores[w] = total
	}
	return scores
}
