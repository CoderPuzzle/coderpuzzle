func diameter(root *Node) int {
	if root == nil {
		return 0
	}

	// Pass one: every node's height -- its longest downward arm in edges
	// -- materialized into a table keyed by the node.
	height := make(map[*Node]int)
	measure(root, height)

	// Pass two: the widest bend at each node pairs its two tallest child
	// arms; absent arms read -1, so a leaf scores 0.
	best := 0
	stack := []*Node{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		first, second := -1, -1
		for _, child := range node.Children {
			stack = append(stack, child)
			arm := height[child]
			if arm > first {
				second = first
				first = arm
			} else if arm > second {
				second = arm
			}
		}
		if bend := first + second + 2; bend > best {
			best = bend
		}
	}
	return best
}

func measure(node *Node, height map[*Node]int) int {
	tallest := -1
	for _, child := range node.Children {
		tallest = max(tallest, measure(child, height))
	}
	height[node] = tallest + 1
	return tallest + 1
}
