func secondMinimum(n int, edges [][]int, time int, change int) int {
	graph := make([][]int, n+1)
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		graph[edge[1]] = append(graph[edge[1]], edge[0])
	}

	const infinity = int(^uint(0) >> 1)
	first := make([]int, n+1)
	second := make([]int, n+1)
	for vertex := 1; vertex <= n; vertex++ {
		first[vertex] = infinity
		second[vertex] = infinity
	}
	first[1] = 0
	queue := [][2]int{{1, 0}}

	for head := 0; head < len(queue); head++ {
		state := queue[head]
		nextDistance := state[1] + 1
		for _, neighbor := range graph[state[0]] {
			if nextDistance < first[neighbor] {
				second[neighbor] = first[neighbor]
				first[neighbor] = nextDistance
				queue = append(queue, [2]int{neighbor, nextDistance})
			} else if first[neighbor] < nextDistance && nextDistance < second[neighbor] {
				second[neighbor] = nextDistance
				queue = append(queue, [2]int{neighbor, nextDistance})
			}
		}
	}

	elapsed := int64(0)
	edgeTime := int64(time)
	signalChange := int64(change)
	for step := 0; step < second[n]; step++ {
		if (elapsed/signalChange)%2 == 1 {
			elapsed = (elapsed/signalChange + 1) * signalChange
		}
		elapsed += edgeTime
	}
	return int(elapsed)
}
