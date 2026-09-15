// Reverse every edge; ancestors of v are exactly the nodes reachable from
// v in the reversed graph. BFS per node, then emit visited indices in
// ascending order.
func getAncestors(n int, edges [][]int) [][]int {
	reverseAdj := make([][]int, n)
	for _, edge := range edges {
		reverseAdj[edge[1]] = append(reverseAdj[edge[1]], edge[0])
	}
	answer := make([][]int, n)
	for start := 0; start < n; start++ {
		seen := make([]bool, n)
		seen[start] = true
		queue := []int{start}
		for len(queue) > 0 {
			node := queue[0]
			queue = queue[1:]
			for _, prev := range reverseAdj[node] {
				if !seen[prev] {
					seen[prev] = true
					queue = append(queue, prev)
				}
			}
		}
		row := []int{}
		for u := 0; u < n; u++ {
			if seen[u] && u != start {
				row = append(row, u)
			}
		}
		answer[start] = row
	}
	return answer
}
