func deepestLeavesSum(root *TreeNode) int {
	// Level-order sweep: levelSum is overwritten at every level, so when the
	// queue finally empties it holds exactly the deepest leaves' sum.
	if root == nil {
		return 0
	}
	queue := []*TreeNode{root}
	levelSum := 0
	for len(queue) > 0 {
		levelSum = 0
		next := make([]*TreeNode, 0, len(queue)*2)
		for _, node := range queue {
			levelSum += node.Val
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		queue = next
	}
	return levelSum
}
