func btreeGameWinningMove(root *TreeNode, n int, x int) bool {
	var find func(*TreeNode) *TreeNode
	find = func(node *TreeNode) *TreeNode {
		if node == nil || node.Val == x {
			return node
		}
		if hit := find(node.Left); hit != nil {
			return hit
		}
		return find(node.Right)
	}
	var count func(*TreeNode) int
	count = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		return 1 + count(node.Left) + count(node.Right)
	}
	target := find(root)
	left := count(target.Left)
	right := count(target.Right)
	above := n - left - right - 1
	// Grabbing the largest of the three regions wins iff it alone holds the
	// majority of all nodes.
	best := left
	if right > best {
		best = right
	}
	if above > best {
		best = above
	}
	return best*2 > n
}
