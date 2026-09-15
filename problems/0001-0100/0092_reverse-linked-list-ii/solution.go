func reverseBetween(head *ListNode, left, right int) *ListNode {
	// The dummy head anchors the node just before the segment, so a segment
	// that starts at the head is no special case.
	dummy := &ListNode{Val: 0}
	dummy.Next = head
	before := dummy
	for i := 1; i < left; i++ {
		before = before.Next
	}
	// Flip exactly right - left + 1 links; `prev` climbs onto each new
	// segment head while `curr` keeps the unconsumed remainder.
	prev, curr := before, before.Next
	for i := left; i <= right; i++ {
		curr.Next, prev, curr = prev, curr, curr.Next
	}
	// before.Next is still the segment's old first node, now its last: it
	// takes over the remainder, and the new head takes its place.
	before.Next.Next = curr
	before.Next = prev
	return dummy.Next
}
