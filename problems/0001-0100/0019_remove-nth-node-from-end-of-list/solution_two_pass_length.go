// Count length, then cut, instead of a single-sweep gap walk: measure the
// list first, then walk to the predecessor and relink around it.
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// First pass: count the nodes, so the target's position from the head
	// is known before anything is unlinked.
	sz := 0
	for node := head; node != nil; node = node.Next {
		sz++
	}
	// The target is the (sz - n + 1)-th node from the head, so its
	// predecessor sits sz - n steps past the dummy; walking that far and
	// relinking drops the target without a special head case.
	dummy := &ListNode{Val: 0, Next: head}
	pred := dummy
	for i := 0; i < sz-n; i++ {
		pred = pred.Next
	}
	pred.Next = pred.Next.Next
	return dummy.Next
}
