func replaceValueInTree(root *TreeNode) *TreeNode {
	// A node's new value is (sum of its level) - (its own original value
	// plus its sibling's). Two-phase breadth-first passes read a whole level
	// of children with their original values first — recording where each
	// parent's sibling group ends — then write the cousin sums back group by
	// group. Iterative on purpose: chains can run 10^5 nodes deep, far past
	// comfortable recursion. Level sums stay below 10^5 * 10^4, but int64
	// keeps the additions worry-free.
	row := []*TreeNode{root}
	root.Val = 0
	for len(row) > 0 {
		var children []*TreeNode
		var ends []int
		childSum := int64(0)
		for _, node := range row {
			if node.Left != nil {
				children = append(children, node.Left)
				childSum += int64(node.Left.Val)
			}
			if node.Right != nil {
				children = append(children, node.Right)
				childSum += int64(node.Right.Val)
			}
			ends = append(ends, len(children))
		}
		index := 0
		for _, end := range ends {
			if end > index {
				pairSum := int64(0)
				for k := index; k < end; k++ {
					pairSum += int64(children[k].Val)
				}
				newValue := childSum - pairSum
				for k := index; k < end; k++ {
					children[k].Val = int(newValue)
				}
			}
			index = end
		}
		row = children
	}
	return root
}
