// The root's value is the one every node must carry, so a single
// reference value is all the scan needs. It reads the tree level by
// level — a queue seeded with the root, drained front-first, children
// appended left before right — and answers false at the first node that
// disagrees; a queue that drains clean leaves every node vouched for,
// which is true. The queue, not the call stack, carries the walk — a
// hundred-node chain of one value is within the constraints, and no
// frame ever nests.
func isUnivalTree(root *TreeNode) bool {
	if root == nil {
		return true
	}
	pending := []*TreeNode{root}
	head := 0
	for head < len(pending) {
		node := pending[head]
		head++
		if node.Val != root.Val {
			return false
		}
		if node.Left != nil {
			pending = append(pending, node.Left)
		}
		if node.Right != nil {
			pending = append(pending, node.Right)
		}
	}
	return true
}
