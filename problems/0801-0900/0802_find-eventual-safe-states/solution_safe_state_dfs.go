func eventualSafeNodes(graph [][]int) []int {
	n := len(graph)
	// Memoized DFS on the graph as given: ask each node directly whether
	// every walk from it terminates, and cache the verdict. The stack is
	// explicit, so a 10^4-deep chain cannot overflow recursion.
	const (
		unvisited = iota
		visiting
		safe
		unsafe
	)
	state := make([]int, n)
	// Per-node scratch for the active frame; a node sits on the stack at
	// most once, so node indexing works for the cursor and the flag.
	next := make([]int, n)
	unsafeChild := make([]bool, n)
	for start := 0; start < n; start++ {
		if state[start] != unvisited {
			continue // verdict already memoized by an earlier start
		}
		state[start] = visiting
		stack := []int{start}
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			if next[u] < len(graph[u]) {
				v := graph[u][next[u]]
				next[u]++
				if state[v] == visiting {
					// Back edge onto the current path: a cycle runs
					// through it, so this successor is never safe.
					unsafeChild[u] = true
				} else if state[v] == unvisited {
					state[v] = visiting
					stack = append(stack, v)
				} else if state[v] == unsafe {
					// Memoized danger feeds straight back.
					unsafeChild[u] = true
				}
				// A safe successor clears the bar on its own.
			} else {
				stack = stack[:len(stack)-1]
				if unsafeChild[u] {
					state[u] = unsafe
					// Danger propagates up: the node below reached it.
					if len(stack) > 0 {
						unsafeChild[stack[len(stack)-1]] = true
					}
				} else {
					state[u] = safe
				}
			}
		}
	}
	// The ascending scan yields the required sorted order.
	result := []int{}
	for i := 0; i < n; i++ {
		if state[i] == safe {
			result = append(result, i)
		}
	}
	return result
}
