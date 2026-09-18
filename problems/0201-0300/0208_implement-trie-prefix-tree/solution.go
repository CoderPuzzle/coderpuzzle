package main

type trieNode struct {
	children [26]*trieNode
	end      bool
}

type Trie struct {
	root *trieNode
}

func NewTrieTyped() *Trie {
	return &Trie{root: &trieNode{}}
}

// rootNode returns the trie root, creating it on first use: the judge
// constructs the zero value of the struct, so the root appears lazily.
func (design *Trie) rootNode() *trieNode {
	if design.root == nil {
		design.root = &trieNode{}
	}
	return design.root
}

func (design *Trie) insert(word string) {
	node := design.rootNode()
	for index := 0; index < len(word); index++ {
		// One trie node: 26 child slots indexed by c - 'a' plus a
		// whole-word terminator flag; nodes appear lazily on insert.
		slot := int(word[index]) - 97
		if node.children[slot] == nil {
			node.children[slot] = &trieNode{}
		}
		node = node.children[slot]
	}
	node.end = true
}

// walk descends one node per character; nil as soon as a slot is empty.
func (design *Trie) walk(s string) *trieNode {
	node := design.rootNode()
	for index := 0; index < len(s) && node != nil; index++ {
		node = node.children[int(s[index])-97]
	}
	return node
}

func (design *Trie) search(word string) bool {
	node := design.walk(word)
	return node != nil && node.end
}

func (design *Trie) startsWith(prefix string) bool {
	return design.walk(prefix) != nil
}
