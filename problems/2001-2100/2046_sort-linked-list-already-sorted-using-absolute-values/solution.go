func sortLinkedList(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	current := head
	for current.Next != nil {
		node := current.Next
		if node.Val < 0 {
			current.Next = node.Next
			node.Next = head
			head = node
		} else {
			current = node
		}
	}
	return head
}
