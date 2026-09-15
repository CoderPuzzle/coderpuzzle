func minOperationsQueries(n int, edges [][]int, queries [][]int) []int {
	type neighbor struct {
		node   int
		weight int
	}
	// Adjacency as flat per-node slices of (node, weight) pairs: two passes
	// over the edge list.
	degree := make([]int, n)
	for _, edge := range edges {
		degree[edge[0]]++
		degree[edge[1]]++
	}
	adjacency := make([][]neighbor, n)
	for node := 0; node < n; node++ {
		adjacency[node] = make([]neighbor, 0, degree[node])
	}
	for _, edge := range edges {
		adjacency[edge[0]] = append(adjacency[edge[0]], neighbor{edge[1], edge[2] - 1})
		adjacency[edge[1]] = append(adjacency[edge[1]], neighbor{edge[0], edge[2] - 1})
	}

	// One breadth-first search from node 0 fills every static structure:
	// parent/depth and a parent-before-child order that both the weight
	// frequency prefixes and the lifting table consume in one sweep. The
	// queue keeps a 10^4-node path off the call stack.
	parent := make([]int, n)
	pweight := make([]int, n)
	depth := make([]int, n)
	seen := make([]bool, n)
	order := make([]int, 0, n)
	count := 0
	seen[0] = true
	order = append(order, 0)
	count++
	for head := 0; head < count; head++ {
		node := order[head]
		for _, next := range adjacency[node] {
			if !seen[next.node] {
				seen[next.node] = true
				parent[next.node] = node
				pweight[next.node] = next.weight
				depth[next.node] = depth[node] + 1
				order = append(order, next.node)
				count++
			}
		}
	}

	// Changing an edge to any value leaves other edges untouched, so an
	// operation fixes exactly one edge of the path and the answer is the
	// path length minus its most frequent edge weight. Weights live in
	// 1..26, so freq[w][v] counts weight-w edges from the root down to v;
	// on the a..b path that count is freq[a][w] + freq[b][w] - 2 *
	// freq[lca][w]: every edge above the lowest common ancestor appears in
	// both root paths and cancels, and the LCA's own incoming edge cancels
	// with itself.
	freq := make([][]int, 26)
	for w := 0; w < 26; w++ {
		freq[w] = make([]int, n)
	}
	for index := 1; index < n && index < len(order); index++ {
		node := order[index]
		for w := 0; w < 26; w++ {
			freq[w][node] = freq[w][parent[node]]
		}
		freq[pweight[node]][node]++
	}

	// Binary lifting over the parent pointers: table[level][v] is the
	// 2^level-th ancestor of v (the root maps to itself), which makes each
	// query an O(log n) climb instead of a walk along the possibly O(n)
	// path. Every stored value stays below 2^17 << 2^31.
	maxDepth := 0
	for node := 0; node < n; node++ {
		if depth[node] > maxDepth {
			maxDepth = depth[node]
		}
	}
	levels := 1
	for (1 << levels) <= maxDepth {
		levels++
	}
	table := make([][]int, levels)
	table[0] = parent
	for level := 1; level < levels; level++ {
		previous := table[level-1]
		current := make([]int, n)
		for node := 0; node < n; node++ {
			current[node] = previous[previous[node]]
		}
		table[level] = current
	}

	answer := make([]int, len(queries))
	for index, query := range queries {
		a, b := query[0], query[1]
		u, v := a, b
		if depth[u] < depth[v] {
			u, v = v, u
		}
		diff := depth[u] - depth[v]
		level := 0
		for diff > 0 {
			if diff&1 != 0 {
				u = table[level][u]
			}
			diff >>= 1
			level++
		}
		var lca int
		if u != v {
			for level := levels - 1; level >= 0; level-- {
				row := table[level]
				if row[u] != row[v] {
					u = row[u]
					v = row[v]
				}
			}
			lca = parent[u]
		} else {
			lca = u
		}
		best := -1
		for w := 0; w < 26; w++ {
			cnt := freq[w][a] + freq[w][b] - 2*freq[w][lca]
			if cnt > best {
				best = cnt
			}
		}
		pathLength := depth[a] + depth[b] - 2*depth[lca]
		answer[index] = pathLength - best
	}
	return answer
}
