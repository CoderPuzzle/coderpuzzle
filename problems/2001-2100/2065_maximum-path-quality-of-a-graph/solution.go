func maximalPathQuality(values []int, edges [][]int, maxTime int) int {
	type connection struct {
		node int
		time int
	}
	graph := make([][]connection, len(values))
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], connection{edge[1], edge[2]})
		graph[edge[1]] = append(graph[edge[1]], connection{edge[0], edge[2]})
	}

	visits := make([]int, len(values))
	visits[0] = 1
	best := values[0]
	var search func(int, int, int)
	search = func(node int, elapsed int, quality int) {
		if node == 0 && quality > best {
			best = quality
		}
		for _, next := range graph[node] {
			nextTime := elapsed + next.time
			if nextTime > maxTime {
				continue
			}
			firstVisit := visits[next.node] == 0
			visits[next.node]++
			nextQuality := quality
			if firstVisit {
				nextQuality += values[next.node]
			}
			search(next.node, nextTime, nextQuality)
			visits[next.node]--
		}
	}

	search(0, 0, values[0])
	return best
}
