func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
	a := inorder(root1)
	b := inorder(root2)
	i, j := 0, len(b)-1
	for i < len(a) && j >= 0 {
		total := a[i] + b[j]
		if total == target {
			return true
		}
		if total < target {
			i++
		} else {
			j--
		}
	}
	return false
}

// inorder lists a BST's values ascending; it is iterative because a
// degenerate 5000-node tree would recurse past the smallest judged stacks.
func inorder(root *TreeNode) []int {
	values := []int{}
	stack := []*TreeNode{}
	node := root
	for len(stack) > 0 || node != nil {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		values = append(values, node.Val)
		node = node.Right
	}
	return values
}
