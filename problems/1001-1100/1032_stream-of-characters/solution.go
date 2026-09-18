package main

type suffixNode struct {
	children map[byte]*suffixNode
	word     bool
}

type StreamChecker struct {
	root  *suffixNode
	nodes []*suffixNode
}

func NewStreamCheckerTyped(words []string) *StreamChecker {
	watcher := &StreamChecker{root: &suffixNode{children: map[byte]*suffixNode{}}}
	for _, word := range words {
		node := watcher.root
		for index := 0; index < len(word); index++ {
			child, exists := node.children[word[index]]
			if !exists {
				child = &suffixNode{children: map[byte]*suffixNode{}}
				node.children[word[index]] = child
			}
			node = child
		}
		node.word = true
	}
	watcher.nodes = []*suffixNode{watcher.root}
	return watcher
}

func (design *StreamChecker) query(letter string) bool {
	advanced := make([]*suffixNode, 0, len(design.nodes))
	hit := false
	for _, node := range design.nodes { // index 0 is always the root
		if child, exists := node.children[letter[0]]; exists {
			advanced = append(advanced, child)
			hit = hit || child.word
		}
	}
	design.nodes = append(advanced, design.root) // a fresh suffix begins every feed
	return hit
}
