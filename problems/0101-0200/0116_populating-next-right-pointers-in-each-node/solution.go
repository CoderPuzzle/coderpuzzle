func connect(root *NodeWithNext) *NodeWithNext {
	if root == nil {
		return nil
	}
	for level := root; level.Left != nil; level = level.Left {
		for head := level; head != nil; head = head.Next {
			head.Left.Next = head.Right
			if head.Next != nil {
				head.Right.Next = head.Next.Left
			}
		}
	}
	return root
}
