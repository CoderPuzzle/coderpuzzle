func levelOrder(root *Node) [][]int {
	if root == nil {
		return [][]int{}
	}
	levels := [][]int{}
	level := []*Node{root}
	for len(level) > 0 {
		values := make([]int, 0, len(level))
		next := []*Node{}
		for _, node := range level {
			values = append(values, node.Val)
			next = append(next, node.Children...)
		}
		levels = append(levels, values)
		level = next
	}
	return levels
}
