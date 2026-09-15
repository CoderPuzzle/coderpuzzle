// Kahn's order over the graph's natural direction: a node is dequeued only
// once every incoming edge is consumed, so all of its direct parents are
// final and its ancestor set is the union of each parent plus that parent's
// already-computed set.
func getAncestors(n int, edges [][]int) [][]int {
	children := make([][]int, n)
	parents := make([][]int, n)
	for _, edge := range edges {
		children[edge[0]] = append(children[edge[0]], edge[1])
		parents[edge[1]] = append(parents[edge[1]], edge[0])
	}
	words := (n + 63) / 64
	// ancestors[v] is a bitset of the nodes that reach v
	ancestors := make([][]uint64, n)
	for v := range ancestors {
		ancestors[v] = make([]uint64, words)
	}
	indegree := make([]int, n)
	queue := make([]int, 0, n)
	for v := 0; v < n; v++ {
		indegree[v] = len(parents[v])
		if indegree[v] == 0 {
			queue = append(queue, v)
		}
	}
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		for _, parent := range parents[node] {
			ancestors[node][parent>>6] |= 1 << (parent & 63)
			for w := 0; w < words; w++ {
				ancestors[node][w] |= ancestors[parent][w]
			}
		}
		for _, child := range children[node] {
			indegree[child]--
			if indegree[child] == 0 {
				queue = append(queue, child)
			}
		}
	}
	answer := make([][]int, n)
	for v := 0; v < n; v++ {
		row := []int{}
		for u := 0; u < n; u++ {
			if ancestors[v][u>>6]&(1<<(u&63)) != 0 {
				row = append(row, u)
			}
		}
		answer[v] = row
	}
	return answer
}
