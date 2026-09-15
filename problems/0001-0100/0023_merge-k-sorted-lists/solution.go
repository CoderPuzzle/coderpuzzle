func mergeKLists(lists []*ListNode) *ListNode {
	cur := make([]*ListNode, len(lists))
	copy(cur, lists)
	if len(cur) == 0 {
		return nil
	}
	// Tournament rounds: merge adjacent pairs, halving the field each round.
	// Every surviving node is walked once per round across ceil(log2 k)
	// rounds, unlike sequential folding which can re-walk one long list k
	// times.
	for len(cur) > 1 {
		var next []*ListNode
		for i := 0; i < len(cur); i += 2 {
			if i+1 < len(cur) {
				next = append(next, merge2(cur[i], cur[i+1]))
			} else {
				// Odd count: the last list gets a bye, passing to the next
				// round untouched.
				next = append(next, cur[i])
			}
		}
		cur = next
	}
	return cur[0]
}

func merge2(a, b *ListNode) *ListNode {
	// Dummy head: every attachment happens the same way and the real head
	// falls out as dummy.Next.
	dummy := &ListNode{Val: 0}
	tail := dummy
	// Both lists sorted, so the merged list's next node is always the smaller
	// of the two current heads.
	for a != nil && b != nil {
		if a.Val <= b.Val {
			tail.Next = a
			a = a.Next
		} else {
			tail.Next = b
			b = b.Next
		}
		tail = tail.Next
	}
	// Splice whichever list still has nodes -- it is already the sorted
	// continuation.
	if a != nil {
		tail.Next = a
	} else {
		tail.Next = b
	}
	return dummy.Next
}
