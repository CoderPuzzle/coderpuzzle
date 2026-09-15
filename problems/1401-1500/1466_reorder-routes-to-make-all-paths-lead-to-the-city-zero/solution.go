func minReorder(n int, connections [][]int) int {
	// neighbors[node] stores (neighbor, direction) pairs; direction 1 = original a->b
	neighbors := make([][][2]int, n)
	for _, conn := range connections {
		a, b := conn[0], conn[1]
		neighbors[a] = append(neighbors[a], [2]int{b, 1})
		neighbors[b] = append(neighbors[b], [2]int{a, 0})
	}
	changed := 0
	visited := make([]bool, n)
	stack := []int{0}
	visited[0] = true
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, e := range neighbors[node] {
			nxt, direction := e[0], e[1]
			if visited[nxt] {
				continue
			}
			if direction == 1 {
				changed++
			}
			visited[nxt] = true
			stack = append(stack, nxt)
		}
	}
	return changed
}
