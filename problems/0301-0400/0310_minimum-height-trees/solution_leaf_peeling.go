import "sort"

func findMinHeightTrees(n int, edges [][]int) []int {
	// A one- or two-node tree is its own center; the general loop would
	// also mishandle two nodes that are each other's leaves.
	if n <= 2 {
		r := make([]int, n)
		for i := range r {
			r[i] = i
		}
		return r
	}
	adjacency := make([][]int, n)
	degree := make([]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adjacency[a] = append(adjacency[a], b)
		adjacency[b] = append(adjacency[b], a)
		degree[a]++
		degree[b]++
	}
	leaves := []int{}
	for i := 0; i < n; i++ {
		if degree[i] == 1 {
			leaves = append(leaves, i)
		}
	}
	remaining := n
	// Peel the tree from the outside in, topological-sort style: delete all
	// current leaves at once, each layer shortening every longest
	// root-to-leaf distance of the remaining core. The MHT root is the
	// middle of the diameter path: one node when the diameter has an even
	// edge count, two adjacent middles when odd.
	for remaining > 2 {
		// Peel exactly this round's layer, collecting the leaves it
		// exposes for the next round.
		next := []int{}
		for _, leaf := range leaves {
			remaining--
			// The popped leaf's own degree is never zeroed; a popped
			// node is not examined again, so it is harmless.
			for _, neighbor := range adjacency[leaf] {
				degree[neighbor]--
				if degree[neighbor] == 1 {
					next = append(next, neighbor)
				}
			}
		}
		leaves = next
	}
	// The one or two survivors are the centroids (MHT roots).
	sort.Ints(leaves)
	return leaves
}
