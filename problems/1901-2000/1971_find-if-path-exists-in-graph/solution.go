// Build the adjacency list, then run a breadth-first search from source.
// The graph is undirected, so every edge is added in both directions. A
// visited slice keeps the search from re-processing nodes; if destination
// is reached the path exists, and when the queue empties without reaching
// it, no path can exist either.
func validPath(n int, edges [][]int, source int, destination int) bool {
	graph := make([][]int, n)
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		graph[edge[1]] = append(graph[edge[1]], edge[0])
	}
	if source == destination {
		return true
	}
	visited := make([]bool, n)
	visited[source] = true
	pending := []int{source}
	for len(pending) > 0 {
		node := pending[0]
		pending = pending[1:]
		for _, neighbor := range graph[node] {
			if neighbor == destination {
				return true
			}
			if !visited[neighbor] {
				visited[neighbor] = true
				pending = append(pending, neighbor)
			}
		}
	}
	return false
}
