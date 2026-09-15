func getAllElements(root1 *TreeNode, root2 *TreeNode) []int {
	// Iterative in-order walks produce two sorted lists (no recursion, so a
	// 5000-node skewed tree cannot overflow the stack), then a linear merge.
	first := inorder(root1)
	second := inorder(root2)
	merged := make([]int, 0, len(first)+len(second))
	i, j := 0, 0
	for i < len(first) && j < len(second) {
		if first[i] <= second[j] {
			merged = append(merged, first[i])
			i++
		} else {
			merged = append(merged, second[j])
			j++
		}
	}
	merged = append(merged, first[i:]...)
	merged = append(merged, second[j:]...)
	return merged
}

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
