func canFinish(numCourses int, prerequisites [][]int) bool {
	// Each pair [course, prereq] is an edge prereq -> course; all courses can
	// finish exactly when this graph is acyclic.
	adjacency := make([][]int, numCourses)
	indegree := make([]int, numCourses)
	for _, pair := range prerequisites {
		course, prereq := pair[0], pair[1]
		adjacency[prereq] = append(adjacency[prereq], course)
		indegree[course]++
	}
	// Kahn's algorithm: seed with every course that has no prerequisites.
	queue := make([]int, 0, numCourses)
	for i := 0; i < numCourses; i++ {
		if indegree[i] == 0 {
			queue = append(queue, i)
		}
	}
	taken := 0
	for head := 0; head < len(queue); head++ {
		node := queue[head]
		taken++
		// Taking a course removes its outgoing edges.
		for _, nxt := range adjacency[node] {
			indegree[nxt]--
			if indegree[nxt] == 0 {
				queue = append(queue, nxt)
			}
		}
	}
	// Courses inside a cycle never reach indegree zero, so a shortfall means
	// a cycle trapped the remainder.
	return taken == numCourses
}
