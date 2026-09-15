func timeTaken(edges [][]int) []int {
	// Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
	n := len(edges) + 1
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// Iterative DFS ordering rooted at 0.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	parent[0] = -2 // sentinel distinct from every node id
	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			parent[v] = u
			stack = append(stack, v)
		}
	}

	last := make([]int, n)   // max marking time within u's subtree
	lastNo := make([]int, n) // child attaining last[u]
	second := make([]int, n) // second-best child contribution
	for i := range lastNo {
		lastNo[i] = -1
	}
	for k := n - 1; k >= 0; k-- {
		u := order[k]
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			t := last[v]
			if v%2 == 0 {
				t += 2
			} else {
				t++
			}
			if last[u] < t {
				second[u] = last[u]
				last[u] = t
				lastNo[u] = v
			} else if second[u] < t {
				second[u] = t
			}
		}
	}

	answer := make([]int, n)
	copy(answer, last)
	up := make([]int, n) // best time outside u's subtree
	for _, u := range order {
		cost := 1
		if u%2 == 0 {
			cost = 2
		}
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			base := last[u]
			if v == lastNo[u] {
				base = second[u]
			}
			pl := up[u]
			if base > pl {
				pl = base
			}
			pl += cost
			up[v] = pl
			if pl > answer[v] {
				answer[v] = pl
			}
		}
	}
	return answer
}
