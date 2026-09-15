func reverseKGroup(head *ListNode, k int) *ListNode {
	// The dummy head anchors the node before the group being reversed, so
	// rewiring the first group is no special case.
	dummy := &ListNode{Val: 0}
	dummy.Next = head
	groupPrev := dummy
	for {
		// Probe k nodes ahead; a short group means the leftover tail stays
		// as it is and the list is finished.
		kth := groupPrev
		for i := 0; i < k; i++ {
			kth = kth.Next
			if kth == nil {
				return dummy.Next
			}
		}
		// Flip exactly k links; `prev` starts at the node after the group so
		// the group's new tail joins the rest of the list naturally.
		after := kth.Next
		prev, curr := after, groupPrev.Next
		for curr != after {
			curr.Next, prev, curr = prev, curr, curr.Next
		}
		// `prev` is the group's new head; the old first node is now its last
		// node and anchors the next group.
		tail := groupPrev.Next
		groupPrev.Next = prev
		groupPrev = tail
	}
}
