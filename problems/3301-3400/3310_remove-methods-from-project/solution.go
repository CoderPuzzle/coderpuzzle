func remainingMethods(n int, k int, invocations [][]int) []int {
	graph := make([][]int, n)
	for _, edge := range invocations {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
	}
	// Iterative DFS from k: a 10^5-long invocation chain would overflow
	// the recursion stack under the judged limits.
	suspicious := make([]bool, n)
	suspicious[k] = true
	stack := []int{k}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, nxt := range graph[node] {
			if !suspicious[nxt] {
				suspicious[nxt] = true
				stack = append(stack, nxt)
			}
		}
	}
	// The group may only be removed when no outside method invokes
	// into it; otherwise nothing is removed at all.
	for _, edge := range invocations {
		if !suspicious[edge[0]] && suspicious[edge[1]] {
			all := make([]int, n)
			for i := 0; i < n; i++ {
				all[i] = i
			}
			return all
		}
	}
	remaining := []int{}
	for node := 0; node < n; node++ {
		if !suspicious[node] {
			remaining = append(remaining, node)
		}
	}
	return remaining
}
