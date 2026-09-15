func treeQueries(n int, edges [][]int, queries [][]int) []int {
	adj := make([][][2]int, n+1)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], [2]int{e[1], e[2]})
		adj[e[1]] = append(adj[e[1]], [2]int{e[0], e[2]})
	}

	parent := make([]int, n+1)
	upW := make([]int, n+1)
	base := make([]int, n+1)
	tin := make([]int, n+1)
	tout := make([]int, n+1)
	timer := 0
	// entries: {node, parent, weight to parent, state 0=enter / 1=exit}
	type frame struct{ u, p, w, state int }
	stack := []frame{{1, 0, 0, 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		u, p, w, state := top.u, top.p, top.w, top.state
		if state == 0 {
			parent[u] = p
			upW[u] = w
			if p != 0 {
				base[u] = base[p] + w
			}
			timer++
			tin[u] = timer
			stack = append(stack, frame{u, p, w, 1})
			for i := len(adj[u]) - 1; i >= 0; i-- {
				nb := adj[u][i]
				if nb[0] != p {
					stack = append(stack, frame{nb[0], u, nb[1], 0})
				}
			}
		} else {
			tout[u] = timer
		}
	}

	size := n + 2
	bit := make([]int64, size+1)
	add := func(i int, val int64) {
		for ; i <= size; i += i & (-i) {
			bit[i] += val
		}
	}
	point := func(i int) int64 {
		var s int64
		for ; i > 0; i -= i & (-i) {
			s += bit[i]
		}
		return s
	}

	answer := []int{}
	for _, query := range queries {
		if query[0] == 2 {
			x := query[1]
			answer = append(answer, int(int64(base[x])+point(tin[x])))
		} else {
			u, v, wp := query[1], query[2], query[3]
			child := u
			if parent[u] != v {
				child = v
			}
			delta := int64(wp) - int64(upW[child])
			upW[child] = wp
			add(tin[child], delta)
			add(tout[child]+1, -delta)
		}
	}
	return answer
}
