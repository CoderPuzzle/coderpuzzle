func maxTargetNodes(edges1 [][]int, edges2 [][]int) []int {
	// In a tree, distance parity is the difference of depth parities, so
	// the nodes target to u are exactly u's own bipartition class and a
	// second-tree node v contributes its opposite class. One iterative
	// BFS per tree (a 1e5-node path would overflow a recursive walk)
	// labels each node's parity and sizes both classes: answer[i] is
	// tree 1's class size at i's parity, plus tree 2's larger class —
	// the maximum opposite-class count over every connection node,
	// identical for every i.
	counts2 := classify(edges2)
	best2 := counts2[0]
	if counts2[1] > best2 {
		best2 = counts2[1]
	}
	counts1 := classify(edges1)
	n := len(counts1) - 2
	answer := make([]int, n)
	for u := 0; u < n; u++ {
		if counts1[u+2] == 0 {
			answer[u] = counts1[0] + best2
		} else {
			answer[u] = counts1[1] + best2
		}
	}
	return answer
}

// Slots 0/1 hold the two depth-parity class sizes, slots 2.. hold each
// node's depth parity. Pointer-queue BFS — iterative, so deep paths
// cannot overflow the stack.
func classify(edges [][]int) []int {
	n := len(edges) + 1
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	res := make([]int, n+2)
	parity := make([]int, n)
	for i := range parity {
		parity[i] = -1
	}
	parity[0] = 0
	res[0] = 1
	queue := make([]int, n)
	queue[0] = 0
	head, tail := 0, 1
	for head < tail {
		u := queue[head]
		head++
		for _, w := range adj[u] {
			if parity[w] < 0 {
				parity[w] = parity[u] ^ 1
				res[parity[w]]++
				queue[tail] = w
				tail++
			}
		}
	}
	copy(res[2:], parity)
	return res
}
