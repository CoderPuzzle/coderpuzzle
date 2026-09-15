// Two dummy chains: one collects the nodes below x, the other everything
// else; a single walk appends each node to its chain, and one splice joins
// the finished chains with both partitions' orders untouched.
func partition(head *ListNode, x int) *ListNode {
	// The dummy heads anchor their chains; each tail remembers where that
	// chain's next node will attach.
	beforeHead := &ListNode{}
	beforeTail := beforeHead
	afterHead := &ListNode{}
	afterTail := afterHead
	// Append to whichever chain claims the value: the walk order is
	// the append order, so each partition keeps its original order.
	for node := head; node != nil; node = node.Next {
		if node.Val < x {
			beforeTail.Next = node
			beforeTail = node
		} else {
			afterTail.Next = node
			afterTail = node
		}
	}
	// Splice the high chain onto the low one. The high tail's old link
	// still points into the low chain, so cutting it to nil is what
	// keeps the spliced list from looping back on itself.
	beforeTail.Next = afterHead.Next
	afterTail.Next = nil
	return beforeHead.Next
}
