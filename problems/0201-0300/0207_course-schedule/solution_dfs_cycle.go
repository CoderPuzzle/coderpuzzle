func canFinish(numCourses int, prerequisites [][]int) bool {
	// Each pair [course, prereq] is an edge prereq -> course; all courses can
	// finish exactly when this graph is acyclic.
	adjacency := make([][]int, numCourses)
	for _, pair := range prerequisites {
		course, prereq := pair[0], pair[1]
		adjacency[prereq] = append(adjacency[prereq], course)
	}
	// Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
	// explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
	color := make([]int, numCourses)
	// The DFS runs on an explicit stack of (node, next-child-index) frames so
	// a long chain of prerequisites cannot overflow the call stack.
	for start := 0; start < numCourses; start++ {
		if color[start] != 0 {
			continue
		}
		color[start] = 1
		stack := [][2]int{{start, 0}}
		for len(stack) > 0 {
			top := len(stack) - 1
			node, idx := stack[top][0], stack[top][1]
			if idx < len(adjacency[node]) {
				stack[top][1]++
				nxt := adjacency[node][idx]
				if color[nxt] == 1 {
					return false
				}
				if color[nxt] == 0 {
					color[nxt] = 1
					stack = append(stack, [2]int{nxt, 0})
				}
			} else {
				// When a frame runs out of children its node is fully
				// explored: color it 2 so no later sweep ever descends into
				// it again.
				color[node] = 2
				stack = stack[:top]
			}
		}
	}
	return true
}
