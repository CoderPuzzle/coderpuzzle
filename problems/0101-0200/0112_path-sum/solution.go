func hasPathSum(root *TreeNode, targetSum int) bool {
	// The empty tree has no root-to-leaf path at all, so no
	// targetSum — not even 0 — can be matched.
	if root == nil {
		return false
	}
	// A frame is a node plus the sum still owed along the path from the
	// root to it: targetSum minus every value strictly above the node.
	type frame struct {
		node      *TreeNode
		remaining int
	}
	stack := []frame{{root, targetSum}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, rest := top.node, top.remaining
		if node.Left == nil && node.Right == nil {
			// The path ends here, so it qualifies exactly when the
			// leaf itself covers what is still owed.
			if rest == node.Val {
				return true
			}
		} else {
			// An internal node never decides: only leaves can match,
			// even when the running sum already equals targetSum.
			if node.Left != nil {
				stack = append(stack, frame{node.Left, rest - node.Val})
			}
			if node.Right != nil {
				stack = append(stack, frame{node.Right, rest - node.Val})
			}
		}
	}
	return false
}
