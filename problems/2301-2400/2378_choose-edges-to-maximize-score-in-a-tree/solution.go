func maxScore(edges [][]int) int64 {
	n := len(edges)
	if n == 1 {
		return 0
	}
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		p := edges[i][0]
		children[p] = append(children[p], i)
	}
	// Iterative preorder; iterating it in reverse finalizes every child
	// before its parent, so no recursion (n can be 1e5, deep chains).
	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		stack = append(stack, children[u]...)
	}
	// dp0[u]: parent edge not chosen; dp1[u]: chosen (its weight is
	// accounted by the parent, so dp1 only constrains u's own picks).
	dp0 := make([]int64, n)
	dp1 := make([]int64, n)
	for oi := len(order) - 1; oi >= 0; oi-- {
		u := order[oi]
		// base = take no child edge: sum of children in state 0.
		var base int64
		var bestGain int64
		for _, c := range children[u] {
			w := int64(edges[c][1])
			base += dp0[c]
			// Switching c's edge on: child must drop its parent edge.
			gain := dp1[c] + w - dp0[c]
			if gain > bestGain {
				bestGain = gain
			}
		}
		// u may take at most one child edge; only a positive gain is
		// applied, so negative-weight edges are never forced in.
		dp0[u] = base + bestGain
		// Parent edge taken => no child edge allowed for u.
		dp1[u] = base
	}
	return dp0[0]
}
