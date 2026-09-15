// Iterative DFS from node 0 with an explicit stack: tin/tout record each
// subtree as the half-open interval [tin[u], tout[u]) of entry stamps, so
// the ancestor test is a plain range check. Popping the ^u marker is the
// post-order moment -- fold sub[u] into its parent there, after every
// descendant has already contributed.
func minimumScore(nums []int, edges [][]int) int {
	n := len(nums)
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	tin := make([]int, n)
	tout := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	sub := append([]int(nil), nums...)
	timer := 0
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if u >= 0 {
			tin[u] = timer
			timer++
			stack = append(stack, ^u)
			for _, v := range adj[u] {
				if v != parent[u] {
					parent[v] = u
					stack = append(stack, v)
				}
			}
		} else {
			u = ^u
			tout[u] = timer
			if p := parent[u]; p >= 0 {
				sub[p] ^= sub[u]
			}
		}
	}

	total := sub[0]

	// Every edge is its child endpoint, so the pairs below run over all
	// ways to remove two edges. The three cases are exhaustive and
	// mutually exclusive, and in each the third component's XOR is
	// recovered from the other two. Values are at most 10^8 (< 2^27), so
	// every XOR and every score difference fits an int.
	best := 1 << 62
	for x := 1; x < n; x++ {
		sx, tx, ex := sub[x], tin[x], tout[x]
		tpx := total ^ sx
		for y := x + 1; y < n; y++ {
			sy, ty := sub[y], tin[y]
			var a, b, c int
			switch {
			case tx <= ty && ty < ex: // x is an ancestor of y
				a, b, c = sy, sx^sy, tpx
			case ty <= tx && tx < tout[y]: // y is an ancestor of x
				a, b, c = sx, sx^sy, total^sy
			default: // disjoint subtrees
				a, b, c = sx, sy, tpx^sy
			}
			lo, hi := a, b
			if a > b {
				lo, hi = b, a
			}
			if c < lo {
				lo = c
			} else if c > hi {
				hi = c
			}
			if hi-lo < best {
				best = hi - lo
			}
		}
	}
	return best
}
