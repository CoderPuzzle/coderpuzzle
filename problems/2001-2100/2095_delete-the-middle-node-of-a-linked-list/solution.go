func deleteMiddle(head *ListNode) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	slow, fast := dummy, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	slow.Next = slow.Next.Next
	return dummy.Next
}
