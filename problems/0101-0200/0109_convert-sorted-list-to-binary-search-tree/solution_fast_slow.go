func sortedListToBST(head *ListNode) *TreeNode {
	return buildList(head)
}

func buildList(node *ListNode) *TreeNode {
	if node == nil {
		return nil
	}
	// A one-node segment is a leaf. Doing this before the pointer walk
	// also keeps the cut below safe: with a single node prev would
	// still be nil when it happens.
	if node.Next == nil {
		return &TreeNode{Val: node.Val}
	}
	// Slow/fast midpoint: slow steps one node, fast two, so when fast
	// runs past the end slow has stopped on the midpoint. The guard
	// leaves slow on the SECOND of two middles for even lengths,
	// matching the required tie-break.
	var prev *ListNode
	slow, fast := node, node
	for fast != nil && fast.Next != nil {
		prev = slow
		slow = slow.Next
		fast = fast.Next.Next
	}
	// prev trails slow, so this cut splits the segment in two; the
	// recursion then treats node and slow.Next as independent heads.
	prev.Next = nil
	// The middle element is the only root making both sides BSTs of
	// near-equal size; nodes before it form the left subtree, after it
	// the right, so the result stays height-balanced.
	root := &TreeNode{Val: slow.Val}
	root.Left = buildList(node)
	root.Right = buildList(slow.Next)
	return root
}
