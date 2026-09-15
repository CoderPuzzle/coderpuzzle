import "sort"

func minCostToSupplyWater(n int, wells []int, pipes [][]int) int {
	// Kruskal over houses 1..n plus a virtual node 0 (well edges).
	type edge struct {
		cost, a, b int
	}
	edges := make([]edge, 0, n+len(pipes))
	for i := 0; i < n; i++ {
		edges = append(edges, edge{wells[i], 0, i + 1})
	}
	for _, pipe := range pipes {
		edges = append(edges, edge{pipe[2], pipe[0], pipe[1]})
	}
	sort.Slice(edges, func(i, j int) bool {
		if edges[i].cost != edges[j].cost {
			return edges[i].cost < edges[j].cost
		}
		if edges[i].a != edges[j].a {
			return edges[i].a < edges[j].a
		}
		return edges[i].b < edges[j].b
	})

	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}
	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	total := 0
	used := 0
	for _, e := range edges {
		ra := find(e.a)
		rb := find(e.b)
		if ra != rb {
			parent[ra] = rb
			total += e.cost
			used++
			if used == n {
				break
			}
		}
	}
	return total
}
