func deleteDuplicates(head *ListNode) *ListNode {
	// The list is sorted, so all copies of a value form one run; a kept
	// node only ever needs to look at its immediate successor.
	current := head
	for current != nil && current.Next != nil {
		if current.Next.Val == current.Val {
			// The successor is a copy of a node already kept — unlink it.
			// The cursor stays put in case the run continues behind it.
			current.Next = current.Next.Next
		} else {
			// A different value begins a new run; only now step forward.
			current = current.Next
		}
	}
	return head
}
