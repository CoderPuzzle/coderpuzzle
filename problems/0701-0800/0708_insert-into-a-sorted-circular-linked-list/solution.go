func insert(head *ListNode, insertValue int) *ListNode {
	node := &ListNode{Val: insertValue}
	if head == nil {
		node.Next = node
		return node
	}
	previous, current := head, head.Next
	for current != head {
		fits := previous.Val <= insertValue && insertValue <= current.Val
		wraps := previous.Val > current.Val && (insertValue >= previous.Val || insertValue <= current.Val)
		if fits || wraps {
			break
		}
		previous, current = current, current.Next
	}
	previous.Next = node
	node.Next = current
	return head
}
