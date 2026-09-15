func maximumInvitations(favorite []int) int {
	n := len(favorite)
	// favorite defines a functional graph: disjoint cycles with in-trees
	// hanging off them.
	indeg := make([]int, n)
	for _, f := range favorite {
		indeg[f]++
	}

	// Kahn-style peel of the acyclic nodes: after it, depth[v] is the node
	// count of the longest chain of non-cycle employees leading directly
	// into v (at least 1 — itself), i.e. the arm length a 2-cycle can
	// absorb on that side.
	depth := make([]int, n)
	for i := range depth {
		depth[i] = 1
	}
	queue := make([]int, 0, n)
	for i := 0; i < n; i++ {
		if indeg[i] == 0 {
			queue = append(queue, i)
		}
	}
	for head := 0; head < len(queue); head++ {
		u := queue[head]
		v := favorite[u]
		if depth[u]+1 > depth[v] {
			depth[v] = depth[u] + 1
		}
		indeg[v]--
		if indeg[v] == 0 {
			queue = append(queue, v)
		}
	}

	// Whatever still has positive indegree is a cycle node. A seating is
	// either one whole cycle >= 3 (outsiders can't join: every neighbor seat
	// is taken) or 2-cycles with both chains — and several pairs can share
	// one table, so those add up.
	maxCycle := 0
	pairSum := 0
	visited := make([]bool, n)
	for i := 0; i < n; i++ {
		if indeg[i] > 0 && !visited[i] {
			cycleLen := 0
			cur := i
			for !visited[cur] {
				visited[cur] = true
				cycleLen++
				cur = favorite[cur]
			}
			if cycleLen == 2 {
				// The pair sits together; each side takes one chain.
				pairSum += depth[i] + depth[favorite[i]]
			} else if cycleLen > maxCycle {
				maxCycle = cycleLen
			}
		}
	}
	if maxCycle > pairSum {
		return maxCycle
	}
	return pairSum
}
