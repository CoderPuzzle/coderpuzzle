import "sort"

func minimumCost(n int, connections [][]int) int {
	// Kruskal: scan edges cheapest-first; the greedy exchange argument
	// makes the accepted set a minimum spanning tree
	conns := make([][]int, len(connections))
	copy(conns, connections)
	sort.Slice(conns, func(i, j int) bool { return conns[i][2] < conns[j][2] })

	// union-find over n+1 slots (index 0 unused; cities are 1-based)
	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		// path halving keeps subsequent finds near-constant
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	total := 0
	components := n
	for _, c := range conns {
		rx, ry := find(c[0]), find(c[1])
		// take the edge only when it joins two different components,
		// i.e. it closes no cycle
		if rx != ry {
			parent[rx] = ry
			total += c[2]
			components--
			// one component left: the tree is complete, later edges are
			// all more expensive
			if components == 1 {
				return total
			}
		}
	}
	// edges ran out first: the graph is disconnected
	return -1
}
