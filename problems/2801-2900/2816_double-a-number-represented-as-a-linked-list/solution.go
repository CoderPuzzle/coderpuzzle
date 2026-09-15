func doubleIt(head *ListNode) *ListNode {
	// A position carries into the one above it exactly when its original
	// digit is five or more: doubling produces that carry by itself, and an
	// incoming carry of one never flips the outcome (2 * 4 + 1 = 9 stays).
	// So one forward pass rewrites each node from its successor while the
	// successor still holds its original digit, and the original head digit,
	// remembered before any write, tells whether a new leading node must be
	// prepended.
	grows := head.Val >= 5
	cur := head
	for cur != nil {
		next := cur.Next
		inc := 0
		if next != nil && next.Val >= 5 {
			inc = 1
		}
		cur.Val = (cur.Val*2 + inc) % 10
		cur = next
	}
	if grows {
		return &ListNode{Val: 1, Next: head}
	}
	return head
}
