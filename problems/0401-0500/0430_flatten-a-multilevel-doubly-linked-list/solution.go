func flatten(head *MultiListNode) *MultiListNode {
	for node := head; node != nil; node = node.Next {
		if node.Child == nil {
			continue
		}
		child := node.Child
		node.Child = nil
		tail := child
		for tail.Next != nil {
			tail = tail.Next
		}
		tail.Next = node.Next
		if node.Next != nil {
			node.Next.Prev = tail
		}
		node.Next = child
		child.Prev = node
	}
	return head
}
