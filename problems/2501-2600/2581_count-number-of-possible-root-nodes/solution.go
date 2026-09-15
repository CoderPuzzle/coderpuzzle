func rootCount(edges [][]int, guesses [][]int, k int) int {
	n := len(edges) + 1
	graph := make([][]int, n)
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], e[1])
		graph[e[1]] = append(graph[e[1]], e[0])
	}
	key := func(a, b int) int64 {
		return int64(a)<<32 | int64(uint32(b))
	}
	// Guess set of packed (parent, child) keys gives O(1) direction checks.
	guessSet := make(map[int64]struct{})
	for _, g := range guesses {
		guessSet[key(g[0], g[1])] = struct{}{}
	}

	// Iterative DFS from root 0 records each node's parent and an order where
	// parents precede children — rerooting without recursion.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	visited := make([]bool, n)
	stack := []int{0}
	visited[0] = true
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range graph[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				stack = append(stack, v)
			}
		}
	}

	cnt := make([]int, n)
	// Correct-guess count for root 0: one point per edge whose (parent,
	// child) direction was guessed.
	for v := 1; v < n; v++ {
		if _, ok := guessSet[key(parent[v], v)]; ok {
			cnt[0]++
		}
	}

	ans := 0
	if cnt[0] >= k {
		ans = 1
	}
	for _, u := range order[1:] {
		// Moving the root across edge p -> u flips only that one edge:
		// guess (p, u) becomes wrong and reversed guess (u, p) becomes
		// right. Parents come first in `order`, so cnt[p] is final here.
		p := parent[u]
		c := cnt[p]
		if _, ok := guessSet[key(p, u)]; ok {
			c--
		}
		if _, ok := guessSet[key(u, p)]; ok {
			c++
		}
		cnt[u] = c
		if c >= k {
			ans++
		}
	}
	return ans
}
