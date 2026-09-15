// A dummy node in front of the head makes deleting the original head the
// same unlink as deleting any other node; runs of equal values are skipped
// whole, so only distinct numbers survive.
func deleteDuplicates(head *ListNode) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	// tail marks the end of the kept prefix; the node after it is the next
	// one whose fate is still undecided.
	tail := dummy
	for tail.Next != nil {
		if tail.Next.Next != nil && tail.Next.Next.Val == tail.Next.Val {
			// A run of equals starts at tail.Next: advance the link past
			// every copy of the value while tail itself stays put, so each
			// hop drops one more duplicate from the answer.
			value := tail.Next.Val
			for tail.Next != nil && tail.Next.Val == value {
				tail.Next = tail.Next.Next
			}
		} else {
			// Distinct from its successor (or last of the list): the node
			// survives and joins the kept prefix.
			tail = tail.Next
		}
	}
	return dummy.Next
}
