func longestPath(parent []int, s string) int {
	n := len(parent)
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		p := parent[i]
		children[p] = append(children[p], i)
	}

	// iterative DFS ordering (parents before children)
	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, v := range children[u] {
			stack = append(stack, v)
		}
	}

	best := 1
	down := make([]int, n) // longest valid chain starting at u, going into its subtree
	for i := len(order) - 1; i >= 0; i-- {
		u := order[i]
		first, second := 0, 0
		for _, v := range children[u] {
			d := 0
			if s[v] != s[u] {
				d = down[v]
			}
			if d > first {
				second = first
				first = d
			} else if d > second {
				second = d
			}
		}
		down[u] = first + 1
		if first+second+1 > best {
			best = first + second + 1
		}
	}
	return best
}
