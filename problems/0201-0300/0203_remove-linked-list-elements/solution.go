// A dummy head stands in front of the real list, so deleting the original
// head is an ordinary unlink of somebody's successor; one walk skips every
// match and the survivor chain hangs off the dummy.
func removeElements(head *ListNode, val int) *ListNode {
	dummy := &ListNode{}
	dummy.Next = head
	current := dummy
	for current.Next != nil {
		if current.Next.Val == val {
			// Skip the matching node. The cursor stays put — the node behind
			// it may match too, and that node is now current.Next.
			current.Next = current.Next.Next
		} else {
			// A keeper: step onto it and look at what follows.
			current = current.Next
		}
	}
	return dummy.Next
}
