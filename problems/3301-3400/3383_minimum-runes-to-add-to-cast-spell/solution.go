func minRunesToAdd(n int, crystals []int, flowFrom []int, flowTo []int) int {
	graph := make([][]int, n)
	rgraph := make([][]int, n)
	for i := range graph {
		graph[i] = make([]int, 0)
		rgraph[i] = make([]int, 0)
	}
	for e := range flowFrom {
		u := flowFrom[e]
		v := flowTo[e]
		graph[u] = append(graph[u], v)
		rgraph[v] = append(rgraph[v], u)
	}

	// Kosaraju SCC (iterative)
	visited := make([]bool, n)
	order := make([]int, 0, n)
	type frame struct{ u, idx int }
	for s := 0; s < n; s++ {
		if visited[s] {
			continue
		}
		stack := []frame{{s, 0}}
		visited[s] = true
		for len(stack) > 0 {
			top := &stack[len(stack)-1]
			if top.idx < len(graph[top.u]) {
				v := graph[top.u][top.idx]
				top.idx++
				if !visited[v] {
					visited[v] = true
					stack = append(stack, frame{v, 0})
				}
			} else {
				order = append(order, top.u)
				stack = stack[:len(stack)-1]
			}
		}
	}

	comp := make([]int, n)
	for i := range comp {
		comp[i] = -1
	}
	cid := 0
	for idx := len(order) - 1; idx >= 0; idx-- {
		s := order[idx]
		if comp[s] != -1 {
			continue
		}
		stack := []int{s}
		comp[s] = cid
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, v := range rgraph[u] {
				if comp[v] == -1 {
					comp[v] = cid
					stack = append(stack, v)
				}
			}
		}
		cid++
	}

	hasCrystal := make([]bool, cid)
	for _, c := range crystals {
		hasCrystal[comp[c]] = true
	}

	cgraph := make([][]int, cid)
	for i := range cgraph {
		cgraph[i] = make([]int, 0)
	}
	inDeg := make([]int, cid)
	seen := make(map[[2]int]bool)
	for u := 0; u < n; u++ {
		for _, v := range graph[u] {
			cu, cv := comp[u], comp[v]
			if cu != cv && !seen[[2]int{cu, cv}] {
				seen[[2]int{cu, cv}] = true
				cgraph[cu] = append(cgraph[cu], cv)
				inDeg[cv]++
			}
		}
	}

	// BFS from crystal-containing components
	good := make([]bool, cid)
	q := make([]int, 0, cid)
	for c := 0; c < cid; c++ {
		if hasCrystal[c] {
			good[c] = true
			q = append(q, c)
		}
	}
	for head := 0; head < len(q); head++ {
		u := q[head]
		for _, v := range cgraph[u] {
			if !good[v] {
				good[v] = true
				q = append(q, v)
			}
		}
	}

	ans := 0
	for c := 0; c < cid; c++ {
		if !good[c] && inDeg[c] == 0 {
			ans++
		}
	}
	return ans
}
