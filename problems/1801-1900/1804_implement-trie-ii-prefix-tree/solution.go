package main

// A trie whose nodes each count the inserted instances ending at the
// node (wordCount) and passing through it (prefixCount). insert walks
// the word creating children on demand, bumping prefixCount along the
// path and wordCount at the terminal; the two count queries walk their
// string as far as nodes exist and read the matching counter, answering
// 0 when the walk falls off the trie. erase — guaranteed by the
// constraints to name a present word — confirms a live instance with a
// first walk, then decrements the same counters on a second; nodes left
// at zero stay in place, since no live instance crosses them anymore.
type trieNode struct {
	children    map[byte]*trieNode
	wordCount   int
	prefixCount int
}

type Trie struct {
	root *trieNode
}

func NewTrieTyped() *Trie {
	return &Trie{root: newTrieNode()}
}

func newTrieNode() *trieNode {
	return &trieNode{children: make(map[byte]*trieNode)}
}

func (design *Trie) insert(word string) {
	node := design.root
	for index := 0; index < len(word); index++ {
		child := node.children[word[index]]
		if child == nil {
			child = newTrieNode()
			node.children[word[index]] = child
		}
		node = child
		node.prefixCount++
	}
	node.wordCount++
}

func (design *Trie) countWordsEqualTo(word string) int {
	node := design.root
	for index := 0; index < len(word); index++ {
		node = node.children[word[index]]
		if node == nil {
			return 0
		}
	}
	return node.wordCount
}

func (design *Trie) countWordsStartingWith(prefix string) int {
	node := design.root
	for index := 0; index < len(prefix); index++ {
		node = node.children[prefix[index]]
		if node == nil {
			return 0
		}
	}
	return node.prefixCount
}

func (design *Trie) erase(word string) {
	node := design.root
	for index := 0; index < len(word); index++ {
		node = node.children[word[index]]
		if node == nil {
			return
		}
	}
	if node.wordCount == 0 {
		return
	}
	node = design.root
	for index := 0; index < len(word); index++ {
		node = node.children[word[index]]
		node.prefixCount--
	}
	node.wordCount--
}
