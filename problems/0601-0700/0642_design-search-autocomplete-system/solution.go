package main

// suggestNode is one trie node: children keyed by UTF-8 byte (byte order
// equals character order for valid text, so lexicographic comparison of
// the assembled sentences matches character-wise ordering).
type suggestNode struct {
	children map[byte]*suggestNode
	hotness  int
}

// suggestion is a stored sentence reachable from the typed prefix with
// its accumulated hotness.
type suggestion struct {
	sentence string
	hotness  int
}

type AutocompleteSystem struct {
	root    *suggestNode
	current *suggestNode
	typed   []byte
}

func NewAutocompleteSystemTyped(sentences []string, times []int) *AutocompleteSystem {
	suggester := &AutocompleteSystem{root: &suggestNode{children: map[byte]*suggestNode{}}}
	suggester.current = suggester.root
	for index, sentence := range sentences {
		suggester.insert(sentence, times[index])
	}
	return suggester
}

func (design *AutocompleteSystem) insert(sentence string, extra int) *suggestNode {
	node := design.root
	for index := 0; index < len(sentence); index++ {
		child, exists := node.children[sentence[index]]
		if !exists {
			child = &suggestNode{children: map[byte]*suggestNode{}}
			node.children[sentence[index]] = child
		}
		node = child
	}
	node.hotness += extra
	return node
}

// ranks a above b: hotter first, then the lexicographically smaller
// sentence.
func better(a suggestion, b suggestion) bool {
	if a.hotness != b.hotness {
		return a.hotness > b.hotness
	}
	return a.sentence < b.sentence
}

func (design *AutocompleteSystem) input(c string) []string {
	if c == "#" {
		design.insert(string(design.typed), 1)
		design.current = design.root
		design.typed = design.typed[:0]
		return []string{}
	}
	design.typed = append(design.typed, c...)
	for index := 0; index < len(c) && design.current != nil; index++ {
		design.current = design.current.children[c[index]]
	}
	if design.current == nil {
		return []string{}
	}
	matches := []suggestion{}
	design.collect(design.current, string(design.typed), &matches)
	// Keep only the best three via bounded insertion: each candidate
	// shifts at most two kept entries, so no full sort is needed.
	top := make([]suggestion, 0, 3)
	for _, match := range matches {
		position := len(top)
		for position > 0 && better(match, top[position-1]) {
			position--
		}
		if position < 3 {
			top = append(top, suggestion{})
			copy(top[position+1:], top[position:])
			top[position] = match
			if len(top) > 3 {
				top = top[:3]
			}
		}
	}
	ranked := make([]string, len(top))
	for index, match := range top {
		ranked[index] = match.sentence
	}
	return ranked
}

func (design *AutocompleteSystem) collect(node *suggestNode, prefix string, matches *[]suggestion) {
	if node.hotness > 0 {
		*matches = append(*matches, suggestion{sentence: prefix, hotness: node.hotness})
	}
	for character := range node.children {
		design.collect(node.children[character], prefix+string(character), matches)
	}
}
