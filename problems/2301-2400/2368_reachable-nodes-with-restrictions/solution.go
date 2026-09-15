func reachableNodes(n int, edges [][]int, restricted []int) int {
	// One breadth-first sweep from node 0 over the tree, never entering a
	// restricted node; every dequeued node is counted exactly once.
	blocked := make(map[int]bool, len(restricted))
	for _, node := range restricted {
		blocked[node] = true
	}
	adjacent := make([][]int, n)
	for _, edge := range edges {
		adjacent[edge[0]] = append(adjacent[edge[0]], edge[1])
		adjacent[edge[1]] = append(adjacent[edge[1]], edge[0])
	}
	visited := make([]bool, n)
	visited[0] = true
	queue := []int{0}
	reached := 0
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		reached++
		for _, neighbor := range adjacent[node] {
			if !visited[neighbor] && !blocked[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}
	return reached
}
