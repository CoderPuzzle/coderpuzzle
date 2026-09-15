func findOrder(numCourses int, prerequisites [][]int) []int {
	// A valid order is exactly a topological ordering of the graph where each
	// pair [course, prereq] is the edge prereq -> course.
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
	order := make([]int, 0, numCourses)
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
					return []int{}
				}
				if color[nxt] == 0 {
					color[nxt] = 1
					stack = append(stack, [2]int{nxt, 0})
				}
			} else {
				// When a frame runs out of children its node is fully
				// explored: color it 2 and append it after every course that
				// depends on it.
				color[node] = 2
				order = append(order, node)
				stack = stack[:top]
			}
		}
	}
	// Reversing the postorder puts every prerequisite before the courses that
	// depend on it; a back edge short-circuits with an empty list.
	for i, j := 0, len(order)-1; i < j; i, j = i+1, j-1 {
		order[i], order[j] = order[j], order[i]
	}
	return order
}
