// The only operator is '+', commutative and associative, so two
// expression trees agree on every variable assignment exactly when they
// carry the same multiset of leaf variables, whatever their shape. -1
// marks an operator node (always 2 children); 0-25 marks a leaf's
// encoded letter (always 0 children).
func checkEquivalence(root1 *TreeNode, root2 *TreeNode) bool {
	return leafCounts(root1) == leafCounts(root2)
}

func leafCounts(root *TreeNode) [26]int {
	var counts [26]int
	stack := []*TreeNode{}
	if root != nil {
		stack = append(stack, root)
	}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node.Left == nil && node.Right == nil {
			counts[node.Val]++
		} else {
			stack = append(stack, node.Left, node.Right)
		}
	}
	return counts
}
