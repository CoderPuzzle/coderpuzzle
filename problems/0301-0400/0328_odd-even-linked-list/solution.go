// Grouping by index parity without copying anything: two tail pointers step
// a pair at a time onto two chains that grow inside the original nodes, the
// even chain's head is remembered before the walk overwrites the one link
// that reaches it, and a final splice hangs it after the odd tail.
func oddEvenList(head *ListNode) *ListNode {
	if head == nil {
		return head
	}
	odd := head
	evenHead := head.Next
	even := evenHead
	for even != nil && even.Next != nil {
		odd.Next = even.Next
		odd = odd.Next
		even.Next = odd.Next
		even = even.Next
	}
	odd.Next = evenHead
	return head
}
