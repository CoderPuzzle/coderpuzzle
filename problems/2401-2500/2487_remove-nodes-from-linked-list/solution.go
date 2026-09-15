func removeNodes(head *ListNode) *ListNode {
	// Reverse the list, keep every node whose value is >= the max of the
	// remaining suffix (original order), rebuilding in original order.
	var prev *ListNode
	cur := head
	for cur != nil {
		nxt := cur.Next
		cur.Next = prev
		prev = cur
		cur = nxt
	}

	var newHead *ListNode
	maxSeen := -1 << 31
	cur = prev
	for cur != nil {
		nxt := cur.Next
		if cur.Val >= maxSeen {
			maxSeen = cur.Val
			cur.Next = newHead
			newHead = cur
		}
		cur = nxt
	}
	return newHead
}
