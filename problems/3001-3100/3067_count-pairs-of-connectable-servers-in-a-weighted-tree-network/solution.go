// Per server c: flood every branch (one component per neighbor) separately,
// counting the servers whose distance from c is divisible by signalSpeed.
// Two paths out of c share an edge exactly when they leave along the same
// first edge, so cross-branch pairs are exactly the connectable ones; c
// itself sits in no branch. A parent guard prevents revisits -- sufficient
// in a tree -- and the explicit stack keeps the walk off the call stack.
func countPairsOfConnectableServers(edges [][]int, signalSpeed int) []int {
	n := len(edges) + 1
	adj := make([][][2]int, n)
	for _, e := range edges {
		a, b, w := e[0], e[1], e[2]
		adj[a] = append(adj[a], [2]int{b, w})
		adj[b] = append(adj[b], [2]int{a, w})
	}

	type frame struct {
		u, parent, dist int
	}
	stack := make([]frame, 0, n)
	answer := make([]int, n)

	for c := 0; c < n; c++ {
		total, squareSum := 0, 0
		for _, root := range adj[c] {
			count := 0
			stack = stack[:0]
			stack = append(stack, frame{root[0], c, root[1] % signalSpeed})
			for len(stack) > 0 {
				f := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				if f.dist == 0 {
					count++
				}
				for _, vw := range adj[f.u] {
					if vw[0] != f.parent {
						stack = append(stack, frame{vw[0], f.u, (f.dist + vw[1]) % signalSpeed})
					}
				}
			}
			total += count
			squareSum += count * count
		}
		// Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
		answer[c] = (total*total - squareSum) / 2
	}
	return answer
}
