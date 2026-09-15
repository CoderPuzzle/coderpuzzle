func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
	// Dummy head: every attachment happens the same way, with no special
	// case for the first node; the real head is simply dummy.Next.
	dummy := &ListNode{Val: 0}
	tail := dummy
	// Both lists sorted, so the merged list's next node is always the
	// smaller of the two current heads. Each iteration consumes one node for
	// good, bounding the walk by the combined length.
	for list1 != nil && list2 != nil {
		// <= takes list1 on ties, keeping the merge stable with respect to
		// the first list.
		if list1.Val <= list2.Val {
			tail.Next = list1
			list1 = list1.Next
		} else {
			tail.Next = list2
			list2 = list2.Next
		}
		tail = tail.Next
	}
	// Whatever survives is already the sorted continuation -- splice it on
	// in one assignment instead of walking it node by node.
	if list1 != nil {
		tail.Next = list1
	} else {
		tail.Next = list2
	}
	return dummy.Next
}
