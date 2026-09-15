type trieNode struct {
	children [26]*trieNode
	end      bool
}

func longestWord(words []string) string {
	// The trie stores every word once; a node's `end` marks where a word
	// stops. Walking only through `end` nodes keeps every spelled prefix
	// a word, so each path the walk takes is a buildable word.
	root := &trieNode{}
	for _, word := range words {
		node := root
		for i := 0; i < len(word); i++ {
			index := word[i] - 'a'
			if node.children[index] == nil {
				node.children[index] = &trieNode{}
			}
			node = node.children[index]
		}
		node.end = true
	}
	best := ""
	var walk func(node *trieNode, path string)
	walk = func(node *trieNode, path string) {
		// Strictly longer wins; among equal lengths the smaller word
		// wins — compared explicitly, never via child order.
		if len(path) > len(best) || (len(path) == len(best) && path < best) {
			best = path
		}
		for index, child := range node.children {
			if child != nil && child.end {
				walk(child, path+string(rune('a'+index)))
			}
		}
	}
	walk(root, "")
	// Nothing buildable at all: the statement's empty-string answer.
	return best
}
