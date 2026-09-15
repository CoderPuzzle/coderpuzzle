func countVisitedNodes(edges []int) []int {
	n := len(edges)
	state := make([]int, n) // 0 unvisited, 1 on the current path, 2 resolved
	ans := make([]int, n)

	for start := 0; start < n; start++ {
		if state[start] == 2 {
			continue
		}
		path := make([]int, 0, n)
		cur := start
		for state[cur] == 0 {
			state[cur] = 1
			path = append(path, cur)
			cur = edges[cur]
		}
		if state[cur] == 1 {
			// A cycle was discovered; find its start inside path.
			cycleStart := -1
			for i, node := range path {
				if node == cur {
					cycleStart = i
					break
				}
			}
			length := len(path) - cycleStart
			for _, node := range path[cycleStart:] {
				ans[node] = length
				state[node] = 2
			}
			for depth := 0; depth < cycleStart; depth++ {
				node := path[depth]
				ans[node] = length + (cycleStart - depth)
				state[node] = 2
			}
		} else {
			// path leads into an already-resolved component.
			base := ans[cur]
			for depth, node := range path {
				ans[node] = base + (len(path) - depth)
				state[node] = 2
			}
		}
	}
	return ans
}
