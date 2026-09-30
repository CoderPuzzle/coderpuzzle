func wordBreak(s string, wordDict []string) bool {
	// Trie over the wordDict: nodes own a child map keyed by letter plus
	// the flag marking a node where a word ends. From every reachable
	// position a walk follows s's own characters, so a branch dies at the
	// first character no remaining word shares, and each terminal crossed
	// marks the prefix after it reachable.
	type trieNode struct {
		children map[byte]*trieNode
		end      bool
	}
	root := &trieNode{children: map[byte]*trieNode{}}
	for _, word := range wordDict {
		node := root
		for i := 0; i < len(word); i++ {
			child, ok := node.children[word[i]]
			if !ok {
				child = &trieNode{children: map[byte]*trieNode{}}
				node.children[word[i]] = child
			}
			node = child
		}
		node.end = true
	}
	n := len(s)
	reachable := make([]bool, n+1)
	reachable[0] = true
	for i := 0; i < n; i++ {
		if !reachable[i] {
			continue
		}
		node := root
		for j := i; j < n; j++ {
			child, ok := node.children[s[j]]
			if !ok {
				break
			}
			node = child
			// Every terminal on the path ends a word at this depth.
			if node.end {
				reachable[j+1] = true
			}
		}
	}
	return reachable[n]
}
