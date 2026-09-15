func connect(root *NodeWithNext) *NodeWithNext {
	for level := root; level != nil; {
		var head, tail *NodeWithNext
		for node := level; node != nil; node = node.Next {
			for _, child := range []*NodeWithNext{node.Left, node.Right} {
				if child == nil {
					continue
				}
				if head == nil {
					head = child
				} else {
					tail.Next = child
				}
				tail = child
			}
		}
		level = head
	}
	return root
}
