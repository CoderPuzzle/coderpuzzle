func isEvenOddTree(root *TreeNode) bool {
	if root == nil {
		return true
	}
	level := 0
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		size := len(queue)
		hasPrev := false
		prev := 0
		for s := 0; s < size; s++ {
			node := queue[s]
			if level%2 == 0 {
				if node.Val%2 == 0 || (hasPrev && node.Val <= prev) {
					return false
				}
			} else {
				if node.Val%2 != 0 || (hasPrev && node.Val >= prev) {
					return false
				}
			}
			prev = node.Val
			hasPrev = true
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[size:]
		level++
	}
	return true
}
