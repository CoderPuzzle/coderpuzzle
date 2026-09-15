func splitBST(root *TreeNode, target int) []*TreeNode {
	// The split boundary is one root-to-null path: step right whenever a
	// node's value is at most target, left whenever it is greater. Only
	// the nodes on that path ever change children — every subtree hanging
	// off it keeps its parent, which is exactly the structure preservation
	// the statement demands.
	small := &TreeNode{}
	large := &TreeNode{}
	// Two dangling tails mark where the next path node on each side must
	// attach. A node <= target joins the first tree, and the next
	// small-side node on the path is always its right descendant, so the
	// tail advances to its freshly emptied right child; a node > target
	// mirrors this on the left. One walk, no recursion, two sentinel
	// nodes — the whole working set.
	smallTail, largeTail := small, large
	node := root
	for node != nil {
		if node.Val <= target {
			following := node.Right
			node.Right = nil
			smallTail.Right = node
			smallTail = node
			node = following
		} else {
			following := node.Left
			node.Left = nil
			largeTail.Left = node
			largeTail = node
			node = following
		}
	}
	return []*TreeNode{small.Right, large.Left}
}
