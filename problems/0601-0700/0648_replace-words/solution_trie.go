import (
	"strings"
)

type trieNode struct {
	children [26]*trieNode
	end      bool
}

func replaceWords(dictionary []string, sentence string) string {
	// The trie stores every root once; a node's `end` marks that a root
	// stops exactly there. Walking a word's own letters visits its
	// prefixes shortest first, so the first `end` on the path is the
	// shortest matching root — no per-length retries, and no length cap:
	// the tree has no branches deeper than the longest root anyway.
	trie := &trieNode{}
	for _, root := range dictionary {
		node := trie
		for index := 0; index < len(root); index++ {
			slot := root[index] - 'a'
			if node.children[slot] == nil {
				node.children[slot] = &trieNode{}
			}
			node = node.children[slot]
		}
		node.end = true
	}
	// A walk that falls off the tree, or finishes without ever reaching
	// an `end`, found no root prefix — the word stands for itself.
	replaced := make([]string, 0)
	for _, word := range strings.Split(sentence, " ") {
		replacement := word
		node := trie
		for index := 0; index < len(word); index++ {
			node = node.children[word[index]-'a']
			if node == nil {
				break
			}
			if node.end {
				replacement = word[:index+1]
				break
			}
		}
		replaced = append(replaced, replacement)
	}
	return strings.Join(replaced, " ")
}
