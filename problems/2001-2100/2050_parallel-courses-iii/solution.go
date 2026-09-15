func minimumTime(n int, relations [][]int, time []int) int {
	adjacency := make([][]int, n+1)
	for i := range adjacency {
		adjacency[i] = []int{}
	}
	indegree := make([]int, n+1)
	for _, relation := range relations {
		adjacency[relation[0]] = append(adjacency[relation[0]], relation[1])
		indegree[relation[1]]++
	}
	// finish[i] = earliest month at which course i completes.
	finish := make([]int, n+1)
	// Longest weighted chain on the prerequisite DAG: with unlimited
	// parallelism a course finishes at its duration plus the latest
	// prerequisite finish. Kahn's order makes every prerequisite final
	// before a course is processed.
	queue := make([]int, 0, n)
	for i := 1; i <= n; i++ {
		if indegree[i] == 0 {
			finish[i] = time[i-1]
			queue = append(queue, i)
		}
	}
	// Finishing everything means finishing the latest-ending chain.
	answer := 0
	// BFS using index ranges instead of popping from the front.
	for start := 0; start < len(queue); start++ {
		course := queue[start]
		if finish[course] > answer {
			answer = finish[course]
		}
		for _, nxt := range adjacency[course] {
			// Relax with a max: the successor waits for ALL of its
			// prerequisites, not just the first to finish.
			if finish[course]+time[nxt-1] > finish[nxt] {
				finish[nxt] = finish[course] + time[nxt-1]
			}
			indegree[nxt]--
			if indegree[nxt] == 0 {
				queue = append(queue, nxt)
			}
		}
	}
	return answer
}
