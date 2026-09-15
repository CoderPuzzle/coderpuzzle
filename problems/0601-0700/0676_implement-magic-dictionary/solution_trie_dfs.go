package main

// The dictionary spelled down a trie; each buildDict REPLACES the previous
// tree, so search only ever sees the latest call's words. The child
// holding the query's own letter continues for free, any other child spends
// the single change, and success means a flagged node at the query's end
// with the change spent.

type trieNode struct {
	children [26]*trieNode
	end      bool
}

type MagicDictionary struct {
	root *trieNode
}

func NewMagicDictionaryTyped() *MagicDictionary {
	return &MagicDictionary{root: &trieNode{}}
}

func (design *MagicDictionary) buildDict(dictionary []string) {
	root := &trieNode{}
	for _, word := range dictionary {
		node := root
		for index := 0; index < len(word); index++ {
			slot := int(word[index]) - 97
			if node.children[slot] == nil {
				node.children[slot] = &trieNode{}
			}
			node = node.children[slot]
		}
		node.end = true
	}
	design.root = root
}

func (design *MagicDictionary) search(searchWord string) bool {
	return design.descend(design.root, searchWord, 0, 1)
}

func (design *MagicDictionary) descend(node *trieNode, word string, index int, editsLeft int) bool {
	if index == len(word) {
		return node.end && editsLeft == 0
	}
	wanted := int(word[index]) - 97
	for slot := 0; slot < 26; slot++ {
		child := node.children[slot]
		if child == nil {
			continue
		}
		remaining := editsLeft
		if slot != wanted {
			remaining--
		}
		if remaining >= 0 && design.descend(child, word, index+1, remaining) {
			return true
		}
	}
	return false
}
