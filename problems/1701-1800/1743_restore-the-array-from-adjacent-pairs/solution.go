// Build the adjacency map: the array is a path, so every value has one or
// two neighbours. The judge compares the returned array exactly, so the
// walk must start at the same endpoint every time: the first pair's
// element that is an endpoint, or the smaller endpoint when the first
// pair is an internal edge.
func restoreArray(adjacentPairs [][]int) []int {
	adj := map[int][]int{}
	for _, pair := range adjacentPairs {
		u, v := pair[0], pair[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}
	a, b := adjacentPairs[0][0], adjacentPairs[0][1]
	var start int
	if len(adj[a]) == 1 {
		start = a
	} else if len(adj[b]) == 1 {
		start = b
	} else {
		start = 1 << 60
		for value, neighbors := range adj {
			if len(neighbors) == 1 && value < start {
				start = value
			}
		}
	}
	// Values live in [-1e5, 1e5], so a huge sentinel stands in for "no
	// previous element" at the start of the walk.
	result := make([]int, 0, len(adjacentPairs)+1)
	prev := 1 << 60
	cur := start
	for {
		result = append(result, cur)
		nxt := 1 << 60
		for _, nb := range adj[cur] {
			if nb != prev {
				nxt = nb
				break
			}
		}
		if nxt == 1<<60 {
			break
		}
		prev, cur = cur, nxt
	}
	return result
}
