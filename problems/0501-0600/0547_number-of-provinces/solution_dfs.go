func findCircleNum(isConnected [][]int) int {
	n := len(isConnected)
	visited := make([]bool, n)
	provinces := 0
	stack := make([]int, 0, n)
	for start := 0; start < n; start++ {
		if visited[start] {
			continue
		}
		// An unvisited city during the sweep starts a new component;
		// this one traversal absorbs exactly one province.
		provinces++
		visited[start] = true
		stack = append(stack, start)
		for len(stack) > 0 {
			city := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for other := 0; other < n; other++ {
				if isConnected[city][other] == 1 && !visited[other] {
					// Mark at push time so no city is stacked twice;
					// membership is by visitation, so self-loops and the
					// symmetric matrix never double count.
					visited[other] = true
					stack = append(stack, other)
				}
			}
		}
	}
	return provinces
}
