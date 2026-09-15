func maxDepth(root *Node) int {
	if root == nil {
		return 0
	}
	depth := 0
	level := []*Node{root}
	for len(level) > 0 {
		depth += 1
		next := []*Node{}
		for _, node := range level {
			next = append(next, node.Children...)
		}
		level = next
	}
	return depth
}
