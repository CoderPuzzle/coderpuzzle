func isValidSequence(root *TreeNode, arr []int) bool {
	if root == nil {
		return false
	}
	n := len(arr)
	// Explicit stack of (node, index): a chain thousands deep must not
	// recurse, so the walk keeps its own frame list.
	type frame struct {
		node  *TreeNode
		index int
	}
	stack := []frame{{root, 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, i := top.node, top.index
		if node.Val != arr[i] {
			continue
		}
		if i == n-1 {
			// The array is consumed: valid only at a leaf.
			if node.Left == nil && node.Right == nil {
				return true
			}
			continue
		}
		if node.Left != nil {
			stack = append(stack, frame{node.Left, i + 1})
		}
		if node.Right != nil {
			stack = append(stack, frame{node.Right, i + 1})
		}
	}
	return false
}
