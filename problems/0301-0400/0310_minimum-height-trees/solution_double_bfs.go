func findMinHeightTrees(n int, edges [][]int) []int {
	adjacency := make([][]int, n)
	for _, e := range edges {
		adjacency[e[0]] = append(adjacency[e[0]], e[1])
		adjacency[e[1]] = append(adjacency[e[1]], e[0])
	}
	dist := make([]int, n)
	parent := make([]int, n)
	// One BFS from src: fills dist and parent, returns the farthest node
	// from src.
	farthestFrom := func(src int) int {
		for i := range dist {
			dist[i] = -1
		}
		dist[src] = 0
		parent[src] = -1
		queue := []int{src}
		for head := 0; head < len(queue); head++ {
			u := queue[head]
			for _, v := range adjacency[u] {
				if dist[v] < 0 {
					dist[v] = dist[u] + 1
					parent[v] = u
					queue = append(queue, v)
				}
			}
		}
		best := 0
		for i := 1; i < n; i++ {
			if dist[i] > dist[best] {
				best = i
			}
		}
		return best
	}
	// Two-shot diameter: the farthest node from any start is one end of a
	// longest path, and the farthest node from there is the other end.
	u := farthestFrom(0)
	v := farthestFrom(u)
	// Climb v back to u along discovery parents: the diameter path.
	path := []int{}
	for x := v; x != -1; x = parent[x] {
		path = append(path, x)
	}
	d := dist[v]
	// The minimal-height roots are the path's middle: one node when the
	// diameter has an even number of edges, two adjacent middles when odd.
	if d%2 == 0 {
		return []int{path[d/2]}
	}
	if path[d/2] < path[d/2+1] {
		return []int{path[d/2], path[d/2+1]}
	}
	return []int{path[d/2+1], path[d/2]}
}
