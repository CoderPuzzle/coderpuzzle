func rob(root *TreeNode) int {
	robHere, skipHere := best(root)
	return max(robHere, skipHere)
}

// best returns (best if node is robbed, best if node is skipped);
// pairing the two values means each subtree is evaluated once.
func best(node *TreeNode) (int, int) {
	if node == nil {
		return 0, 0
	}
	leftRob, leftSkip := best(node.Left)
	rightRob, rightSkip := best(node.Right)
	// Robbing here forbids both children: take their skip values.
	robHere := node.Val + leftSkip + rightSkip
	// Skipping leaves each child free to do its better option.
	skipHere := max(leftRob, leftSkip) + max(rightRob, rightSkip)
	return robHere, skipHere
}
