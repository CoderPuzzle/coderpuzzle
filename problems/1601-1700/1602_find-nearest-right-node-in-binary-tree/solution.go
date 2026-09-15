func findNearestRightNode(root *TreeNode, u int) *TreeNode {
	// Level-order BFS: drain the queue one level at a time, left child
	// before right, so a level's nodes come out in left-to-right order.
	// The node right after the one matching u is the answer.
	if root == nil {
		return nil
	}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		size := len(queue)
		found := false
		for i := 0; i < size; i++ {
			node := queue[0]
			queue = queue[1:]
			if found {
				return node
			}
			if node.Val == u {
				found = true
			}
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		if found {
			return nil
		}
	}
	return nil
}
