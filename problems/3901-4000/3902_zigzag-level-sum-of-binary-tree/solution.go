func zigzagLevelSum(root *TreeNode) []int64 {
	frontier := []*TreeNode{root}
	answer := []int64{}
	odd := true
	for len(frontier) > 0 {
		var total int64
		for step := 0; step < len(frontier); step++ {
			index := step
			if !odd {
				index = len(frontier) - 1 - step
			}
			node := frontier[index]
			required := node.Left
			if !odd {
				required = node.Right
			}
			if required == nil {
				break
			}
			total += int64(node.Val)
		}
		answer = append(answer, total)
		next := make([]*TreeNode, 0, 2*len(frontier))
		for _, node := range frontier {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		frontier = next
		odd = !odd
	}
	return answer
}
