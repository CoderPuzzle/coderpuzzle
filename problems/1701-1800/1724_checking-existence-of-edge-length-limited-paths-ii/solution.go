package main

import "sort"

// A Kruskal minimum spanning forest annotated for max-edge queries:
// uniting the edges cheapest first leaves, between every pair of nodes, a
// tree path whose largest edge is as small as the graph allows, so "some
// path uses only edges < limit" reduces to reading that one tree path's
// maximum off a binary-lifting table.
type DistanceLimitedPathsExist struct {
	depth   []int
	rootOf  []int
	levels  int
	up      [][]int
	maxEdge [][]int
}

func NewDistanceLimitedPathsExistTyped(n int, edgeList [][]int) *DistanceLimitedPathsExist {
	// Kruskal: sorting by distance and uniting components turns the
	// accepted edges into one minimum spanning tree per component.
	edges := make([][]int, len(edgeList))
	copy(edges, edgeList)
	sort.Slice(edges, func(i, j int) bool { return edges[i][2] < edges[j][2] })
	parent := make([]int, n)
	adjacency := make([][]int, n)
	for node := 0; node < n; node++ {
		parent[node] = node
		adjacency[node] = make([]int, 0, 4)
	}
	// adjacency rows carry [neighbor, distance] pairs flattened.
	for _, edge := range edges {
		rootU := find(parent, edge[0])
		rootV := find(parent, edge[1])
		if rootU != rootV {
			parent[rootU] = rootV
			adjacency[edge[0]] = append(adjacency[edge[0]], edge[1], edge[2])
			adjacency[edge[1]] = append(adjacency[edge[1]], edge[0], edge[2])
		}
	}

	// One BFS per component fixes each node's root, depth, and parent
	// edge. A root's own parent entry stays (itself, 0), so a lifting
	// hop never runs off the top of its tree.
	graph := &DistanceLimitedPathsExist{
		depth:  make([]int, n),
		rootOf: make([]int, n),
	}
	parent0 := make([]int, n)
	weight0 := make([]int, n)
	for node := 0; node < n; node++ {
		parent0[node] = node
		graph.rootOf[node] = node
	}
	visited := make([]bool, n)
	queue := make([]int, 0, n)
	for start := 0; start < n; start++ {
		if visited[start] {
			continue
		}
		visited[start] = true
		queue = append(queue[:0], start)
		for head := 0; head < len(queue); head++ {
			node := queue[head]
			row := adjacency[node]
			for i := 0; i < len(row); i += 2 {
				neighbor, dis := row[i], row[i+1]
				if !visited[neighbor] {
					visited[neighbor] = true
					graph.rootOf[neighbor] = start
					graph.depth[neighbor] = graph.depth[node] + 1
					parent0[neighbor] = node
					weight0[neighbor] = dis
					queue = append(queue, neighbor)
				}
			}
		}
	}

	// Lifting levels: up[j][node] is the 2^j-th ancestor and maxEdge the
	// largest weight on that hop — two half-hops glued together.
	deepest := 0
	for _, value := range graph.depth {
		if value > deepest {
			deepest = value
		}
	}
	graph.levels = 1
	for 1<<graph.levels <= deepest {
		graph.levels++
	}
	graph.up = make([][]int, graph.levels)
	graph.maxEdge = make([][]int, graph.levels)
	graph.up[0] = parent0
	graph.maxEdge[0] = weight0
	for j := 1; j < graph.levels; j++ {
		graph.up[j] = make([]int, n)
		graph.maxEdge[j] = make([]int, n)
		for node := 0; node < n; node++ {
			half := graph.up[j-1][node]
			graph.up[j][node] = graph.up[j-1][half]
			if left, right := graph.maxEdge[j-1][node], graph.maxEdge[j-1][half]; left > right {
				graph.maxEdge[j][node] = left
			} else {
				graph.maxEdge[j][node] = right
			}
		}
	}
	return graph
}

func (design *DistanceLimitedPathsExist) query(p int, q int, limit int) bool {
	// Distinct spanning trees means no path exists at any limit.
	if design.rootOf[p] != design.rootOf[q] {
		return false
	}
	if p == q {
		return true
	}
	best := 0
	a, b := p, q
	if design.depth[a] < design.depth[b] {
		a, b = b, a
	}
	// Lift the deeper node level by level until both depths match,
	// collecting every edge weight the hops pass over.
	diff := design.depth[a] - design.depth[b]
	level := 0
	for diff != 0 {
		if diff&1 == 1 {
			if design.maxEdge[level][a] > best {
				best = design.maxEdge[level][a]
			}
			a = design.up[level][a]
		}
		diff >>= 1
		level++
	}
	if a == b {
		return best < limit
	}
	// Lift both together while their 2^level ancestors differ — that
	// stops just below the LCA — then take the final parent edges.
	for j := design.levels - 1; j >= 0; j-- {
		if design.up[j][a] != design.up[j][b] {
			for _, node := range []int{a, b} {
				if design.maxEdge[j][node] > best {
					best = design.maxEdge[j][node]
				}
			}
			a = design.up[j][a]
			b = design.up[j][b]
		}
	}
	for _, node := range []int{a, b} {
		if design.maxEdge[0][node] > best {
			best = design.maxEdge[0][node]
		}
	}
	return best < limit
}

func find(parent []int, x int) int {
	for parent[x] != x {
		parent[x] = parent[parent[x]]
		x = parent[x]
	}
	return x
}
