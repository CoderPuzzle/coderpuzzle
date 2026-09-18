package main

type matcherNode struct {
	children [26]*matcherNode
	end      bool
}

type WordDictionary struct {
	root *matcherNode
}

func NewWordDictionaryTyped() *WordDictionary {
	return &WordDictionary{root: &matcherNode{}}
}

// rootNode returns the trie root, creating it on first use: the judge
// constructs the zero value of the struct, so the root appears lazily.
func (design *WordDictionary) rootNode() *matcherNode {
	if design.root == nil {
		design.root = &matcherNode{}
	}
	return design.root
}

func (design *WordDictionary) addWord(word string) {
	node := design.rootNode()
	for index := 0; index < len(word); index++ {
		slot := int(word[index]) - 97
		if node.children[slot] == nil {
			node.children[slot] = &matcherNode{}
		}
		node = node.children[slot]
	}
	node.end = true
}

func (design *WordDictionary) search(word string) bool {
	return design.match(design.rootNode(), word, 0)
}

// A letter descends its single slot; a dot tries every non-empty slot.
func (design *WordDictionary) match(node *matcherNode, word string, index int) bool {
	if node == nil {
		return false
	}
	if index == len(word) {
		return node.end
	}
	letter := word[index]
	if letter == '.' {
		for slot := 0; slot < 26; slot++ {
			if design.match(node.children[slot], word, index+1) {
				return true
			}
		}
		return false
	}
	return design.match(node.children[int(letter)-97], word, index+1)
}
