// An inorder walk of a BST visits the values in ascending order, so the
// closest pair in the whole tree appears as two consecutive visits — any
// two values with a third between them sit farther apart than that third
// sits from one of them. The walk keeps only the previously visited value
// and folds in the smallest difference to the current one.
func minDiffInBST(root *TreeNode) int {
	best := 1 << 30
	prev := -1
	// The stack, not the call stack, drives the descent to each leftmost
	// node and the step back up — the tree may legally be a single
	// 100-node chain.
	stack := []*TreeNode{}
	node := root
	for node != nil || len(stack) > 0 {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		// Values are never negative, so prev < 0 marks the very first
		// visit; at least two nodes exist, so best is always set.
		if prev >= 0 {
			best = min(best, node.Val-prev)
		}
		prev = node.Val
		node = node.Right
	}
	return best
}
