func countHighestScoreNodes(parents []int) int {
	n := len(parents)
	children := make([][]int, n)
	for node := 1; node < n; node++ {
		children[parents[node]] = append(children[parents[node]], node)
	}

	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		stack = append(stack, children[node]...)
	}

	subtree := make([]int, n)
	var highest int64
	count := 0
	for index := len(order) - 1; index >= 0; index-- {
		node := order[index]
		size := 1
		var score int64 = 1
		for _, child := range children[node] {
			size += subtree[child]
			score *= int64(subtree[child])
		}
		subtree[node] = size
		outside := n - size
		if outside != 0 {
			score *= int64(outside)
		}
		if score > highest {
			highest = score
			count = 1
		} else if score == highest {
			count++
		}
	}
	return count
}
