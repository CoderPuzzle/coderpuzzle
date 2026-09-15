type trieNode struct {
	children [26]*trieNode
	word     string
	top      []string
}

func suggestedProducts(products []string, searchWord string) [][]string {
	// spell every word down the tree; nodes appear only where needed
	root := &trieNode{}
	for _, word := range products {
		node := root
		for index := 0; index < len(word); index++ {
			slot := int(word[index]) - 97
			if node.children[slot] == nil {
				node.children[slot] = &trieNode{}
			}
			node = node.children[slot]
		}
		node.word = word
	}

	// merge phase, deepest nodes first: a node's best three are its own word
	// — a prefix of every other word through it, hence the smallest — then
	// the children's lists in letter order; every existing child already
	// holds a non-empty list, so gathering stops by the third child consulted
	order := []*trieNode{}
	pending := []*trieNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		order = append(order, node)
		for _, child := range node.children {
			if child != nil {
				pending = append(pending, child)
			}
		}
	}
	for index := len(order) - 1; index >= 0; index-- {
		node := order[index]
		top := []string{}
		if node.word != "" {
			top = append(top, node.word)
		}
		for _, child := range node.children {
			if len(top) >= 3 {
				break
			}
			if child != nil {
				top = append(top, child.top...)
			}
		}
		if len(top) > 3 {
			top = top[:3]
		}
		node.top = top
	}

	// a keystroke is one pointer move; once a slot is empty it stays empty,
	// because prefixes only ever grow
	result := [][]string{}
	node := root
	for _, ch := range searchWord {
		if node != nil {
			node = node.children[int(ch)-97]
		}
		if node == nil {
			result = append(result, []string{})
		} else {
			result = append(result, node.top)
		}
	}
	return result
}
