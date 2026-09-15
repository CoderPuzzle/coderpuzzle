// Disjoint-set union with path compression and union-by-merge: two
// independent copies track what Alice and Bob can each reach, but every
// Type 3 edge is unioned into both copies at once, since it serves both
// of them for free.
type edgeDisjointSet struct {
	parent     []int
	components int
}

func newEdgeDisjointSet(size int) *edgeDisjointSet {
	parent := make([]int, size+1)
	for i := range parent {
		parent[i] = i
	}
	return &edgeDisjointSet{parent: parent, components: size}
}

func (d *edgeDisjointSet) find(node int) int {
	for d.parent[node] != node {
		d.parent[node] = d.parent[d.parent[node]]
		node = d.parent[node]
	}
	return node
}

func (d *edgeDisjointSet) union(a, b int) bool {
	rootA, rootB := d.find(a), d.find(b)
	if rootA == rootB {
		return false
	}
	d.parent[rootA] = rootB
	d.components--
	return true
}

func maxNumEdgesToRemove(n int, edges [][]int) int {
	alice := newEdgeDisjointSet(n)
	bob := newEdgeDisjointSet(n)
	used := 0

	// Type 3 edges go first: whichever ones actually merge two components
	// help both Alice and Bob simultaneously, so they are never worse than
	// spending a Type 1 and a Type 2 edge instead.
	for _, edge := range edges {
		if edge[0] == 3 {
			mergedAlice := alice.union(edge[1], edge[2])
			mergedBob := bob.union(edge[1], edge[2])
			if mergedAlice || mergedBob {
				used++
			}
		}
	}

	// Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever the
	// shared edges left disconnected, each within its own copy.
	for _, edge := range edges {
		if edge[0] == 1 {
			if alice.union(edge[1], edge[2]) {
				used++
			}
		} else if edge[0] == 2 {
			if bob.union(edge[1], edge[2]) {
				used++
			}
		}
	}

	if alice.components != 1 || bob.components != 1 {
		return -1
	}
	return len(edges) - used
}
