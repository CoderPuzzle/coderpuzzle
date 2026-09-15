func diameterOfBinaryTree(root *TreeNode) int {
	diameter := 0

	var height func(node *TreeNode) int
	height = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left := height(node.Left)
		right := height(node.Right)
		// The longest path anchored at this node joins its two subtree
		// heights (in edges); the best anchor may bypass the root, so
		// every node contributes a candidate.
		if left+right > diameter {
			diameter = left + right
		}
		// Return the one-sided height — what the parent's candidate
		// needs, deliberately distinct from the two-sided diameter.
		if left > right {
			return 1 + left
		}
		return 1 + right
	}

	height(root)
	return diameter
}
