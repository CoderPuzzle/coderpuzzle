package main

// A prefix trie whose every node on a key's path carries the sum of the
// current values of all live keys passing through it: insert() adds the
// key's CHANGE in value along its path -- a side map remembers the previous
// value, so overwriting a key corrects the running totals instead of
// double-counting -- and sum() walks the prefix and returns the node's
// total, or 0 when the walk falls off the trie.
type trieNode struct {
	children map[byte]*trieNode
	score    int64
}

func newTrieNode() *trieNode {
	return &trieNode{children: map[byte]*trieNode{}}
}

type MapSum struct {
	root   *trieNode
	values map[string]int
}

func NewMapSumTyped() *MapSum {
	return &MapSum{root: newTrieNode(), values: map[string]int{}}
}

func (design *MapSum) insert(key string, val int) {
	delta := int64(val) - int64(design.values[key])
	design.values[key] = val
	node := design.root
	for index := 0; index < len(key); index++ {
		letter := key[index]
		child := node.children[letter]
		if child == nil {
			child = newTrieNode()
			node.children[letter] = child
		}
		node = child
		node.score += delta
	}
}

func (design *MapSum) sum(prefix string) int {
	node := design.root
	for index := 0; index < len(prefix); index++ {
		node = node.children[prefix[index]]
		if node == nil {
			return 0
		}
	}
	return int(node.score)
}
