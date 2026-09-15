// Two pointers with a dummy head: fast runs n nodes ahead, then both
// advance until fast falls off the end; slow stands on the predecessor.
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// A dummy node in front of the head makes removing the true head the
	// same unlink as any other node.
	dummy := &ListNode{Val: 0, Next: head}
	// fast runs n nodes ahead of slow; when fast falls off the end, slow
	// stands on the predecessor of the node being removed.
	fast := dummy
	slow := dummy
	for i := 0; i < n; i++ {
		fast = fast.Next
	}
	for fast.Next != nil {
		fast = fast.Next
		slow = slow.Next
	}
	slow.Next = slow.Next.Next
	return dummy.Next
}
