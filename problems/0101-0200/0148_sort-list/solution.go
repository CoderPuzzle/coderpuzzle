func sortList(head *ListNode) *ListNode {
	var merge func(a, b *ListNode) *ListNode
	merge = func(a, b *ListNode) *ListNode {
		// Merge by pure relinking through a dummy head.
		dummy := &ListNode{}
		tail := dummy
		for a != nil && b != nil {
			// <= takes from the first half on ties, keeping the sort stable.
			if a.Val <= b.Val {
				tail.Next = a
				a = a.Next
			} else {
				tail.Next = b
				b = b.Next
			}
			tail = tail.Next
		}
		// Splice on whichever half still has nodes.
		if a != nil {
			tail.Next = a
		} else {
			tail.Next = b
		}
		return dummy.Next
	}

	// Base case: an empty or single-node list is already sorted.
	if head == nil || head.Next == nil {
		return head
	}
	// Halve with slow/fast pointers; fast starts one node ahead so slow
	// finishes on the last node of the left half — both halves are then
	// strictly shorter, which makes the recursion terminate.
	slow := head
	fast := head.Next
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	mid := slow.Next
	slow.Next = nil
	left := sortList(head)
	right := sortList(mid)
	return merge(left, right)
}
