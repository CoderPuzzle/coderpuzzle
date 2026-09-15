func reverseList(head *ListNode) *ListNode {
	// A missing head or a last node is already reversed: it is its own new
	// head and terminates the recursion.
	if head == nil || head.Next == nil {
		return head
	}
	// Reverse the tail first: the recursion returns the head of the
	// already-reversed remainder.
	newHead := reverseList(head.Next)
	// head trails that reversed chain; point its own successor back at it,
	// then sever head's forward link so it becomes the tail.
	head.Next.Next = head
	head.Next = nil
	return newHead
}
