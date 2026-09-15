package main

// Two tries, one word list per node: a prefix trie spelling every word
// forward and a suffix trie spelling every word reversed, so a suffix
// reads down it front to back. Words are inserted in index order, so
// every node's list ascends, and f walks pref down the first
// trie and suff reversed down the second, then merges the two hit nodes'
// lists from their tails -- the first equal pair is the largest shared
// index, and a walk that falls off its trie means no word matches that
// half, answering -1.
type trieNode struct {
	children [26]*trieNode
	indices  []int
}

type WordFilter struct {
	prefixes *trieNode
	suffixes *trieNode
}

func NewWordFilterTyped(words []string) *WordFilter {
	design := &WordFilter{prefixes: newTrieNode(), suffixes: newTrieNode()}
	for index, word := range words {
		node := design.prefixes
		for position := 0; position < len(word); position++ {
			node = node.child(word[position])
			node.indices = append(node.indices, index)
		}
		node = design.suffixes
		for position := len(word) - 1; position >= 0; position-- {
			node = node.child(word[position])
			node.indices = append(node.indices, index)
		}
	}
	return design
}

func newTrieNode() *trieNode {
	return &trieNode{}
}

// child returns the slot for character, creating the node on first use.
func (node *trieNode) child(character byte) *trieNode {
	slot := int(character) - 97
	if node.children[slot] == nil {
		node.children[slot] = &trieNode{}
	}
	return node.children[slot]
}

func (design *WordFilter) f(pref string, suff string) int {
	forward := design.walkForward(pref)
	if forward == nil {
		return -1
	}
	backward := design.walkBackward(suff)
	if backward == nil {
		return -1
	}
	front := forward.indices
	back := backward.indices
	for i, j := len(front)-1, len(back)-1; i >= 0 && j >= 0; {
		if front[i] == back[j] {
			return front[i]
		}
		if front[i] > back[j] {
			i--
		} else {
			j--
		}
	}
	return -1
}

// walkForward descends the prefix trie one node per character of pref;
// nil as soon as a slot is empty.
func (design *WordFilter) walkForward(pref string) *trieNode {
	node := design.prefixes
	for index := 0; index < len(pref); index++ {
		node = node.children[int(pref[index])-97]
		if node == nil {
			return nil
		}
	}
	return node
}

// walkBackward descends the suffix trie, whose edges spell the reversed
// words, so suff is consumed from its end; nil as soon as a slot is empty.
func (design *WordFilter) walkBackward(suff string) *trieNode {
	node := design.suffixes
	for index := len(suff) - 1; index >= 0; index-- {
		node = node.children[int(suff[index])-97]
		if node == nil {
			return nil
		}
	}
	return node
}
