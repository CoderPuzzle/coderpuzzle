func isPossibleToCutPath(grid [][]int) bool {
	// Only a 1->0 flip can ever help, so the game is decided by vertex
	// cuts of the monotone 1-cell DAG: at most one flip succeeds exactly
	// when fewer than two vertex-disjoint corner-to-corner paths exist
	// (Menger). Unit vertex capacities come from the standard in/out
	// split; cells off any root-to-corner route are skipped outright.
	// Augmenting BFS stops early once flow 2 proves the answer false, so
	// at most two searches ever run.
	m := len(grid)
	n := len(grid[0])
	count := m * n
	inf := count + 2
	arcsTo := []int{}
	arcsCap := []int{}
	graph := make([][]int, 2*count)
	connect := func(u, v, cap int) {
		graph[u] = append(graph[u], len(arcsTo))
		arcsTo = append(arcsTo, v)
		arcsCap = append(arcsCap, cap)
		graph[v] = append(graph[v], len(arcsTo))
		arcsTo = append(arcsTo, u)
		arcsCap = append(arcsCap, 0)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 0 {
				continue
			}
			cell := i*n + j
			corner := (i == 0 && j == 0) || (i == m-1 && j == n-1)
			internal := inf
			if !corner {
				internal = 1
			}
			connect(2*cell, 2*cell+1, internal)
			if j+1 < n && grid[i][j+1] == 1 {
				connect(2*cell+1, 2*(cell+1), inf)
			}
			if i+1 < m && grid[i+1][j] == 1 {
				connect(2*cell+1, 2*(cell+n), inf)
			}
		}
	}
	source := 0
	sink := 2*(count-1) + 1
	total := 0
	for total < 2 {
		parent := make([]int, 2*count)
		via := make([]int, 2*count)
		for v := range parent {
			parent[v] = -1
			via[v] = -1
		}
		queue := []int{source}
		parent[source] = source
		for head := 0; head < len(queue) && parent[sink] == -1; {
			u := queue[head]
			head++
			for _, e := range graph[u] {
				if parent[sink] != -1 {
					break
				}
				v := arcsTo[e]
				if arcsCap[e] > 0 && parent[v] == -1 {
					parent[v] = u
					via[v] = e
					queue = append(queue, v)
				}
			}
		}
		if parent[sink] == -1 {
			break
		}
		v := sink
		for v != source {
			e := via[v]
			arcsCap[e]--
			arcsCap[e^1]++
			v = parent[v]
		}
		total++
	}
	return total < 2
}
