func maxLevelSum(root *TreeNode) int {
	frontier := []*TreeNode{root}
	bestLevel := 1
	bestSum := root.Val
	level := 1
	for len(frontier) > 0 {
		total := 0
		for _, node := range frontier {
			total += node.Val
		}
		// Strict > keeps the SMALLEST level on ties.
		if total > bestSum {
			bestSum = total
			bestLevel = level
		}
		next := []*TreeNode{}
		for _, node := range frontier {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		frontier = next
		level++
	}
	return bestLevel
}
