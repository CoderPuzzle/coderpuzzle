func diameter(root *Node) int {
	if root == nil {
		return 0
	}
	// best tracks the widest bend seen anywhere: the two tallest child
	// arms through some node plus the two edges that join them.
	best := 0
	height(root, &best)
	return best
}

// height returns the node's height -- its longest downward arm in edges --
// folding the bend through each node into best on the way out.
func height(node *Node, best *int) int {
	first, second := -1, -1
	for _, child := range node.Children {
		arm := height(child, best)
		if arm > first {
			second = first
			first = arm
		} else if arm > second {
			second = arm
		}
	}
	if arm := first + second + 2; arm > *best {
		*best = arm
	}
	return first + 1
}
