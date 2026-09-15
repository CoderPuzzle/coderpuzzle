func rob(root *TreeNode) int {
	takeHere, skipHere := best(root)
	return max(takeHere, skipHere)
}

// best returns (best if the node is taken, best if it is skipped);
// pairing the two values means each subtree is evaluated once.
func best(node *TreeNode) (int, int) {
	if node == nil {
		return 0, 0
	}
	leftTake, leftSkip := best(node.Left)
	rightTake, rightSkip := best(node.Right)
	// Taking here forbids both children: use their skip values.
	takeHere := node.Val + leftSkip + rightSkip
	// Skipping leaves each child free to do its better option.
	skipHere := max(leftTake, leftSkip) + max(rightTake, rightSkip)
	return takeHere, skipHere
}
