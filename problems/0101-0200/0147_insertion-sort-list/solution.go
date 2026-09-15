// Insertion sort per the statement: a dummy head anchors a growing sorted
// prefix, and each node that breaks the order is unlinked from the input and
// re-spliced at its place within the prefix — only next pointers move.
func insertionSortList(head *ListNode) *ListNode {
	// Dummy node: every insertion, even the one before the first node, links
	// into a predecessor that already exists; the sorted list hangs off it
	// and dummy.Next is returned at the end.
	dummy := &ListNode{Next: head}
	// sortedTail closes the already-sorted prefix; whatever follows it is
	// untouched input. An empty list or a lone node is sorted already.
	sortedTail := head
	for sortedTail != nil && sortedTail.Next != nil {
		node := sortedTail.Next
		// In order against the prefix's end: the node stays put and the
		// prefix just grows — the near-linear path sorted input takes.
		if node.Val >= sortedTail.Val {
			sortedTail = sortedTail.Next
			continue
		}
		// Unlink the node, then walk the prefix for the first value greater
		// than it; prev stops on that value's predecessor.
		sortedTail.Next = node.Next
		prev := dummy
		for prev.Next.Val <= node.Val {
			prev = prev.Next
		}
		node.Next = prev.Next
		prev.Next = node
	}
	return dummy.Next
}
