func reverseList(head *ListNode) *ListNode {
	// prev heads the already-reversed chain; current is the node being
	// processed. Invariant: behind prev everything is reversed, ahead of
	// current nothing has been touched.
	var prev *ListNode
	current := head
	for current != nil {
		// Save the forward link before the flip destroys it.
		next := current.Next
		current.Next = prev
		prev = current
		current = next
	}
	// current is exhausted: prev points at the original tail, the new head.
	return prev
}
