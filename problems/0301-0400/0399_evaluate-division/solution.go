type eqEdge struct {
	to     string
	weight float64
}

func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
	// node -> adjacency list of (neighbor, weight) in insertion order;
	// re-adding an edge overwrites its weight in place (like Python dict).
	graph := make(map[string][]eqEdge)
	addEdge := func(a, b string, w float64) {
		adj := graph[a]
		for i := range adj {
			if adj[i].to == b {
				adj[i].weight = w
				return
			}
		}
		graph[a] = append(adj, eqEdge{b, w})
	}
	// Each equation a/b = v becomes a directed edge a -> b of weight v
	// plus the reverse edge of weight 1/v (division inverts with direction).
	for i := range equations {
		a, b := equations[i][0], equations[i][1]
		addEdge(a, b, values[i])
		addEdge(b, a, 1.0/values[i])
	}

	results := make([]float64, 0, len(queries))
	for _, q := range queries {
		results = append(results, query(graph, q[0], q[1]))
	}
	return results
}

func query(graph map[string][]eqEdge, start, end string) float64 {
	// An unknown variable is unanswerable (this also covers x / x for
	// an undefined x); a known variable over itself is 1.0.
	if _, ok := graph[start]; !ok {
		return -1.0
	}
	if _, ok := graph[end]; !ok {
		return -1.0
	}
	if start == end {
		return 1.0
	}
	// BFS carrying the running product: weights along the path telescope
	// to start / end because intermediate variables cancel.
	seen := map[string]bool{start: true}
	type state struct {
		node    string
		product float64
	}
	queue := []state{{start, 1.0}}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		for _, edge := range graph[cur.node] {
			if edge.to == end {
				// Equations are consistent, so the first path found
				// already yields the correct quotient.
				return cur.product * edge.weight
			}
			if !seen[edge.to] {
				seen[edge.to] = true
				queue = append(queue, state{edge.to, cur.product * edge.weight})
			}
		}
	}
	return -1.0
}
