func isSymmetric(root *TreeNode) bool {
	if root == nil {
		// The empty tree is trivially symmetric: nothing can disagree.
		return true
	}
	var mirror func(a, b *TreeNode) bool
	mirror = func(a, b *TreeNode) bool {
		// Two missing subtrees match; exactly one missing is a structural
		// mismatch — a == b only when both are nil.
		if a == nil || b == nil {
			return a == b
		}
		// Symmetry lives across the center: values agree here, and the
		// OUTER pair (a.Left, b.Right) and INNER pair (a.Right, b.Left)
		// must each be mirrors by these same rules.
		return a.Val == b.Val && mirror(a.Left, b.Right) && mirror(a.Right, b.Left)
	}
	return mirror(root.Left, root.Right)
}
