import "sort"

// The pair set of any valid tree is exactly its ancestor pairs, so a
// node's adjacency names all of its ancestors and all of its
// descendants at once. The root pairs with every other value, so the
// largest degree must be V-1, where V is the number of distinct
// values. Walk the values in decreasing degree order, placing each
// one: every neighbor of v that is already placed has degree at least
// v's, hence is an ancestor of v in every valid tree, and the
// smallest-degree such neighbor is the deepest one — v's parent. An
// ancestor's adjacency must then swallow v's whole adjacency minus
// the parent itself; a neighbor of v outside the parent's adjacency
// means no tree realizes the pairs (0). A parent whose degree equals
// v's differs from v exactly by the pair between them — the two can
// be swapped, so more than one tree exists (2). Otherwise every
// parent is forced and exactly one tree exists (1).
func checkWays(pairs [][]int) int {
	var adj [501][501]bool
	var deg [501]int
	for _, pair := range pairs {
		x, y := pair[0], pair[1]
		adj[x][y] = true
		adj[y][x] = true
		deg[x]++
		deg[y]++
	}
	order := make([]int, 0, len(pairs))
	for v := 1; v <= 500; v++ {
		if deg[v] > 0 {
			order = append(order, v)
		}
	}
	sort.Slice(order, func(i, j int) bool { return deg[order[i]] > deg[order[j]] })
	var placed [501]bool
	placed[order[0]] = true
	if deg[order[0]] != len(order)-1 {
		return 0
	}
	multiple := false
	for _, v := range order[1:] {
		parent := 0
		for u := 1; u <= 500; u++ {
			if adj[v][u] && placed[u] && (parent == 0 || deg[u] < deg[parent]) {
				parent = u
			}
		}
		if parent == 0 {
			return 0
		}
		contained := true
		for w := 1; w <= 500; w++ {
			if adj[v][w] && w != parent && !adj[parent][w] {
				contained = false
				break
			}
		}
		if !contained {
			return 0
		}
		if deg[parent] == deg[v] {
			multiple = true
		}
		placed[v] = true
	}
	if multiple {
		return 2
	}
	return 1
}
