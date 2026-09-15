func swapPairs(head *ListNode) *ListNode {
	// Dummy head anchors the rewired list so the first pair is not a
	// special case; prev always points at the node before the next pair.
	dummy := &ListNode{Val: 0, Next: head}
	prev := dummy
	// A pair needs two nodes; a lone leftover tail stays where it is.
	for prev.Next != nil && prev.Next.Next != nil {
		first := prev.Next
		second := first.Next
		// Cross the two forward pointers: first adopts the rest of the
		// list, second turns back onto first, prev adopts second. The
		// nodes themselves move — no value is ever written.
		first.Next = second.Next
		second.Next = first
		prev.Next = second
		// first is now the tail of the swapped pair, so it is the
		// "node before the next pair".
		prev = first
	}
	return dummy.Next
}
